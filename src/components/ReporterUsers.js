import axios from "../utils/axiosConfig";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/ReporterUsers.css";

export default function ReporterUsers() {
    const [reporterUsers, setReporterUsers] = useState([]);
    const params= useParams();
    const apiUrl = process.env.REACT_APP_API_BASE_URL;

    const fetchReporterUsers = async () => {
        try {
            const response = await axios.get(`${apiUrl}/users/${params.userId}/reporters`);
            setReporterUsers(response.data);
        } catch (error) {
            console.error('Error fetching reporter users:', error);
        }
    };

    useEffect(() => {
        fetchReporterUsers();
    }, [params.userId]);

    return (
        <div className="reporter-users-container">
            <h3>Reporter User Lists</h3>
            <ul>
                {reporterUsers.map(r => (
                    <li key={r.id}>{r.username}</li>
                ))}
            </ul>
        </div>
    );
}
