import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import logo from '../styles/logo.jpg';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            console.log('Logging in with:', email, password); // Debugging line
            const loginResponse = await axios.post('http://localhost:8080/users/login', { email,password });
            const { accessToken, refreshToken, role, userId } = loginResponse.data;
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            localStorage.setItem('userRole', role);
            localStorage.setItem('userId', userId);
            if( role === "ADMIN"){
                navigate('/admin/dashboard');
            }
            else{
                navigate('/student/home');
            }
        } catch (error) {
            console.error('Login error:', error.response || error.message); // Debugging line
            setError('Invalid email or password');
        }
    };

    return (
        <div className="container">
            <img src={logo} alt="logo" className="logo"/>
            <h3>Login</h3>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Email:</label>
                    <br/>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                </div>
                <div>
                    <label>Password:</label>
                    <br/>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                </div>
                {error && <p>{error}</p>}
                <button type="submit" style={{backgroundColor: "#074E9F"}}>Login</button>
            </form>
        </div>
    );
}

export default Login;
