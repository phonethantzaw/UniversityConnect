import axios from "../utils/axiosConfig";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
export default function ReporterUsers(){
    const [reporterUsers, setReporterUsers] = useState([]);
    const params= useParams();

    const fetchReporterUsers = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/users/${params.userId}/reporters`);
            setReporterUsers(response.data);
        } catch (error) {
            console.error('Error fetching reporter users:', error);
        }
    };

    useEffect(() => {
        fetchReporterUsers();
    }, [params.userId]);

    return(
        <div>
            <h3>Reporter User Lists</h3>
            <ul>
                {
                    reporterUsers.map(r => {
                        return(
                            <li>{r.username}</li>
                        );
                    })
                }
            </ul>
        </div>
    )
}