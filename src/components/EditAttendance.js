import React, { useState, useEffect } from 'react';
import axios from '../utils/axiosConfig';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/EditAttendance.css';

const EditAttendance = () => {
    const navigate = useNavigate();
    const { id, eventId } = useParams();
    const [attendance, setAttendance] = useState({
        checkInTime: '',
        checkOutTime: '',
        studentId: '',
        eventId: eventId || ''
    });

    useEffect(() => {
        if (id) {
            const fetchAttendance = async () => {
                try {
                    const response = await axios.get(`http://localhost:8080/events/attendances/${id}`);
                    setAttendance(response.data);
                } catch (error) {
                    console.error('Error fetching attendance', error);
                }
            };
            fetchAttendance();
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAttendance(prevAttendance => ({
            ...prevAttendance,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                await axios.put(`http://localhost:8080/events/attendances/${id}`, attendance);
            } else {
                await axios.post('http://localhost:8080/events/attendances', attendance);
            }
            navigate(`/all-events`);
        } catch (error) {
            console.error('Error saving attendance', error);
        }
    };

    return (
        <div className="edit-attendance">
            <h2>{id ? 'Edit' : 'Add'} Attendance</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="checkInTime">Check-in Time</label>
                    <input
                        type="datetime-local"
                        id="checkInTime"
                        name="checkInTime"
                        value={attendance.checkInTime}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="checkOutTime">Check-out Time</label>
                    <input
                        type="datetime-local"
                        id="checkOutTime"
                        name="checkOutTime"
                        value={attendance.checkOutTime}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="studentId">Student ID</label>
                    <input
                        type="number"
                        id="studentId"
                        name="studentId"
                        value={attendance.studentId}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="eventId">Event ID</label>
                    <input
                        type="number"
                        id="eventId"
                        name="eventId"
                        value={attendance.eventId}
                        readOnly
                    />
                </div>
                <button type="submit">Save</button>
                <button type="button" onClick={() => navigate("/all-events")} className="cancel-button">Cancel</button>
            </form>
        </div>
    );
};

export default EditAttendance;
