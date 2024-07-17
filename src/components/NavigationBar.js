// src/components/NavigationBar.js
import React from 'react';
import {Button, Container, Nav, Navbar} from 'react-bootstrap';

const NavigationBar = ({ categories, onSelectCategory }) => {
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="#home">Discussion Forum</Navbar.Brand>
                {/*<Nav className="me-auto">*/}
                {/*    {categories.map(category => (*/}
                {/*        <Button*/}
                {/*            variant="outline-light"*/}
                {/*            className="rounded-pill me-2"*/}
                {/*            key={category}*/}
                {/*            onClick={() => onSelectCategory(category)}*/}
                {/*        >*/}
                {/*            {category}*/}
                {/*        </Button>*/}
                {/*    ))}*/}
                {/*</Nav>*/}
            </Container>
        </Navbar>
    );
};

export default NavigationBar;
