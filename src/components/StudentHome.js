import React from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';
import '../styles/StudentPage.css'; // Import the CSS file

function StudentPage(props) {
    const { userId } = useParams();

    return (
        <div className="student-page-container">
            <nav className="student-nav-bar">
                <Link to="/discussion" className="nav-link">Discussion</Link>
                <Link to="/resource" className="nav-link">Resource</Link>
                <Link to="/event" className="nav-link">Event</Link>
                <Link to="/create-block" className="nav-link">Blocking</Link>
                <Link to={`/blocked-users/${props.userId}`} className="nav-link">Blocked User</Link>
                <Link to={`/profile/filter/${props.userId}`} className="nav-link">Profile</Link>
            </nav>
            <div className="student-content">
                <div className="student-content">
                    <div className="welcome-banner">
                        <h1>Welcome to University Connect</h1>
                        <p>Connecting students across the campus</p>
                    </div>
                </div>
                <Outlet />
            </div>
        </div>
    );
}

export default StudentPage;
