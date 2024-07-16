import React, { useState } from 'react';
import '../styles/TagSelector.css'; // Import the CSS file

function TagSelector({ label, tags, selectedTags, setSelectedTags }) {
    const [customTag, setCustomTag] = useState('');

    const toggleTag = (tag) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter(t => t !== tag));
        } else {
            setSelectedTags([...selectedTags, tag]);
        }
    };

    const addCustomTag = () => {
        if (customTag && !selectedTags.includes(customTag)) {
            setSelectedTags([...selectedTags, customTag]);
            setCustomTag('');
        }
    };

    return (
        <div className="tag-selector">
            <label>{label}:</label>
            <div className="tag-container">
                {tags.map((tag, index) => (
                    <div key={index} className="tag-item">
                        <input
                            type="checkbox"
                            id={tag}
                            checked={selectedTags.includes(tag)}
                            onChange={() => toggleTag(tag)}
                        />
                        <label htmlFor={tag}>{tag}</label>
                    </div>
                ))}
                <div className="custom-tag-container">
                    {selectedTags.map((tag, index) => (
                        !tags.includes(tag) && (
                            <div key={`custom-${index}`} className="tag-item">
                                <input
                                    type="checkbox"
                                    id={tag}
                                    checked={selectedTags.includes(tag)}
                                    onChange={() => toggleTag(tag)}
                                />
                                <label htmlFor={tag}>{tag}</label>
                            </div>
                        )
                    ))}
                </div>
            </div>
            <div className="add-tag-container">
                <input
                    type="text"
                    value={customTag}
                    onChange={(e) => setCustomTag(e.target.value)}
                    placeholder="Add custom tag"
                />
                <button onClick={addCustomTag}>Add</button>
            </div>
        </div>
    );
}

export default TagSelector;
