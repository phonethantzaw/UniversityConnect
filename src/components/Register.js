import React, { useState } from 'react';
import axios from '../utils/axiosConfig';
import '../styles/Register.css';
import { useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';

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
    const apiUrl = process.env.REACT_APP_API_BASE_URL;

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

            const response = await axios.post(`${apiUrl}/users`, requestBody);
            if (response.status === 201) {
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
                    navigate("/user");
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
    };

    return (
        <div className="main-container">
            <div className="register-container">
                <h2>Register</h2>
                <Form onSubmit={handleRegister}>
                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Role</Form.Label>
                        <Form.Select value={role} onChange={(e) => setRole(e.target.value)}>
                            <option value="STUDENT">Student</option>
                            <option value="ADMIN">Admin</option>
                        </Form.Select>
                    </Form.Group>

                    {role === 'ADMIN' && (
                        <Form.Group>
                            <Form.Label>Department</Form.Label>
                            <Form.Control
                                type="text"
                                value={department}
                                onChange={(e) => setDepartment(e.target.value)}
                                required
                            />
                        </Form.Group>
                    )}

                    {role === 'STUDENT' && (
                        <>
                            <Form.Group>
                                <Form.Label>Major</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={major}
                                    onChange={(e) => setMajor(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Year</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={year}
                                    onChange={(e) => setYear(e.target.value)}
                                    required
                                />
                            </Form.Group>
                        </>
                    )}

                    {error && <p className="error">{error}</p>}
                    {success && <p className="success">{success}</p>}

                    <Button type="submit">Register</Button>
                    <Button variant="secondary" onClick={handleCancelClick}>Cancel</Button>
                </Form>
            </div>
        </div>
    );
}

export default Register;
