import React, { useState, useEffect } from 'react';
import axios from '../utils/axiosConfig';
import { Link } from 'react-router-dom'; // Import Link for navigation
import '../styles/AllEvents.css';

export default function AllEvents() {
    const [events, setEvents] = useState([]);
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const eventsResponse = await axios.get('http://localhost:8080/events');
                setEvents(eventsResponse.data);
            } catch (error) {
                console.error('Error fetching events', error);
            }
        };

        const fetchUsers = async () => {
            try {
                const usersResponse = await axios.get('http://localhost:8080/users');
                setUsers(usersResponse.data);
            } catch (error) {
                console.error('Error fetching users', error);
            }
        };

        fetchEvents();
        fetchUsers();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/events/${id}`);
            setEvents(events.filter(event => event.id !== id));
        } catch (error) {
            console.error('Error deleting event', error);
        }
    };

    const filteredEvents = events.filter(event =>
        event.title.toLowerCase().includes(search.toLowerCase())
    );

    const getOrganizerName = (organizerId) => {
        const organizer = users.find(user => user.id === organizerId);
        return organizer ? organizer.name : 'Unknown';
    };

    return (
        <div className="all-events">
            <h2>All Events</h2>
            <input
                type="text"
                placeholder="Search by title"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="search-input"
            />
            <ul>
                {filteredEvents.map(event => (
                    <li key={event.id} className="event-item">
                        <h3>{event.title}</h3>
                        <p>Location: {event.location}</p>
                        <p>Start: {new Date(event.startDateTime).toLocaleString()}</p>
                        <p>End: {new Date(event.endDateTime).toLocaleString()}</p>
                        <p>Organizer: {getOrganizerName(event.organizerId)}</p>
                        <Link to={`/edit-event/${event.id}`} className="edit-button">Edit</Link>
                        <button onClick={() => handleDelete(event.id)} className="delete-button">Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};
