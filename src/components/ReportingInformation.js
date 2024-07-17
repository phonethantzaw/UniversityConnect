// src/components/ReportingInformation.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ReportingInformation(props) {
    const [userId, setUserId] = useState('');
    const navigate = useNavigate();
    const userRole = localStorage.getItem('userRole');

    const onChange = (event) => {
        setUserId(event.target.value);
    }

    const handleReporterUsersClick = (userId) => {
        navigate("/reporter-users/" + userId);
    }

    const handleReportedUsersClick = (userId) => {
        navigate("/reported-users/" + userId);
    }

    return (
        <div>
            {userRole === "ADMIN" ? (
                <div>
                    <input
                        type="text"
                        value={userId}
                        onChange={onChange}
                        placeholder="Enter User ID"
                    />
                    <button onClick={() => handleReporterUsersClick(userId)}>Reporter Users of UserID: {userId}</button>
                    <br />
                    <br />
                    <button onClick={() => handleReportedUsersClick(userId)}>Reported Users of UserID: {userId}</button>
                </div>
            ) : userRole === "STUDENT" ? (
                <div>
                    <button onClick={() => handleReportedUsersClick(props.userId)}>Click to Watch Your Reported List</button>
                </div>
            ) : null}
        </div>
    );
}
