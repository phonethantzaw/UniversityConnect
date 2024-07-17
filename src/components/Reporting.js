import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Reporting.css";

export default function Reporting() {
    const navigate = useNavigate();
    const userRole = localStorage.getItem('userRole');

    const handleCreateReportingClick = () => {
        navigate("/create-reporting");
    }

    const handleReportInformation = () => {
        navigate("/reporting-information");
    }

    const handleAllReports = () => {
        navigate("/all-reports");
    }

    return (
        <div className="reporting-container">
            <h3>Reporting</h3>
            <div>
                <button onClick={handleCreateReportingClick}>Create Reporting</button>
            </div>
            <div>
                <button onClick={handleReportInformation}>Report Information By UserID</button>
            </div>
            {userRole === "ADMIN" && (
                <div>
                    <button onClick={handleAllReports}>All Reports</button>
                </div>
            )}
        </div>
    )
}
