import React, { useState, useEffect } from 'react';
import axios from '../utils/axiosConfig';
import { Link } from 'react-router-dom';
import DeleteUser from './DeleteUser';
import '../styles/AllUser.css'; // Import CSS for styling

function AllUsers() {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:8080/users');
                setUsers(response.data);
                setFilteredUsers(response.data); // Initialize filteredUsers with all users
            } catch (err) {
                setError(err.message);
            }
        };

        fetchUsers();
    }, []);

    const handleDelete = async (userId) => {
        try {
            await axios.delete(`http://localhost:8080/users/${userId}`);
            setUsers(users.filter(user => user.id !== userId)); // Remove deleted user from state
            setFilteredUsers(filteredUsers.filter(user => user.id !== userId)); // Remove from filtered users
        } catch (err) {
            setError(err.message);
        }
    };

    const handleSearch = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        setSearchTerm(searchTerm);

        const filteredUsers = users.filter(user =>
            user.id.toString().toLowerCase().includes(searchTerm) ||
            user.username.toLowerCase().includes(searchTerm)
        );

        setFilteredUsers(filteredUsers);
    };

    return (
        <div className="all-users-container">
            <h2>All Users</h2>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search by userID or userName"
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </div>
            {error && <p className="error-message">{error}</p>}
            <div className="users-list">
                {filteredUsers.map(user => (
                    <div className="user-item" key={user.id}>
                        <h3>{user.username}</h3>
                        <p>Email: {user.email}</p>
                        <p>Role: {user.role}</p>
                        <div className="user-actions">
                            <Link to={`/edit-user/${user.id}`} className="edit-link">Edit</Link>
                            <DeleteUser userId={user.id} onDelete={() => handleDelete(user.id)} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AllUsers;
