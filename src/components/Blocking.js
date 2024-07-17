import React from "react";
import {useNavigate} from "react-router-dom";
import "../styles/Blocking.css";
import {Button, Form} from "react-bootstrap";

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
        <div className="main-container">

            <Form>
                <h3>Blocking</h3>
                <Button onClick={handleCreateBlockingClick}>Create Blocking</Button>

                <Button onClick={handleBlockInformation}>Block Information By UserID</Button>

                {userRole === "ADMIN" && (

                    <Button onClick={handleAllBlocks}>All Blocks</Button>

                )}
            </Form>
        </div>
    )
}
