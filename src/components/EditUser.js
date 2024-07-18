import React, { useState, useEffect } from 'react';
import axios from '../utils/axiosConfig';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/EditUser.css';

function EditUser() {
    const { userId } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [student, setStudent] = useState({});
    const [admin, setAdmin] = useState({});
    const [error, setError] = useState(null);
    const apiUrl = process.env.REACT_APP_API_BASE_URL;

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`${apiUrl}/users/${userId}`);
                setUser(response.data);
                if (response.data.role === 'STUDENT') {
                    fetchStudent();
                } else if (response.data.role === 'ADMIN') {
                    fetchAdmin();
                }
            } catch (err) {
                setError(err.message);
            }
        };

        const fetchStudent = async () => {
            try {
                const response = await axios.get(`${apiUrl}/students/${userId}`);
                setStudent(response.data);
            } catch (err) {
                setError(err.message);
            }
        };

        const fetchAdmin = async () => {
            try {
                const response = await axios.get(`${apiUrl}/admins/${userId}`);
                setAdmin(response.data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchUser();
    }, [userId, apiUrl]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value
        }));
    };

    const handleStudentChange = (e) => {
        const { name, value } = e.target;
        setStudent((prevStudent) => ({
            ...prevStudent,
            [name]: value
        }));
    };

    const handleAdminChange = (e) => {
        const { name, value } = e.target;
        setAdmin((prevAdmin) => ({
            ...prevAdmin,
            [name]: value
        }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        try {
            const updatedUser = {
                username: user.username,
                email: user.email,
                address: user.address,
                role: user.role,
                department: user.role === 'ADMIN' ? admin.department : undefined,
                year: user.role === 'STUDENT' ? student.year : undefined, // Only include if role is STUDENT
                major: user.role === 'STUDENT' ? student.major : undefined // Only include if role is STUDENT
            };
            await axios.put(`${apiUrl}/users/${userId}`, updatedUser);
            navigate('/user');
        } catch (err) {
            console.error('Error updating user', err);
            if (err.response) {
                console.error('Error response data:', err.response.data);
                console.error('Error response status:', err.response.status);
                console.error('Error response headers:', err.response.headers);
                console.error('Error response details:', err.response.data.message);
            }
            setError(err.message);
        }
    };

    return (
        <div className="edit-user-container">
            <h2>Edit User</h2>
            <form onSubmit={handleUpdate}>
                <label>Username:</label>
                <input type="text" name="username" value={user.username || ''} onChange={handleChange} required />

                <label>Email:</label>
                <input type="email" name="email" value={user.email || ''} onChange={handleChange} required />

                <label>Address:</label>
                <input type="text" name="address" value={user.address || ''} onChange={handleChange} required />

                <label>Role:</label>
                <select name="role" value={user.role || ''} onChange={handleChange} required>
                    <option value="STUDENT">Student</option>
                    <option value="ADMIN">Admin</option>
                </select>

                {user.role === 'STUDENT' && (
                    <>
                        <label>Year:</label>
                        <input type="text" name="year" value={student.year || ''} onChange={handleStudentChange} required />

                        <label>Major:</label>
                        <input type="text" name="major" value={student.major || ''} onChange={handleStudentChange} required />
                    </>
                )}

                {user.role === 'ADMIN' && (
                    <>
                        <label>Department:</label>
                        <input type="text" name="department" value={admin.department || ''} onChange={handleAdminChange} required />
                    </>
                )}

                <button type="submit">Update</button>
                {error && <p className="error-message">{error}</p>}
            </form>
        </div>
    );
}

export default EditUser;
