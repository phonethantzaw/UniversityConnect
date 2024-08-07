import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axiosConfig";
import "../styles/CreateReporting.css";
import {Button, Form, FormLabel} from "react-bootstrap";

export default function CreateReporting() {
    const [users, setUsers] = useState([]);
    const [reportedUserId, setReportedUserId] = useState('');
    const navigate = useNavigate();
    const reporterUserId = localStorage.getItem('userId'); // assuming user ID is stored in localStorage

    const fetchUsers = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/users`);
            const filteredUsers = response.data.filter(user => user.id !== parseInt(reporterUserId)); // Filter out the logged-in user
            console.log(filteredUsers); // Log user data to verify structure
            setUsers(filteredUsers);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleReportingSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/reports', {
                reporterUserId,
                reportedUserId
            });
            console.log('Reporting created:', response.data);
            navigate("/reporting");
        } catch (error) {
            console.error('Error creating reporting:', error);
        }
    };

    return (
        <div>
        <h3>Create Reporting</h3>
    <div className="main-container">

            <Form onSubmit={handleReportingSubmit}>
                <Form.Label htmlFor="reportedUserId">Select User to Report:</Form.Label>
                <Form.Select
                    id="reportedUserId"
                    style={{color:"black"}}
                    value={reportedUserId}
                    onChange={(e) => setReportedUserId(e.target.value)}
                    required
                >
                    <option value="" disabled style={{color:"black"}}>Select a user</option>
                    {users.map(user => (
                        <option key={user.id} value={user.id} style={{color:"black"}}>{user.username}</option>
                    ))}
                </Form.Select>
                <Button type="submit">Report User</Button>
            </Form>
        </div>
        </div>
    );
}
