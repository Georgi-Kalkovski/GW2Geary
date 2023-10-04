import React from 'react';
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

function SearchWelcome() {
    return (
        <Container className="flex center">
            <Col className="home-empty-search-box">
                <Row className='home-welcome'>
                    Welcome to <span className="gw2-logo-style">GW2</span>
                    <span className="geary-logo-style">Geary</span>!
                </Row>
                <Row>A place where you can inspect or share equipment and builds of registered accounts and their characters.
                    If someone adds a valid{' '}
                    <Link to="https://account.arena.net/applications" style={{ color: '#d70000' }} target="_blank">
                        GW2 API key
                    </Link>
                    <span style={{ fontSize: '15px' }}>(<span className='yellow-highlight'></span>
                        <span style={{ borderBottom: '1px dotted' }}>account</span>
                        , <span style={{ borderBottom: '1px dotted' }}>characters</span>
                        , <span style={{ borderBottom: '1px dotted' }}>builds</span>
                        , <span style={{ borderBottom: '1px dotted' }}>progression</span>) </span>
                    with us and grants access, you'll be able to find and inspect them.
                </Row>
            </Col>
        </Container>);
}

export default SearchWelcome;