import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/BlockingInformation.css";
import {Button, Form} from "react-bootstrap";

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
        <div className="main-container">
            {userRole === "ADMIN" ? (
                <Form>
                    <Form.Control
                        type="text"
                        value={userId}
                        onChange={onChange}
                        placeholder="Enter User ID"
                    />
                    <Button onClick={() => handleBlockerUsersClick(userId)}>Blocker Users of UserID: {userId}</Button>

                    <Button onClick={() => handleBlockedUsersClick(userId)}>Blocked Users of UserID: {userId}</Button>
                </Form>
            ) : userRole === "STUDENT" ? (
                <Form>
                    <Button onClick={() => handleBlockedUsersClick(props.userId)}>Click to Watch Your Blocked List</Button>
                </Form>
            ) : null}

        </div>
    );
}
