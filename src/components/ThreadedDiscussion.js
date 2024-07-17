import React, { useEffect, useState } from 'react';
import Post from './Post';
import { Button, Card, Form, Container } from 'react-bootstrap';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import '../styles/Discussion.css';
import axios from "../utils/axiosConfig";
import { format } from 'date-fns';

const ThreadedDiscussion = ({ category }) => {
    const [posts, setPosts] = useState([]);
    const [newPostText, setNewPostText] = useState('');
    const [newPostTopic, setNewPostTopic] = useState('');
    const [showNewPostForm, setShowNewPostForm] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(20);
    const [totalPages, setTotalPages] = useState(1);
    const [editingPostId, setEditingPostId] = useState(null);

    const userId = localStorage.getItem("userId");

    const getAllPosts = async (pageNumber = 1) => {
        try {
            const result = await axios.get(`http://localhost:8080/discussions/category/${category.id}?page=${pageNumber - 1}&size=${postsPerPage}`);
            const data = result.data.content
                .map(post => ({
                    ...post,
                    user: 'User: ' + post.username,
                    createdOn: format(new Date(post.createdOn), 'MM-dd-yyyy HH:mm:ss')
                }))
                .sort((a, b) => new Date(b.createdOn) - new Date(a.createdOn)); // Sort by latest first

            setPosts(data);
            setTotalPages(result.data.totalPages);
            setCurrentPage(pageNumber);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    useEffect(() => {
        getAllPosts(currentPage);
    }, [currentPage, category.id]);

    const toggleNewPostForm = () => {
        setShowNewPostForm(!showNewPostForm);
    };

    const addPost = async () => {
        const newPost = {
            topic: newPostTopic,
            description: newPostText,
            categoryId: category.id,
            discussionThreadIds: [],
            userId: userId,
        };
        try {
            const response = await axios.post('http://localhost:8080/discussions', newPost);
            const addedPost = {
                ...response.data,
                user: 'User: ' + response.data.username,
                createdOn: format(new Date(response.data.createdOn), 'MM-dd-yyyy HH:mm:ss')
            };

            setPosts(prevPosts => [addedPost, ...prevPosts.slice(0, postsPerPage - 1)]); // Add new post to the top and limit to postsPerPage
            setTotalPages(prevTotalPages => Math.ceil((prevTotalPages * postsPerPage + 1) / postsPerPage)); // Adjust total pages if needed
            setCurrentPage(1); // Set to the first page
        } catch (error) {
            console.error("Error adding post:", error);
        }

        setNewPostText('');
        setNewPostTopic('');
        setShowNewPostForm(false);
    };

    const editPost = async (postId, updatedPost) => {
        try {
            await axios.put(`http://localhost:8080/discussions/${postId}`, updatedPost);
            getAllPosts(currentPage); // Refresh the current page
            setEditingPostId(null);
        } catch (error) {
            console.error("Error editing post:", error);
        }
    };

    const deletePost = async (postId) => {
        try {
            await axios.delete(`http://localhost:8080/discussions/${postId}`);
            getAllPosts(currentPage); // Refresh the current page
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };

    const paginate = (pageNumber) => getAllPosts(pageNumber);

    return (
        <Container className="threaded-discussion-container">
            <h2>{category.name} Discussions</h2>

            <Card className="mt-3 post-container">
                <Card.Body>
                    {!showNewPostForm && (
                        <Button variant="primary" onClick={toggleNewPostForm} className="new-post-button">
                            New Post
                        </Button>
                    )}
                    {showNewPostForm && (
                        <Form>
                            <Form.Group controlId="formNewPostTopic">
                                <Form.Label>Topic: </Form.Label>
                                <Form.Control
                                    type="text"
                                    value={newPostTopic}
                                    onChange={(e) => setNewPostTopic(e.target.value)}
                                    placeholder="Enter topic..."
                                />
                            </Form.Group>
                            <Form.Group controlId="formNewPost">
                                <ReactQuill
                                    theme="snow"
                                    value={newPostText}
                                    onChange={setNewPostText}
                                    placeholder="Write a new post..."
                                />
                            </Form.Group>
                            <div className="button-group">
                                <Button variant="primary" onClick={addPost}>Add Post</Button>
                                {' '}
                                <Button variant="link" onClick={toggleNewPostForm}>Cancel</Button>
                            </div>
                        </Form>
                    )}
                </Card.Body>
            </Card>
            {posts.map(post => (
                <Post
                    key={post.id}
                    post={post}
                    onEdit={editPost}
                    onDelete={deletePost}
                    setEditingPostId={setEditingPostId}
                    editingPostId={editingPostId}
                    userId={userId}
                />
            ))}

            {/* Pagination */}
            <div className="pagination mt-3">
                {Array.from({ length: totalPages }, (_, index) => (
                    <Button key={index + 1} onClick={() => paginate(index + 1)} variant="outline-secondary">
                        {index + 1}
                    </Button>
                ))}
            </div>
        </Container>
    );
};

export default ThreadedDiscussion;
