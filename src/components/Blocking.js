import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

export default function Blocking(){

    const [userId, setUserId] = useState('');
    const navigate = useNavigate();
    const onChange = (event) => {
        setUserId(event.target.value);
    }

    const handleBlockedUsersClick = (userId) => {
        navigate("/blocked-users/" + userId);
    }

    const handleBlockerUsersClick = (userId) => {
        navigate("/blocker-users/" + userId);
    }

    return(
        <div>
            <input type="text"
                   value={userId}
                   onChange={onChange}
                   placeholder="Enter User ID"/>
            <div>
                <h3>Blocking</h3>
                <button onClick={() => handleBlockerUsersClick(userId)}>Blockers of UserID: {userId}</button>
                <br /> <br />
                <button onClick={() => handleBlockedUsersClick(userId)}>Blockeds of UserID: {userId}</button>
            </div>
        </div>
    )
}