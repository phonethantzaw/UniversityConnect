import axios from "../utils/axiosConfig";
import React, { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import "../styles/AllProfiles.css";
import { Button, Card, Form, Row, Col } from "react-bootstrap";

export default function AllProfiles() {
    const [profiles, setProfiles] = useState([]);
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const fetchProfiles = async () => {
        try {
            const response = await axios.get("http://localhost:8080/profiles");
            setProfiles(response.data);
        } catch (error) {
            console.error("Error fetching profiles:", error);
        }
    };

    const fetchUsers = async () => {
        try {
            const response = await axios.get("http://localhost:8080/users");
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    useEffect(() => {
        fetchProfiles();
        fetchUsers();
    }, []);

    const handleSearch = () => {
        const filteredProfiles = profiles.filter((profile) => {
            const user = users.find((user) => user.id === profile.userId);
            return user && (user.username.toLowerCase().includes(searchTerm.toLowerCase()) || profile.userId.toString().includes(searchTerm));
        });
        setProfiles(filteredProfiles);
    };

    const handleReset = () => {
        fetchProfiles();
        setSearchTerm("");
    };

    const handleDelete = async (profileId) => {
        try {
            await axios.delete(`http://localhost:8080/profiles/${profileId}`);
            fetchProfiles(); // Refresh the list after deletion
        } catch (error) {
            console.error("Error deleting profile:", error);
        }
    };


    return (
        <div>
            <h3>All Profiles</h3>
            <div className="main-container">
                <Form>
                    <Form.Control
                        type="text"
                        placeholder="Search by Username or User ID"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Button onClick={handleSearch}>Search</Button>
                    <Button onClick={handleReset}>Reset</Button>
                </Form>
            </div>

            <Row>
                {profiles.map((profile, index) => {
                    const user = users.find((user) => user.id === profile.userId);
                    return (
                        <Col md={4} key={index}>
                            <Card className="Card" style={{ marginBottom: '1rem' }}>
                                <Card.Body>
                                    <Card.Text>Username: {user?.username}</Card.Text>
                                    <Card.Title>User ID: {profile.userId}</Card.Title>
                                    <Card.Text>
                                        Achievements:
                                        <ul>
                                            {profile.achievements.map((achievement, i) => (
                                                <li key={i}>{achievement}</li>
                                            ))}
                                        </ul>
                                    </Card.Text>
                                    <Card.Text>
                                        Interests:
                                        <ul>
                                            {profile.interests.map((interest, i) => (
                                                <li key={i}>{interest}</li>
                                            ))}
                                        </ul>
                                    </Card.Text>
                                    <Card.Text>
                                        Activities:
                                        <ul>
                                            {profile.activities.map((activity, i) => (
                                                <li key={i}>{activity}</li>
                                            ))}
                                        </ul>
                                    </Card.Text>
                                    {/*<Button variant="primary" onClick={() => handleEdit(profile.userId)}>Edit</Button>*/}
                                    <Button variant="danger" onClick={() => handleDelete(profile.userId)}>Delete</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    );
                })}
            </Row>
        </div>
    );
}
