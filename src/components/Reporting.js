import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

export default function Reporting() {
    const [userId, setUserId] = useState('');
    const navigate = useNavigate();
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
            <br />
            <input type="text"
                   value={userId}
                   onChange={onChange}
                   placeholder="Enter User ID"/>
            <div>
                <h3>Reporting</h3>
                <button onClick={() => handleReporterUsersClick(userId)}>Reporters of UserID: {userId}</button>
                <br /><br />
                <button onClick={() => handleReportedUsersClick(userId)}>Reporteds of UserID: {userId}</button>
            </div>
        </div>
    );
}