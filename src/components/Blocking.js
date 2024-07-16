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

    const handleCreateBlockingClick = () => {
        navigate("/create-blocking");
    }

    return (
        <div>
            {userRole === "ADMIN" ? (
                <>
                    <input type="text"
                           value={userId}
                           onChange={onChange}
                           placeholder="Enter User ID"/>
                    <div>
                        <h3>Blocking</h3>
                        <button onClick={() => handleBlockerUsersClick(userId)}>Blocker Users of
                            UserID: {userId}</button>
                        <br/> <br/>
                        <button onClick={() => handleBlockedUsersClick(userId)}>Blocked Users of
                            UserID: {userId}</button>
                    </div>
                    <div>
                        <button onClick={() => handleCreateBlockingClick()}>Create Blocking</button>
                    </div>
                </>
            ) : userRole === "STUDENT" ? (
                    <div>
                        <button onClick={() => handleBlockedUsersClick(props.userData)}>Click to Watch Your Blocked Lists</button>
                        <button onClick={() => handleCreateBlockingClick()}>Create Blocking</button>
                </div>
            ) : null}
        </div>
    )
}
