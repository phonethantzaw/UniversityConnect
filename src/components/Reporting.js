import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Reporting() {
    const [userId, setUserId] = useState('');
    const navigate = useNavigate();
    const userRole = localStorage.getItem('userRole'); // Assuming userRole is stored in localStorage

    const onChange = (event) => {
        setUserId(event.target.value);
    }

    const handleReporterUsersClick = (userId) => {
        navigate("/reporter-users/" + userId);
    }

    const handleReportedUsersClick = (userId) => {
        navigate("/reported-users/" + userId);
    }

    const handleCreateReportingClick = () => {
        navigate("/create-reporting");
    }

    return (
        <div>
            {userRole === "ADMIN" ? (
                <>
                    <input
                        type="text"
                        value={userId}
                        onChange={onChange}
                        placeholder="Enter User ID"
                    />
                    <div>
                        <h3>Reporting</h3>
                        <button onClick={() => handleReporterUsersClick(userId)}>
                            Reporters of UserID: {userId}
                        </button>
                        <br /><br />
                        <button onClick={() => handleReportedUsersClick(userId)}>
                            Reporteds of UserID: {userId}
                        </button>
                    </div>
                    <div>
                        <button onClick={handleCreateReportingClick}>
                            Create Reporting
                        </button>
                    </div>
                </>
            ) : userRole === "STUDENT" ? (
                <div>
                    <button onClick={handleCreateReportingClick}>
                        Create Reporting
                    </button>
                </div>
            ) : null}
        </div>
    );
}
