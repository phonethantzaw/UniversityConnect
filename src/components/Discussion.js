import React, { useEffect, useState } from "react";
import axios from "../utils/axiosConfig";
import NavigationBar from "./NavigationBar";
import { Col, Container, Row, Button } from "react-bootstrap";
import CategoryList from "./CategoryList";
import ThreadedDiscussion from "./ThreadedDiscussion";
import {Link, useNavigate} from "react-router-dom";

export default function Discussion() {
    const [categories, setCategoriesState] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const userId = localStorage.getItem("userId");
    const navigate = useNavigate();

    const getAllCategory = async () => {
        try {
            const result = await axios.get("http://localhost:8080/discussion-categories");
            setCategoriesState(result.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    useEffect(() => {
        getAllCategory();
    }, []);

    const handleSelectCategory = (category) => {
        setSelectedCategory(category);
    };

    const navigateToCategoryManagement = () => {
        navigate("/manage-categories");
    };
    const handleLogout = () => {
        // Clear the tokens from localStorage
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userId');

        // Navigate to the login page
        navigate('/login');
    };

    return (
        <div>

            <Container className="container">
                <Row>
                    <Col md={3}>
                        <Button variant="primary" onClick={navigateToCategoryManagement}>Manage Categories</Button>
                        <CategoryList categories={categories} onSelectCategory={handleSelectCategory}/>
                    </Col>
                    <Col md={9}>
                        {selectedCategory && <ThreadedDiscussion category={selectedCategory}/>}
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
