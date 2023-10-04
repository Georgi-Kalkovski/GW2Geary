import React from 'react';
import { Container, Row, Col } from "react-bootstrap";

function SearchCounter({ accounts }) {
    return (
        <Container className="flex center">
            <Col className="home-empty-search-box" style={{ width: 'auto', padding: '10px 10px' }}>
                <Row>Аccounts: <span className='yellow-highlight'>{accounts.length}</span> | Characters: <span className='yellow-highlight'>{accounts.map(x => x.characters.length).reduce((partialSum, a) => partialSum + a, 0)}</span></Row>
            </Col>
        </Container>
    )
}

export default SearchCounter;