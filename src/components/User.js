import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/User.css'

function User() {
    return (
        <div className="user-container">
            <h2>User Dashboard</h2>
            <ul>
                <li><Link to="/all-user">All Users</Link></li>
                <li><Link to="/register">Register</Link></li>
            </ul>
        </div>
    );
}

export default User;
