import axios from "../utils/axiosConfig";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/BlockerUsers.css";

export default function BlockerUsers() {
    const [blockerUsers, setBlockerUsers] = useState([]);
    const params = useParams();

    const fetchBlockerUsers = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/users/${params.userId}/blockers`);
            setBlockerUsers(response.data);
        } catch (error) {
            console.error('Error fetching blocker users:', error);
        }
    };

    useEffect(() => {
        fetchBlockerUsers();
    }, [params.userId]);

    return (
        <div className="blocker-users-container">
            <h3>Blocker User Lists</h3>
            <ul>
                {blockerUsers.map(b => (
                    <li key={b.id}>{b.username}</li>
                ))}
            </ul>
        </div>
    );
}
