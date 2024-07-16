import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Blocking() {
    const navigate = useNavigate();
    const handleBlockedUsersClick = (userId) => {
        navigate("/blocked-users/" + userId);
    }

    const handleCreateBlockingClick = () => {
        navigate("/create-blocking");
    }

    const handleBlockInformation = () => {
        navigate("/blocking-information");
    }

    return (
        <div>
            <h3>Blocking</h3>
            <div>
                <button onClick={() => handleCreateBlockingClick()}>Create Blocking</button>
            </div>
            <>
                <button onClick={handleBlockInformation}>Block Information</button>
            </>
        </div>
    )
}
