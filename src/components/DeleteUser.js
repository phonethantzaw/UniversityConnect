import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from '../utils/axiosConfig';
import '../styles/DeleteUser.css';

function DeleteUser({ userId, onDelete }) {
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:8080/users/${userId}`);
            onDelete(); // Invoke parent onDelete callback to update user list
            navigate('/admin/dashboard'); // Redirect to dashboard after deletion
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="delete-user-container">
            <button onClick={handleDelete}>Delete</button>
            {error && <p className="error-message">{error}</p>}
        </div>
    );
}

export default DeleteUser;
