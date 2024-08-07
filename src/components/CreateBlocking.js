import React, {useState, useEffect, Fragment} from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axiosConfig";
import "../styles/CreateBlocking.css";
import {Button, Form} from "react-bootstrap"; // Import the CSS file

export default function CreateBlocking() {
    const [users, setUsers] = useState([]);
    const [blockedUserId, setBlockedUserId] = useState('');
    const navigate = useNavigate();
    const blockerUserId = localStorage.getItem('userId'); // assuming user ID is stored in localStorage

    const fetchUsers = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/users`);
            const filteredUsers = response.data.filter(user => user.id !== parseInt(blockerUserId)); // Filter out the logged-in user
            console.log(filteredUsers); // Log user data to verify structure
            setUsers(filteredUsers);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleBlockingSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/blocks', {
                blockerUserId,
                blockedUserId
            });
            console.log('Blocking created:', response.data);
            navigate("/blocking");
        } catch (error) {
            console.error('Error creating blocking:', error);
        }
    };

    return (
        <div className="main-container">

            <Form onSubmit={handleBlockingSubmit}>
                <h3>Create Blocking</h3>
                <Form.Label htmlFor="blockedUserId">Select User to Block:</Form.Label>
                <Form.Select
                    id="blockedUserId"
                    style={{color: "black"}}
                    value={blockedUserId}
                    onChange={(e) => setBlockedUserId(e.target.value)}
                    required
                >
                    <option value="" disabled style={{color: "black"}}>Select a user</option>
                    {users.map(user => (
                        <option key={user.id} value={user.id} style={{color: "black"}}>{user.username}</option>
                    ))}
                </Form.Select>
                <Button type="submit">Block User</Button>
            </Form>
        </div>
    );
}
