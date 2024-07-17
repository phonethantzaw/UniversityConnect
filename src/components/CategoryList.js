import React from 'react';
import { Button } from "react-bootstrap";

const CategoryList = ({ categories, onSelectCategory }) => {
    return (
        <div>
            <div className="d-flex flex-column">
                {categories.map(category => (
                    <Button
                        variant="outline-secondary"
                        className="category-button rounded-pill mb-2"
                        key={category.id}
                        onClick={() => onSelectCategory(category)}
                    >
                        {category.name}
                    </Button>
                ))}
            </div>
        </div>
    );
};

export default CategoryList;
