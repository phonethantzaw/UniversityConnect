// src/components/EditUser.js
import React, { useState, useEffect } from 'react';
import axios from '../utils/axiosConfig';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/EditUser.css';
function EditUser() {
    const { userId } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [error, setError] = useState(null);
    const apiUrl = process.env.REACT_APP_API_BASE_URL;

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`${apiUrl}/users/${userId}`);
                setUser(response.data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchUser();
    }, [userId]);

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const handleUpdate = async () => {
        try {
            await axios.put(`${apiUrl}/users/${userId}`, user);
            navigate('/admin/dashboard'); // Redirect to dashboard after update
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="edit-user-container">
            <h2>Edit User</h2>
            <form onSubmit={handleUpdate}>
                <label>Username:</label>
                <input type="text" name="username" value={user.username || ''} onChange={handleChange} />

                <label>Email:</label>
                <input type="email" name="email" value={user.email || ''} onChange={handleChange} />

                <label>Address:</label>
                <input type="text" name="address" value={user.address || ''} onChange={handleChange} />

                <label>Role:</label>
                <select name="role" value={user.role || ''} onChange={handleChange}>
                    <option value="STUDENT">Student</option>
                    <option value="ADMIN">Admin</option>
                </select>

                {user.role === 'STUDENT' && (
                    <>
                        <label>Year:</label>
                        <input type="number" name="year" value={user.year || ''} onChange={handleChange} />

                        <label>Major:</label>
                        <input type="text" name="major" value={user.major || ''} onChange={handleChange} />
                    </>
                )}

                <button type="submit">Update</button>
                {/*{error && <p className="error-message">{error}</p>}*/}
            </form>
        </div>
    );
}

export default EditUser;
