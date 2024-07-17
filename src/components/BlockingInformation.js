import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/BlockingInformation.css";

export default function BlockingInformation(props) {
    const [userId, setUserId] = useState('');
    const navigate = useNavigate();
    const userRole = localStorage.getItem('userRole');

    const onChange = (event) => {
        setUserId(event.target.value);
    }

    const handleBlockerUsersClick = (userId) => {
        navigate("/blocker-users/" + userId);
    }

    const handleBlockedUsersClick = (userId) => {
        navigate("/blocked-users/" + userId);
    }

    return (
        <div className="blocking-info-container">
            {userRole === "ADMIN" ? (
                <div>
                    <input
                        type="text"
                        value={userId}
                        onChange={onChange}
                        placeholder="Enter User ID"
                    />
                    <button onClick={() => handleBlockerUsersClick(userId)}>Blocker Users of UserID: {userId}</button>
                    <br />
                    <br />
                    <button onClick={() => handleBlockedUsersClick(userId)}>Blocked Users of UserID: {userId}</button>
                </div>
            ) : userRole === "STUDENT" ? (
                <div>
                    <button onClick={() => handleBlockedUsersClick(props.userData)}>Click to Watch Your Blocked List</button>
                </div>
            ) : null}
        </div>
    );
}
