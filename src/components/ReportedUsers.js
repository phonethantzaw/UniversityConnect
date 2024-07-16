import axios from "../utils/axiosConfig";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
export default function ReportedUsers(){
    const [reportedUsers, setReportedUsers] = useState([]);
    const params= useParams();

    const fetchReportedUsers = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/users/${params.userId}/reporteds`);
            setReportedUsers(response.data);
        } catch (error) {
            console.error('Error fetching reported users:', error);
        }
    };

    useEffect(() => {
        fetchReportedUsers();
    }, [params.userId]);

    return(
        <div>
            <h3>Reported User Lists</h3>
            <ul>
                {
                    reportedUsers.map(r => {
                        return(
                            <li>{r.username}</li>
                        );
                    })
                }
            </ul>
        </div>
    )
};