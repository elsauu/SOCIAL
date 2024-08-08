import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TagSelector = ({ selectedTags, setSelectedTags }) => {
    const [tags, setTags] = useState([]);

    useEffect(() => {
        const fetchTags = async () => {
            const response = await axios.get('/api/tags');
            setTags(response.data);
        };
        fetchTags();
    }, []);

    const handleTagChange = (tag) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter(t => t !== tag));
        } else {
            setSelectedTags([...selectedTags, tag]);
        }
    };

    return (
        <div>
            {tags.map(tag => (
                <label key={tag._id}>
                    <input
                        type="checkbox"
                        value={tag.name}
                        checked={selectedTags.includes(tag.name)}
                        onChange={() => handleTagChange(tag.name)}
                    />
                    {tag.name}
                </label>
            ))}
        </div>
    );
};

export default TagSelector;
