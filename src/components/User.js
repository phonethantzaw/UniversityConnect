import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import '../styles/User.css'
import {Button} from "react-bootstrap";

function User() {
    const navigate = useNavigate();

    const handleAllUsersClick = () => {
        navigate("/all-user");
    }

    const handleRegisterClick = () => {
        navigate("/register");
    }

    return (
        <div className="user-container">
            <h2>User Dashboard</h2>
            <Button onClick={handleAllUsersClick}>All Users</Button>
            <Button onClick={handleRegisterClick}>Register</Button>
        </div>
    );
}

export default User;
