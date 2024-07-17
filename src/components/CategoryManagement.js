import React, { useState, useEffect } from 'react';
import { Button, Form, Container, Card } from "react-bootstrap";
import axios from '../utils/axiosConfig';
import {isRouteErrorResponse, useNavigate} from "react-router-dom";

const CategoryManagement = () => {
    const [categories, setCategories] = useState([]);
    const [categoryName, setCategoryName] = useState('');
    const [categoryDescription, setCategoryDescription] = useState('');
    const [editingCategoryId, setEditingCategoryId] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const navigate = useNavigate();

    const getAllCategory = async () => {
        try {
            const result = await axios.get("http://localhost:8080/discussion-categories");
            setCategories(result.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    useEffect(() => {
        getAllCategory();
    }, []);

    const handleSaveCategory = async () => {
        // Validate if name and description are not empty
        if (!categoryName || !categoryDescription) {
            alert("Please enter both name and description.");
            return;
        }

        const newCategory = {
            name: categoryName,
            description: categoryDescription,
        };

        try {
            if (editingCategoryId === null) {
                await axios.post('http://localhost:8080/discussion-categories', newCategory);
            } else {
                await axios.put(`http://localhost:8080/discussion-categories/${editingCategoryId}`, newCategory);
            }
            getAllCategory(); // Refresh the categories list
        } catch (error) {
            console.error(`Error ${editingCategoryId === null ? 'creating' : 'updating'} category:`, error);
        }

        setCategoryName('');
        setCategoryDescription('');
        setEditingCategoryId(null);
        setShowForm(false);
    };

    const handleEditCategory = (category) => {
        setCategoryName(category.name);
        setCategoryDescription(category.description);
        setEditingCategoryId(category.id);
        setShowForm(true);
    };

    const handleDeleteCategory = async (categoryId) => {
        try {
            await axios.delete(`http://localhost:8080/discussion-categories/${categoryId}`);
            getAllCategory(); // Refresh the categories list
        } catch (error) {
            if (error.response.data.message.includes("Cannot delete or update a parent row: a foreign key constraint fails") && error.response.status === 500) {
                alert("Delete discussions articles first to delete category.");
            } else {
                console.error("Error deleting category:", error);
            }
        }
    };

    const handleCreateCategory = () => {
        setCategoryName('');
        setCategoryDescription('');
        setEditingCategoryId(null);
        setShowForm(true);
    };

    const handleCancel = () => {
        setCategoryName('');
        setCategoryDescription('');
        setEditingCategoryId(null);
        setShowForm(false);
    };

    const navigateBack = () => {
        navigate("/discussion");
    };

    return (
        <Container>
            <h2>Manage Categories</h2>
            {!showForm && (
                <Button variant="primary" onClick={handleCreateCategory} className="mb-3">
                    Create Category
                </Button>
            )}
            {showForm && (
                <Card className="mb-3">
                    <Card.Body>
                        <Form>
                            <Form.Group controlId="formCategoryName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={categoryName}
                                    onChange={(e) => setCategoryName(e.target.value)}
                                    placeholder="Enter category name"
                                />
                            </Form.Group>
                            <Form.Group controlId="formCategoryDescription">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={categoryDescription}
                                    onChange={(e) => setCategoryDescription(e.target.value)}
                                    placeholder="Enter category description"
                                />
                            </Form.Group>
                            <Button variant="primary" onClick={handleSaveCategory}>
                                {editingCategoryId === null ? 'Create Category' : 'Save Changes'}
                            </Button>
                            {' '}
                            <Button variant="secondary" onClick={handleCancel}>
                                Cancel
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            )}
            <div className="d-flex flex-column mt-3">
                {categories.map(category => (
                    <Card key={category.id} className="mb-2">
                        <Card.Body className="d-flex justify-content-between align-items-center">
                            <span>{category.name}</span>
                            <div>
                                <Button variant="outline-primary" onClick={() => handleEditCategory(category)}>Edit</Button>
                                <Button variant="outline-danger" onClick={() => handleDeleteCategory(category.id)}>Delete</Button>
                            </div>
                        </Card.Body>
                    </Card>
                ))}
            </div>
            <Button variant="secondary" onClick={navigateBack} className="mt-3">Back to Discussions</Button>
        </Container>
    );
};

export default CategoryManagement;
