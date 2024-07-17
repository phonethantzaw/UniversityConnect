import React, { useState, useEffect } from 'react';
import axios from '../utils/axiosConfig';
import '../styles/EditEvent.css';
import {useNavigate, useParams} from "react-router-dom";

const EditEvent = (onClose ) => {
    const navigate = useNavigate();
    const params = useParams();
    const [event, setEvent] = useState({
        title: '',
        location: '',
        startDateTime: '',
        endDateTime: '',
    });

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/events/${params.id}`);
                // Set the event state with fetched data
                setEvent(response.data);
            } catch (error) {
                console.error('Error fetching event', error);
            }
        };

        fetchEvent();
    }, [params.eventId]); // Fetch event when eventId changes

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEvent((prevEvent) => ({
            ...prevEvent,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8080/events/${params.id}`, event);
            navigate("/all-events");
        } catch (error) {
            console.error('Error updating event', error);
        }
    };

    return (
        <div className="edit-event">
            <h2>Edit Event</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={event.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        value={event.location}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="startDateTime">Start Date & Time</label>
                    <input
                        type="datetime-local"
                        id="startDateTime"
                        name="startDateTime"
                        value={event.startDateTime}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="endDateTime">End Date & Time</label>
                    <input
                        type="datetime-local"
                        id="endDateTime"
                        name="endDateTime"
                        value={event.endDateTime}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Save Changes</button>
                <button type="button" onClick={()=>navigate("/all-events")} className="cancel-button">Cancel</button>
            </form>
        </div>
    );
};

export default EditEvent;
