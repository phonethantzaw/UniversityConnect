import React, {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import '../styles/Login.css';
import logo from '../styles/logo.jpg';
import {Button, Form} from "react-bootstrap";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_API_BASE_URL;

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            console.log('Logging in with:', email, password); // Debugging line
            console.log('API URL:', apiUrl); // Add this line before making the axios call
            const loginResponse = await axios.post(`${apiUrl}/users/login`, {email, password});
            const {accessToken, refreshToken, role, userId} = loginResponse.data;
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            localStorage.setItem('userRole', role);
            localStorage.setItem('userId', userId);
            if (role === "ADMIN") {
                navigate('/admin/dashboard');
            } else {
                navigate('/student/home');
            }
        } catch (error) {
            console.error('Login error:', error.response || error.message); // Debugging line
            setError('Invalid email or password');
        }
    };

    return (

        <div className="login-wrapper">
            <Form>
                <img src={logo} alt="logo" className="logo"/>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email}
                                  onChange={(e) => setEmail(e.target.value)} required/>
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password}
                                  onChange={(e) => setPassword(e.target.value)} required/>
                </Form.Group>

                <div className="button-container">
                    <Button variant="primary" type="submit" onClick={handleLogin}>
                        Login
                    </Button>
                </div>
            </Form>
        </div>


    );
}

export default Login;
