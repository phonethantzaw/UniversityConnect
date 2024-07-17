import React, { useState } from 'react';
import axios from '../utils/axiosConfig';
import '../styles/EditProfile.css'; // Import the CSS file
import TagSelector from './TagSelector'; // Import the TagSelector component

function EditProfile({ profile, onEdit, onCancel }) {
    const [achievements, setAchievements] = useState(profile.achievements);
    const [interests, setInterests] = useState(profile.interests);
    const [activities, setActivities] = useState(profile.activities);
    const apiUrl = process.env.REACT_APP_API_BASE_URL;

    const handleSave = async () => {
        const updatedProfile = {
            achievements,
            interests,
            activities,
            userId: profile.userId
        };

        try {
            const response = await axios.put(`${apiUrl}/profiles/${profile.userId}`, updatedProfile);
            onEdit(response.data);
        } catch (error) {
            console.error('Error updating profile', error);
        }
    };

    return (
        <div className="edit-profile-container">
            <h2>Edit Profile</h2>
            <div className="edit-section">
                <TagSelector
                    label="Achievements"
                    tags={profile.achievements}
                    selectedTags={achievements}
                    setSelectedTags={setAchievements}
                />
            </div>
            <div className="edit-section">
                <TagSelector
                    label="Interests"
                    tags={profile.interests}
                    selectedTags={interests}
                    setSelectedTags={setInterests}
                />
            </div>
            <div className="edit-section">
                <TagSelector
                    label="Activities"
                    tags={profile.activities}
                    selectedTags={activities}
                    setSelectedTags={setActivities}
                />
            </div>
            <div className="button-group">
                <button onClick={handleSave}>Save</button>
                <button onClick={onCancel}>Cancel</button>
            </div>
        </div>
    );
}

export default EditProfile;
