import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import '../styles/Event.css';

const Event = () => {
    const navigate = useNavigate(); // Initialize useNavigate hook for navigation

    const navigateToCreateEvent = () => {
        navigate('/create-event'); // Navigate to CreateEvent page
    };

    const navigateToAllEvents = () => {
        navigate('/all-events'); // Navigate to AllEvents page
    };

    const userRole = localStorage.getItem('userRole');

    return (
        <div className="event-container">
            {userRole === 'ADMIN' && (
                <>
                    <div className="button-container">
                        <button onClick={navigateToCreateEvent} className="view-button">Create Event</button>
                        <br/><br/>
                        <button onClick={navigateToAllEvents} className="view-button">All Events</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Event;
