import axios from "../utils/axiosConfig";
import { useEffect, useState } from "react";
import "../styles/AllReports.css";

export default function AllReports() {
    const [reports, setReports] = useState([]);

    const fetchReports = async () => {
        try {
            const response = await axios.get("http://localhost:8080/reports");
            setReports(response.data);
        } catch (error) {
            console.error("Error fetching reports:", error);
        }
    };

    useEffect(() => {
        fetchReports();
    }, []);

    return (
        <div className="all-reports-container">
            <h3>All Reports</h3>
            <ul>
                {reports.map((report) => (
                    <li key={report.id}>
                        <span>{report.reporterUserName} reported {report.reportedUserName}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
