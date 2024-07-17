import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import '../styles/AdminDashboard.css';

function AdminDashboard(props) {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear the tokens from localStorage
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userId');

        // Navigate to the login page
        navigate('/login', { replace: true });
    };

    // Preventing back navigation on logout
    React.useEffect(() => {
        const handleBackButton = () => navigate('/login', { replace: true });

        window.history.pushState(null, document.title, window.location.href);
        window.addEventListener('popstate', handleBackButton);

        return () => {
            window.removeEventListener('popstate', handleBackButton);
        };
    }, [navigate]);

    return (
        <div className="admin-wrapper">
            <div className="admin-page-container">
                <nav className="admin-nav-bar">
                    <Link to="/discussion" className="nav-link">Discussion</Link>
                    <Link to="/resource" className="nav-link">Resource</Link>
                    <Link to="/event" className="nav-link">Event</Link>
                    <Link to="/blocking" className="nav-link">Blocking</Link>
                    <Link to="/reporting" className="nav-link">Reporting</Link>
                    <Link to="/user" className="nav-link">User</Link>
                    <Link to="/all-profiles" className="nav-link">Profiles</Link>
                    <Link to={`/profile/filter/${props.userId}`} className="nav-link">My Profile</Link>
                    <button onClick={handleLogout}>Logout</button>
                </nav>
                <div className="admin-content">
                    <div className="welcome-banner">
                        <h1>Welcome to University Connect</h1>
                        <p>Connecting admins across the campus</p>
                    </div>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
