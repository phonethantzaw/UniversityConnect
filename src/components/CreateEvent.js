import React, { useState } from 'react';
import axios from '../utils/axiosConfig';
import { useNavigate } from 'react-router-dom'; // Import useHistory hook for navigation
import '../styles/CreateEvent.css';

const CreateEvent = () => {
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [startDateTime, setStartDateTime] = useState('');
    const [endDateTime, setEndDateTime] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const userId = localStorage.getItem('userId');
    const navigate = useNavigate(); // Initialize useHistory hook

    const handleSubmit = async (e) => {
        e.preventDefault();

        const event = {
            title,
            location,
            startDateTime: new Date(startDateTime).toISOString(), // Ensure ISO string format
            endDateTime: new Date(endDateTime).toISOString(),     // Ensure ISO string format
            eventAttendanceIds: [],
            organizerId: parseInt(userId), // Ensure organizerId is converted to integer if needed
        };

        try {
            const response = await axios.post('http://localhost:8080/events', event);
            console.log('Event created successfully', response.data);
            setSuccessMessage('Event created successfully'); // Set success message
            setTimeout(() => {
                setSuccessMessage(''); // Clear success message after a delay
                navigate.push('/allevents'); // Navigate back to events page
            }, 2000); // 2000 milliseconds (2 seconds) delay before navigating
        } catch (error) {
            console.error('Error creating event', error);
            console.log('Error response:', error.response); // Log the error response for more details
        }
    };

    return (
        <div className="create-event">
            <h2>Create Event</h2>
            {successMessage && <p className="success-message">{successMessage}</p>} {/* Display success message if set */}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <input
                        type="text"
                        id="location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="startDateTime">Start Date & Time</label>
                    <input
                        type="datetime-local"
                        id="startDateTime"
                        value={startDateTime}
                        onChange={(e) => setStartDateTime(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="endDateTime">End Date & Time</label>
                    <input
                        type="datetime-local"
                        id="endDateTime"
                        value={endDateTime}
                        onChange={(e) => setEndDateTime(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Create Event</button>
            </form>
        </div>
    );
};

export default CreateEvent;
