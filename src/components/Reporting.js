import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Reporting.css";
import {Button} from "react-bootstrap";

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
        <div>
            <h3>Reporting</h3>
            <div>
                <Button onClick={handleCreateReportingClick}>Create Reporting</Button>
            </div>
            <div>
                <Button onClick={handleReportInformation}>Report Information</Button>
            </div>
            {userRole === "ADMIN" && (
                <div>
                    <Button onClick={handleAllReports}>All Reports</Button>
                </div>
            )}
        </div>
    )
}
