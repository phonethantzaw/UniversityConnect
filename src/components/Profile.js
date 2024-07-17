import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from '../utils/axiosConfig';
import '../styles/Profile.css';

function Profile() {
    const [profile, setProfile] = useState(null);
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    // const params = useParams();

    const userId = localStorage.getItem('userId');
    const navigate = useNavigate();
    const userRole = localStorage.getItem('userRole');
    const apiUrl = process.env.REACT_APP_API_BASE_URL;

    console.log('userId::::', userId);

    const fetchProfile = async () => {
        try {
            const response = await axios.get(`${apiUrl}/profiles/filter/${userId}`);
            setProfile(response.data);
        } catch (error) {
            console.error('Error fetching profile:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchUser = async () => {
        try {
            const response = await axios.get(`${apiUrl}/users/${userId}`);
            setUser(response.data);
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    }

    useEffect(() => {
        fetchProfile();
        fetchUser();
    }, [userId]);

    const handleAdminDashboardClick = () => {
        navigate("/admin/dashboard");
    }

    const handleBlockedUsers = () => {
        navigate("/blocked-users/" + userId);
    }

    const handleStudentHomeClick = () => {
        navigate("/student/home")
    }

    return (
        <div className="profile-wrapper">
            <div className="profile-container">
                {loading && <p>Loading...</p>}
                {!loading && (
                    <>
                        {profile ? (
                            <div className="profile-card">
                                <div className="profile-header">
                                    {/*<img className="profile-avatar" src="https://via.placeholder.com/150" alt="Profile Avatar" />*/}
                                    <h2>{profile.username}</h2>
                                    <p>{user.address}</p>
                                </div>
                                <div className="profile-section">
                                    <h3>Achievements</h3>
                                    <ul>
                                        {profile.achievements.map((achievement, index) => (
                                            <li key={index}>{achievement}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="profile-section">
                                    <h3>Interests</h3>
                                    <ul>
                                        {profile.interests.map((interest, index) => (
                                            <li key={index}>{interest}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="profile-section">
                                    <h3>Activities</h3>
                                    <ul>
                                        {profile.activities.map((activity, index) => (
                                            <li key={index}>{activity}</li>
                                        ))}
                                    </ul>
                                </div>
                                <Link to={`/update-profile/${profile.id}`}>
                                    <button className="btn">Edit Profile</button>
                                </Link>
                                {userRole === 'ADMIN' && (
                                    <div>
                                        <button className="btn" onClick={handleAdminDashboardClick}>Go To Admin
                                            Dashboard
                                        </button>
                                    </div>
                                )}
                                {userRole === 'STUDENT' && (
                                    <div>
                                        <button className="btn" onClick={handleStudentHomeClick}>Go To Home Page
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <p>No profile found</p>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default Profile;
