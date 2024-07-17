import React, { useState, useEffect } from 'react';
import axios from '../../utils/axiosConfig';
import { useParams, useNavigate } from 'react-router-dom';
import TagSelector from '../TagSelector';

const defaultAchievements = ["Dean's List", "Research Assistant"];
const defaultInterests = ["Machine Learning", "Data Science"];
const defaultActivities = ["Basketball Team", "Coding Club"];

function UpdateProfile(props) {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [achievements, setAchievements] = useState([]);
    const [interests, setInterests] = useState([]);
    const [activities, setActivities] = useState([]);
    const params = useParams();  // Ensure the URL parameter is 'id'
    const navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_API_BASE_URL;

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get(`${apiUrl}/profiles/${params.id}`);
                setProfile(response.data);
                setAchievements(response.data.achievements || []);
                setInterests(response.data.interests || []);
                setActivities(response.data.activities || []);
            } catch (error) {
                console.error('Error fetching profile:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [params.id]);
    const handleEdit = async () => {
        const updatedProfile = {
            ...profile,
            achievements,
            interests,
            activities
        };

        try {
            const response = await axios.put(`${apiUrl}/profiles/${params.id}`, updatedProfile);
            console.log(props.userId);
            navigate(`/profile/filter/${props.userId}`);
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    const handleCancel = () => {
        console.log(props.userId);
        navigate(`/profile/filter/${props.userId}`);
    }

    return (
        <div>
            {loading && <p>Loading...</p>}
            {!loading && (
                <>
                    {profile ? (
                        <div className="update-profile-container">
                            <h2>Update Profile</h2>
                            <TagSelector
                                label="Achievements"
                                tags={defaultAchievements}
                                selectedTags={achievements}
                                setSelectedTags={setAchievements}
                            />
                            <TagSelector
                                label="Interests"
                                tags={defaultInterests}
                                selectedTags={interests}
                                setSelectedTags={setInterests}
                            />
                            <TagSelector
                                label="Activities"
                                tags={defaultActivities}
                                selectedTags={activities}
                                setSelectedTags={setActivities}
                            />
                            <button onClick={handleEdit} style={{backgroundColor: "#074E9F"}}>Save</button>
                            <br/>
                            <br />
                            <button onClick={handleCancel} style={{backgroundColor: "#074E9F"}}>Cancel</button>
                        </div>
                    ) : (
                        <p>No profile found</p>
                    )}
                </>
            )}
        </div>
    );
}

export default UpdateProfile;
