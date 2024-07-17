import React, { useState, useEffect } from 'react';
import axios from '../utils/axiosConfig';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/AllEvents.css';

export default function AllEvents() {
    const [events, setEvents] = useState([]);
    const [attendances, setAttendances] = useState([]);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const eventsResponse = await axios.get('http://localhost:8080/events');
                setEvents(eventsResponse.data);
            } catch (error) {
                console.error('Error fetching events', error);
            }
        };

        const fetchAttendances = async () => {
            try {
                const attendancesResponse = await axios.get('http://localhost:8080/events/attendances');
                setAttendances(attendancesResponse.data);
            } catch (error) {
                console.error('Error fetching attendances', error);
            }
        };

        fetchEvents();
        fetchAttendances();
    }, []);

    const handleDeleteEvent = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/events/${id}`);
            setEvents(events.filter(event => event.id !== id));
        } catch (error) {
            console.error('Error deleting event', error);
        }
    };

    const handleDeleteAttendance = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/events/attendances/${id}`);
            setAttendances(attendances.filter(attendance => attendance.id !== id));
        } catch (error) {
            console.error('Error deleting attendance', error);
        }
    };

    const filteredEvents = events.filter(event =>
        event.title.toLowerCase().includes(search.toLowerCase())
    );

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
                        <p>Organizer: {event.organizerName}</p>
                        <Link to={`/edit-event/${event.id}`} className="edit-button">Edit</Link>
                        <button onClick={() => handleDeleteEvent(event.id)} className="delete-button">Delete</button>
                        <h4>Attendances:</h4>
                        <ul>
                            {attendances
                                .filter(attendance => attendance.eventId === event.id)
                                .map(attendance => (
                                    <li key={attendance.id}>
                                        Student ID: {attendance.studentId},
                                        Check-in: {new Date(attendance.checkInTime).toLocaleString()},
                                        Check-out: {new Date(attendance.checkOutTime).toLocaleString()}
                                        <Link to={`/edit-attendance/${attendance.id}/${attendance.eventId}`} className="edit-button">Edit</Link>
                                        <button onClick={() => handleDeleteAttendance(attendance.id)} className="delete-button">Delete</button>
                                    </li>
                                ))}
                        </ul>
                        <button onClick={() => navigate(`/add-attendance/${event.id}`)} className="add-attendance-button">Add Attendance</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};
