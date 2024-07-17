import axios from "../utils/axiosConfig";
import { useEffect, useState } from "react";
import "../styles/ReportedUsers.css";
import {useParams} from "react-router-dom";

export default function ReportedUsers() {
    const [reportedUsers, setReportedUsers] = useState([]);
    const userId = localStorage.getItem("userId");
    const params= useParams();
    const apiUrl = process.env.REACT_APP_API_BASE_URL;

    const fetchReportedUsers = async () => {
        try {
            const response = await axios.get(`${apiUrl}/users/${params.userId}/reporteds`);
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
    }, [params.userId]);

    return(
        <div>
            <h3>Reported User Lists</h3>
            <ul>
                {
                    reportedUsers.map(r => {
                        return(
                            <li>{r.username}</li>
                        );
                    })
                }
            </ul>
        </div>
    )
};