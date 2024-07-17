// src/components/Post.js
import React, { useState, useEffect } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../styles/Discussion.css';
import axios from "../utils/axiosConfig";
import { format } from 'date-fns';

const Post = ({ post, onDelete, setEditingPostId, editingPostId, onEdit }) => {
    const userId = localStorage.getItem("userId");
    const [replyText, setReplyText] = useState('');
    const [replies, setReplies] = useState([]);
    const [showReplyForm, setShowReplyForm] = useState(false);
    const [editingReplyId, setEditingReplyId] = useState(null);
    const [newPostTopic, setNewPostTopic] = useState(post.topic);
    const [newPostText, setNewPostText] = useState(post.description);

    const fetchReplies = async () => {
        const fetchedReplies = await Promise.all(post.discussionThreadIds.map(async (id) => {
            const response = await axios.get(`http://localhost:8080/discussions/threads/${id}`);
            return {
                id: response.data.id,
                text: response.data.comment,
                user: response.data.username,
                createdOn: format(new Date(response.data.createdOn), 'MM-dd-yyyy HH:mm:ss'),
                userId: response.data.userId,
            };
        }));

        // Sort by latest first
        const sortedReplies = fetchedReplies.sort((a, b) => new Date(b.createdOn) - new Date(a.createdOn));
        setReplies(sortedReplies);
    };

    useEffect(() => {
        fetchReplies();
    }, [post.discussionThreadIds]);

    const toggleReplyForm = () => {
        setShowReplyForm(!showReplyForm);
    };

    const addReply = async (e) => {
        e.preventDefault();

        const newReply = {
            comment: replyText,
            userId: userId,
            discussionId: post.id,
            nestedThreadIds: []
        };

        try {
            const response = await axios.post('http://localhost:8080/discussions/threads', newReply);
            fetchReplies();
        } catch (error) {
            console.error("Error adding reply:", error);
        }

        setReplyText('');
        setShowReplyForm(false);
    };

    const editReply = async (replyId, updatedReply) => {
        try {
            await axios.put(`http://localhost:8080/discussions/threads/${replyId}`, updatedReply);
            fetchReplies();
            setEditingReplyId(null);
        } catch (error) {
            console.error("Error editing reply:", error);
        }
    };

    const deleteReply = async (replyId) => {
        try {
            await axios.delete(`http://localhost:8080/discussions/threads/${replyId}`);
            fetchReplies();
        } catch (error) {
            console.error("Error deleting reply:", error);
        }
    };

    const editPost = async (postId, updatedPost) => {
        try {
            await axios.put(`http://localhost:8080/discussions/${postId}`, updatedPost);
            onEdit(postId, updatedPost);
            setEditingPostId(null);
        } catch (error) {
            console.error("Error editing post:", error);
        }
    };

    return (
        <Card className="border border-secondary mt-3">
            <Card.Body>
                <div className="post-header">
                    <div className="post-user">{post.user}</div>
                    <div className="post-createdAt">{post.createdOn}</div>
                </div>
                <div dangerouslySetInnerHTML={{ __html: post.topic }} />
                <hr className="default" />
                <div dangerouslySetInnerHTML={{ __html: post.description }} />
                <br />
                <br />
                {replies.map((reply) => (
                    <Card
                        className="border border-secondary mt-2"
                        key={reply.id}
                        style={{ marginLeft: '20px' }}
                    >
                        <Card.Body>
                            <div className="post-header">
                                <div className="post-user">{reply.user}</div>
                                <div className="post-createdAt">{reply.createdOn}</div>
                            </div>
                            <div dangerouslySetInnerHTML={{ __html: reply.text }} />
                            {reply.userId == userId && (
                                <>
                                    <Button variant="link" onClick={() => setEditingReplyId(reply.id)}>Edit</Button>
                                    <Button variant="link" onClick={() => deleteReply(reply.id)}>Delete</Button>
                                </>
                            )}
                            {editingReplyId === reply.id && (
                                <Form onSubmit={(e) => { e.preventDefault(); editReply(reply.id, { comment: replyText, userId: userId, discussionId: post.id, nestedThreadIds: [] }); }}>
                                    <Form.Group controlId="formReplyEdit">
                                        <ReactQuill
                                            theme="snow"
                                            value={replyText}
                                            onChange={setReplyText}
                                            placeholder="Edit your reply..."
                                        />
                                    </Form.Group>
                                    <Button variant="primary" type="submit">Save</Button>
                                    <Button variant="link" onClick={() => setEditingReplyId(null)}>Cancel</Button>
                                </Form>
                            )}
                        </Card.Body>
                    </Card>
                ))}
                {!showReplyForm && (
                    <Button variant="link" onClick={toggleReplyForm}>
                        Comment
                    </Button>
                )}
                {showReplyForm && (
                    <Form onSubmit={addReply} className="mt-3">
                        <Form.Group controlId="formReply">
                            <ReactQuill
                                theme="snow"
                                value={replyText}
                                onChange={setReplyText}
                                placeholder="Write a reply..."
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Reply
                        </Button>
                        {' '}
                        <Button variant="link" onClick={toggleReplyForm}>
                            Cancel
                        </Button>
                    </Form>
                )}
                {editingPostId === post.id && (
                    <Form onSubmit={(e) => { e.preventDefault(); editPost(post.id, { topic: newPostTopic, description: newPostText, categoryId: post.categoryId, discussionThreadIds: post.discussionThreadIds, userId: userId }); }}>
                        <Form.Group controlId="formEditTopic">
                            <Form.Label>Topic: </Form.Label>
                            <Form.Control
                                type="text"
                                value={newPostTopic}
                                onChange={(e) => setNewPostTopic(e.target.value)}
                                placeholder="Edit your topic..."
                            />
                        </Form.Group>
                        <Form.Group controlId="formEditPost">
                            <ReactQuill
                                theme="snow"
                                value={newPostText}
                                onChange={setNewPostText}
                                placeholder="Edit your post..."
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">Save</Button>
                        <Button variant="link" onClick={() => setEditingPostId(null)}>Cancel</Button>
                    </Form>
                )}
                {post.userId == userId && (
                    <>
                        <Button variant="link" onClick={() => setEditingPostId(post.id)}>Edit</Button>
                        <Button variant="link" onClick={() => onDelete(post.id)}>Delete</Button>
                    </>
                )}
            </Card.Body>
        </Card>
    );
};

export default Post;