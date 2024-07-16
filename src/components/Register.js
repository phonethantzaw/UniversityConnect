import React, { useState } from 'react';
import axios from '../utils/axiosConfig'; // Use the configured Axios instance
import '../styles/Register.css';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [role, setRole] = useState('STUDENT');
    const [department, setDepartment] = useState('');
    const [major, setMajor] = useState('');
    const [year, setYear] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        // Validation for year field
        if (role === 'STUDENT' && (!year || isNaN(parseInt(year, 10)))) {
            setError('Year must be a valid number');
            return;
        }

        try {
            const requestBody = {
                username,
                password,
                email,
                address,
                role
            };

            if (role === 'ADMIN') {
                requestBody.department = department;
            } else {
                requestBody.major = major;
                requestBody.year = parseInt(year, 10); // Convert year to integer
            }

            const response = await axios.post('http://localhost:8080/users', requestBody);
            console.log(response.status);
            if (response.status === 201) {
                console.log("Setting success message");
                setSuccess('User created successfully!');
                setError('');
                // Reset form
                setUsername('');
                setPassword('');
                setEmail('');
                setAddress('');
                setDepartment('');
                setMajor('');
                setYear('');
                // Optionally, navigate to login after a delay to show success message
                setTimeout(() => {
                    navigate("/admin-dashboard");
                }, 500);
            }
        } catch (error) {
            setError('Failed to create user');
            setSuccess('');
            console.error('Create user error:', error.response || error.message);
        }
    };

    const handleCancelClick = () => {
        navigate(`/admin/dashboard`);
    }

    return (
        <div className="container">
            <h2>Register</h2>
            <form onSubmit={handleRegister} className="form">
                <div>
                    <p>Username</p>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <p>Password</p>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <p>Email</p>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <p>Address</p>
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <p>Role</p>
                    <select value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value="STUDENT">Student</option>
                        <option value="ADMIN">Admin</option>
                    </select>
                </div>
                {role === 'ADMIN' && (
                    <div>
                        <p>Department</p>
                        <input
                            type="text"
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                            required
                        />
                    </div>
                )}
                {role === 'STUDENT' && (
                    <>
                        <div>
                            <p>Major</p>
                            <input
                                type="text"
                                value={major}
                                onChange={(e) => setMajor(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <p>Year</p>
                            <input
                                type="text"
                                value={year}
                                onChange={(e) => setYear(e.target.value)}
                                required
                            />
                        </div>
                    </>
                )}
                {error && <p className="error">{error}</p>}
                {success && <p className="success">{success}</p>}
                <button type="submit">Register</button>
                <br />
                <button onClick={handleCancelClick}>Cancel</button>
            </form>
        </div>
    );
}

export default Register;
