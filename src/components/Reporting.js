// src/components/Reporting.js
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Reporting() {
    const navigate = useNavigate();

    const handleReporterUsersClick = (userId) => {
        navigate("/reporter-users/" + userId);
    }

    const handleCreateReportingClick = () => {
        navigate("/create-reporting");
    }

    const handleReportInformation = () => {
        navigate("/reporting-information");
    }

    return (
        <div>
            <h3>Reporting</h3>
            <div>
                <button onClick={handleCreateReportingClick}>Create Reporting</button>
            </div>
            <div>
                <button onClick={handleReportInformation}>Report Information</button>
            </div>
        </div>
    )
}
