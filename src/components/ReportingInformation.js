// src/components/ReportingInformation.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {Button, Form} from "react-bootstrap";

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
        <div className="main-container">
            {userRole === "ADMIN" ? (

                <Form>
                    <Form.Control
                        type="text"
                        value={userId}
                        onChange={onChange}
                        placeholder="Enter User ID"
                    />
                    <Button onClick={() => handleReporterUsersClick(userId)}>Reporter Users of UserID: {userId}</Button>
                    <Button onClick={() => handleReportedUsersClick(userId)}>Reported Users of UserID: {userId}</Button>
                </Form>

            ) : userRole === "STUDENT" ? (
                <Form>
                    <Button onClick={() => handleReportedUsersClick(props.userId)}>Click to Watch Your Reported List</Button>
                </Form>
            ) : null}
        </div>
    );
}
