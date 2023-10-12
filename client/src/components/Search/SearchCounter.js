import React from 'react';
import { Container, Row, Col } from "react-bootstrap";
import NumberTransition from './NumberTransition';

function SearchCounter({ accounts }) {
    return (
        <Container className="flex center">
            <Col className="home-empty-search-box" style={{ width: 'auto', padding: '10px 10px' }}>
                <Row className='flex center'>Аccounts: <span className='yellow-highlight'><NumberTransition endValue={accounts.length} /> </span> | Characters: <span className='yellow-highlight'><NumberTransition endValue={accounts.map(x => x.characters.length).reduce((partialSum, a) => partialSum + a, 0)} /></span></Row>
            </Col>
        </Container>
    )
}

export default SearchCounter;