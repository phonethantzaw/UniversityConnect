import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Blocking(props) {
    const [userId, setUserId] = useState('');
    const navigate = useNavigate();
    const userRole = localStorage.getItem('userRole');
    const onChange = (event) => {
        setUserId(event.target.value);
    }

    const handleBlockedUsersClick = (userId) => {
        navigate("/blocked-users/" + userId);
    }

    const handleBlockerUsersClick = (userId) => {
        navigate("/blocker-users/" + userId);
    }
    console.log(userRole);

    return (
        <div>
            {userRole === "ADMIN" ? (
                <>
                    <input type="text"
                           value={userId}
                           onChange={onChange}
                           placeholder="Enter User ID" />
                    <div>
                        <h3>Blocking</h3>
                        <button onClick={() => handleBlockerUsersClick(userId)}>Blockers of UserID: {userId}</button>
                        <br /> <br />
                        <button onClick={() => handleBlockedUsersClick(userId)}>Blocked of UserID: {userId}</button>
                    </div>
                </>
            ) : userRole === "STUDENT" ? (
                <div>
                    <button onClick={() => handleBlockedUsersClick(props.userData)}>Block Lists;</button>
                </div>
            ) : null}
        </div>
    )
}
