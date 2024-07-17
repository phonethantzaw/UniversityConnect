import axios from "../utils/axiosConfig";
import { useEffect, useState } from "react";
import "../styles/ReportedUsers.css";

export default function ReportedUsers() {
    const [reportedUsers, setReportedUsers] = useState([]);
    const userId = localStorage.getItem("userId");

    const fetchReportedUsers = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/users/${userId}/reporteds`);
            setReportedUsers(response.data);
        } catch (error) {
            console.error('Error fetching reported users:', error);
        }
    };

    const fetchReportId = async (reportedUserId) => {
        try {
            const response = await axios.get('http://localhost:8080/reports');
            const reportData = response.data;
            console.log('Report Data:', reportData); // Debug log
            const report = reportData.find(report => report.reportedUserId === reportedUserId && report.reporterUserId === Number(userId));
            console.log('Found Report:', report); // Debug log
            return report ? report.id : null;
        } catch (error) {
            console.error('Error fetching report ID:', error);
            return null;
        }
    };

    const handleDeleteReportedUser = async (reportedUserId) => {
        const reportId = await fetchReportId(reportedUserId);
        console.log('Report ID to delete:', reportId); // Debug log
        if (reportId) {
            try {
                await axios.delete(`http://localhost:8080/reports/${reportId}`);
                setReportedUsers(prevReportedUsers => prevReportedUsers.filter(user => user.id !== reportedUserId));
            } catch (error) {
                console.error('Error deleting reported user:', error);
            }
        }
    };

    useEffect(() => {
        fetchReportedUsers();
    }, [userId]);

    return (
        <div className="reported-users-container">
            <h3>Reported User Lists</h3>
            {reportedUsers.length > 0 ? (
                <ul>
                    {reportedUsers.map((r, index) => (
                        <li key={index}>
                            {r.username}
                            <button onClick={() => handleDeleteReportedUser(r.id)}>Remove Report</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>There is no reported list</p>
            )}
        </div>
    );
}
