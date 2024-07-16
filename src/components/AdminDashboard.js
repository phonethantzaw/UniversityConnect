
import React, {useState} from 'react';
import {Link, Outlet} from 'react-router-dom';
import "../styles/AdminDashboard.css";
function AdminDashboard(props) {

    return (
        <div className="admin-page-container">
            <h2>Admin Dashboard</h2>
            <nav className="admin-nav-bar">
                <Link to="/discussion" className="nav-link">Discussion</Link>
                <Link to="/resource" className="nav-link">Resource</Link>
                <Link to="/event" className="nav-link">Event</Link>
                <Link to="/blocking" className="nav-link">Blocking</Link>
                <Link to="/reporting" className="nav-link">Reporting</Link>
                <Link to="/register" className="nav-link">Register User</Link>
                <Link to={`/profile/filter/${props.userId}`} className="nav-link">Profile</Link>
            </nav>
            <div className="admin-content">
                <div className="welcome-banner">
                    <h1>Welcome to University Connect</h1>
                    <p>Connecting admins across the campus</p>
                </div>
                <Outlet/>
            </div>
        </div>
    );
}

export default AdminDashboard;