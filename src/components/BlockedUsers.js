import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "../utils/axiosConfig";

export default function BlockedUsers(){
    const [blockedUsers, setBlockedUsers] = useState([]);
    const params= useParams();
    const navigate = useNavigate();
    const userRole = localStorage.getItem('userRole');

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

    const handleGoToStudentHomeClick = () => {
        navigate("/student/home");
    }

    const handleGoToAdminDashboardClick = () => {
        navigate("/admin/dashboard");
    }

    return (
        <div>
            <h3>Blocked User Lists</h3>
            {blockedUsers.length > 0 ? (
                <ul>
                    {blockedUsers.map((b, index) => (
                        <li key={index}>{b.username}</li>
                    ))}
                </ul>
            ) : (
                <p>There is no blocked list</p>
            )}
            {userRole === "ADMIN" ?(
                <>
                    <button onClick={handleGoToAdminDashboardClick}>Go Back To Home Page</button>
                </>
            ): (
                <>
                    <button onClick={handleGoToStudentHomeClick}>Go Back To Home Page</button>
                </>
            )}
        </div>
    )
}
