import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "../utils/axiosConfig";

export default function BlockerUsers(){
    const [blockerUsers, setBlockerUsers] = useState([]);
    const params= useParams();

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

    return(
        <div>
            <h3>Blocker User Lists</h3>
            <ul>
                {
                    blockerUsers.map(b => {
                        return(

                            <li>{b.username}</li>
                        );
                    })
                }
            </ul>
        </div>
    )
}
