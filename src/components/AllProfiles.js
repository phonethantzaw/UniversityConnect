import axios from "../utils/axiosConfig";
import { useEffect, useState } from "react";
import "../styles/AllProfiles.css";

export default function AllProfiles() {
    const [profiles, setProfiles] = useState([]);
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

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

    return (
        <div className="all-profiles-container">
            <h3>All Profiles</h3>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search by Username or User ID"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
                <button onClick={handleReset}>Reset</button>
            </div>
            <ul>
                {profiles.map((profile, index) => {
                    const user = users.find((user) => user.id === profile.userId);
                    return (
                        <li key={index}>
                            <div className="profile-section">
                                <h4>User ID: {profile.userId}</h4>
                                {user && <h4>Username: {user.username}</h4>}
                            </div>
                            <div className="profile-section">
                                <h4>Achievements:</h4>
                                <ul>
                                    {profile.achievements.map((achievement, i) => (
                                        <li key={i}>{achievement}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="profile-section">
                                <h4>Interests:</h4>
                                <ul>
                                    {profile.interests.map((interest, i) => (
                                        <li key={i}>{interest}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="profile-section">
                                <h4>Activities:</h4>
                                <ul>
                                    {profile.activities.map((activity, i) => (
                                        <li key={i}>{activity}</li>
                                    ))}
                                </ul>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
