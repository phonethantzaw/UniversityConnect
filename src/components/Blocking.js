import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Blocking.css";

export default function Blocking() {
    const navigate = useNavigate();
    const userRole = localStorage.getItem('userRole');

    const handleCreateBlockingClick = () => {
        navigate("/create-blocking");
    }

    const handleBlockInformation = () => {
        navigate("/blocking-information");
    }

    const handleAllBlocks = () => {
        navigate("/all-blocks");
    }

    return (
        <div className="blocking-container">
            <h3>Blocking</h3>
            <div>
                <button onClick={handleCreateBlockingClick}>Create Blocking</button>
            </div>
            <div>
                <button onClick={handleBlockInformation}>Block Information By UserID</button>
            </div>
            {userRole === "ADMIN" && (
                <div>
                    <button onClick={handleAllBlocks}>All Blocks</button>
                </div>
            )}
        </div>
    )
}
