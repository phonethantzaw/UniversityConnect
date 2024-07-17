import React from 'react';
import { Link, Outlet, useParams, useNavigate } from 'react-router-dom';
import '../styles/StudentPage.css';

function StudentPage(props) {
    const { userId } = useParams();
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear the tokens from localStorage
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userId');

        // Navigate to the login page
        navigate('/login');
    };

    return (
        <div className="student-wrapper">
            <div className="student-page-container">
                <nav className="student-nav-bar">
                    <Link to="/discussion" className="nav-link">Discussion</Link>
                    <Link to="/resource" className="nav-link">Resource</Link>
                    <Link to="/event" className="nav-link">Event</Link>
                    <Link to="/blocking" className="nav-link">Blocking</Link>
                    <Link to="/reporting" className="nav-link">Reporting</Link>
                    <Link to={`/profile/filter/${props.userId}`} className="nav-link">Profile</Link>
                    <button onClick={handleLogout}>Logout</button>
                </nav>
                <div className="student-content">
                    <div className="welcome-banner">
                        <h1>Welcome to University Connect</h1>
                        <p>Connecting students across the campus</p>
                    </div>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default StudentPage;
