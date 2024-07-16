import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "../utils/axiosConfig";

export default function BlockedUsers(){
    const [blockedUsers, setBlockedUsers] = useState([]);
    const params= useParams();
    const navigate = useNavigate();

    const fetchBlockedUsers = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/users/${params.userId}/blockeds`);
            setBlockedUsers(response.data);
        } catch (error) {
            console.error('Error fetching blocked users:', error);
        }
    };

    useEffect(() => {
        fetchBlockedUsers();
    }, [params.userId]);

    const handleGoToBlockingClick = () => {
        navigate("/blocking");
    }

    return(
        <div>
            <h3>Blocked User Lists</h3>
            <ul>
                {
                    blockedUsers.map(b => {
                        return(
                            <li>{b.username}</li>
                        );
                    })
                }
            </ul>
            <button onClick={handleGoToBlockingClick}>Go To Blocking Page</button>
        </div>
    )
}
