import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "../utils/axiosConfig";
import "../styles/BlockedUsers.css";

export default function BlockedUsers() {
    const [blockedUsers, setBlockedUsers] = useState([]);
    const userId = localStorage.getItem("userId");
    const params= useParams();
    const navigate = useNavigate();
    const userRole = localStorage.getItem('userRole');
    const apiUrl = process.env.REACT_APP_API_BASE_URL;

    const fetchBlockedUsers = async () => {
        try {
            const response = await axios.get(`${apiUrl}/users/${params.userId}/blockeds`);
            setBlockedUsers(response.data);
        } catch (error) {
            console.error('Error fetching blocked users:', error);
        }
    };

    const fetchBlockId = async (blockedUserId) => {
        try {
            const response = await axios.get('http://localhost:8080/blocks');
            const blockData = response.data;
            console.log('Block Data:', blockData); // Debug log
            const block = blockData.find(block => block.blockedUserId === blockedUserId && block.blockerUserId === Number(userId));
            console.log('Found Block:', block); // Debug log
            return block ? block.id : null;
        } catch (error) {
            console.error('Error fetching block ID:', error);
            return null;
        }
    };

    const handleDeleteBlockedUser = async (blockedUserId) => {
        const blockId = await fetchBlockId(blockedUserId);
        console.log('Block ID to delete:', blockId); // Debug log
        if (blockId) {
            try {
                await axios.delete(`http://localhost:8080/blocks/${blockId}`);
                setBlockedUsers(prevBlockedUsers => prevBlockedUsers.filter(user => user.id !== blockedUserId));
            } catch (error) {
                console.error('Error deleting blocked user:', error);
            }
        }
    };

    useEffect(() => {
        fetchBlockedUsers();
    }, [userId]);

    return (
        <div className="blocked-users-container">
            <h3>Blocked User Lists</h3>
            {blockedUsers.length > 0 ? (
                <ul>
                    {blockedUsers.map((b, index) => (
                        <li key={index}>
                            {b.username}
                            <button onClick={() => handleDeleteBlockedUser(b.id)}>Remove Block</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>There is no blocked list</p>
            )}
        </div>
    );
}
