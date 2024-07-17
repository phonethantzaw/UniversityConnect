import React, {useEffect, useState} from 'react';
import axios from "../../utils/axiosConfig";
import {Button, Table} from "react-bootstrap";
import {useNavigate, useParams} from "react-router-dom";
import {FaPen, FaTrash} from "react-icons/fa6";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";


export function SurveyDetail(props) {

    const [surveyValue, setSurveyValue] = useState([]);
    const [currentTitle, setCurrentTitle] = useState('');
    const [currentId, setCurrentId] = useState(null);
    const [show, setShow] = useState(false);
    const [modalMode, setModalMode] = useState('');
    const params = useParams();
    const navigate = useNavigate();

    const apiUrl = process.env.REACT_APP_API_BASE_URL;

    const handleClose = () => setShow(false);

    const getQuestionBySurveyId = async () => {
        try {
            const response = await axios.get(`${apiUrl}/surveys/${params.surveyId}/questions`);
            setSurveyValue(response.data);
        } catch (error) {
            console.error('Error fetching surveys:', error);
        }
    }

    const populateUpdateModals = async (id, title) => {
        setCurrentId(id);
        setCurrentTitle(title);
        setModalMode('update');
        setShow(true);
    }

    const populateAddModals = async () => {
        setModalMode('add');
        setShow(true);
    }

    const updateQuestion = async (id, title) => {

        try {
            const response = await axios.put(`${apiUrl}/surveys/${params.surveyId}/questions`, {
                id: id,
                title: title
            });
            // setSurveyValue(response.data);
            setShow(false);
        } catch (error) {
            console.error('Error Updating Question:', error);
        }

        await getQuestionBySurveyId();
    }

    const addQuestion = async (title) => {

        try {
            const response = await axios.post(`${apiUrl}/surveys/${params.surveyId}/questions`, {
                title: title
            });
            // setSurveyValue(response.data);
            setShow(false);
        } catch (error) {
            console.error('Error Adding Question:', error);
        }

        await getQuestionBySurveyId();
    }


    const deleteQuestion = async (id) => {
        try {
            const response = await axios.delete(`${apiUrl}/surveys/${params.surveyId}/questions/${id}`);
            // setSurveyValue(response.data);
            setSurveyValue(surveyValue.filter(survey => survey.id !== id));
        } catch (error) {
            console.error('Error fetching surveys:', error);
        }


    }

    useEffect(() => {
        getQuestionBySurveyId();
    }, []);

    return (
        <div>
            <h1>Question List</h1>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Question</th>
                    <th>Update</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>

                {
                    surveyValue.map((survey) => {
                        return <tr key={survey.id}>
                            <td>{survey.id}</td>
                            <td>{survey.title}</td>
                            <td><FaPen onClick={() => populateUpdateModals(survey.id, survey.title)}/></td>
                            <td><FaTrash onClick={() => deleteQuestion(survey.id)}/></td>
                        </tr>

                    })
                }

                </tbody>
            </Table>
            <div className="add-question-container" >
            <Button onClick={() => populateAddModals()}>Add Question</Button>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Question</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Question</Form.Label>
                            <Form.Control as="textarea" rows={3} value={currentTitle}
                                          onChange={(e) => setCurrentTitle(e.target.value)}/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    {modalMode === 'update' && (
                        <Button variant="primary" onClick={() => updateQuestion(currentId, currentTitle)}>
                            Update
                        </Button>
                    )}
                    {modalMode === 'add' && (
                        <Button variant="primary" onClick={() => addQuestion(currentTitle)}>
                            Add Question
                        </Button>
                    )}
                </Modal.Footer>
            </Modal>
        </div>
    );
}