// src/components/Dashboard.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import AdminDashboard from './AdminDashboard';
import StudentHome from "./StudentHome";

function Dashboard() {
    const userData = localStorage.getItem('userId');
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/admin/dashboard" element={<AdminDashboard userId={userData}/>} />
                <Route path="/student/home" element={<StudentHome userId={userData}/>}/>
            </Routes>
        </Router>
    );
}

export default Dashboard;
