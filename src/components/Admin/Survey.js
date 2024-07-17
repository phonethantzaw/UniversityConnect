
import React, {useEffect, useState} from 'react';
import {Button, Card} from "react-bootstrap";
import axios from "../../utils/axiosConfig";
import '../../styles/Main.css';
import {useNavigate} from "react-router-dom";

export function Survey(props) {

    const [surveyValue, setSurveyValue] = useState([]);
    const navigate = useNavigate();

    const apiUrl = process.env.REACT_APP_API_BASE_URL;


    const GetAllSurvey = async () => {
        try {
            const response = await axios.get(`${apiUrl}/surveys`);
            setSurveyValue(response.data);
        } catch (error) {
            console.error('Error fetching surveys:', error);
        }
    }

    const onDetailHandler = (id) => {
        navigate(`/survey-detail/${id}`);
    }

    useEffect(() => {
        GetAllSurvey();
    }, []);

    return (

        <div className="main-container">
            {surveyValue.map((survey, index) => (
                <Card className="Card" key={index} style={{ width: '18rem', marginBottom: '1rem' }}>
                    <Card.Body>
                        <Card.Title>{survey.title}</Card.Title>
                        <Card.Text>
                            {survey.type}
                        </Card.Text>
                        <Button variant="primary" onClick={() => onDetailHandler(survey.id)}>Detail</Button>
                    </Card.Body>
                </Card>
            ))}
        </div>
    );
}