import {Link, useNavigate} from "react-router-dom";
import React from "react";
import axios from "../utils/axiosConfig";
import {Container, Nav} from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import "../styles/Main.css";

export function MainNav(props) {
    const userId = localStorage.getItem('userId');
    const userRole = localStorage.getItem('userRole');
    const navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_API_BASE_URL;

    const handleLogout = async () => {
        const token = localStorage.getItem('accessToken');

        try {
            await axios.post(`${apiUrl}/users/logout`, {
                token: token
            });

            localStorage.removeItem('userId');
            localStorage.removeItem('userRole');
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');

            navigate('/login');

        } catch (err) {
            console.log('Logout Error :::' + err);
        }

    }


    return (
        <>
            <Navbar bg="primary" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href={userRole === "ADMIN" ? "/admin/dashboard" : "/student/home"}>
                        University Connect
                    </Navbar.Brand>
                    <Nav className="me-auto justify-content-between" style={{width: "100%"}}>
                        <div className="nav-links-container">
                            <Nav.Link href="/discussion">Discussion</Nav.Link>
                            <Nav.Link href="/resource">Resource</Nav.Link>
                            <Nav.Link href="/event">Event</Nav.Link>
                            <Nav.Link href="/blocking">Blocking</Nav.Link>
                            <Nav.Link href="/reporting">Reporting</Nav.Link>
                            {userRole === "ADMIN" && <Nav.Link href="/user">User</Nav.Link>}
                            {userRole === "ADMIN" && <Nav.Link href="/all-profiles" >Profiles</Nav.Link>}
                            <Nav.Link href={`/profile/filter/${userId}`}>Profile</Nav.Link>
                            {userRole === "ADMIN" && <Nav.Link href="/survey">Survey</Nav.Link>}
                        </div>
                        <Nav.Link className={"nav-link"} to="#" onClick={handleLogout}>Logout</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>


    );

}