import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import { Link } from 'react-router-dom';

function SearchSupportUs() {
    const [isLightTheme, setIsLightTheme] = useState(null);

    const handleThemeChange = () => {
        const isLight = document.body.classList.contains('light-theme');
        setIsLightTheme(isLight);
    };

    useEffect(() => {
        handleThemeChange();

        document.body.addEventListener('click', handleThemeChange);

        return () => {
            document.body.removeEventListener('click', handleThemeChange);
        };
    }, []);

    return (
        <>
            {innerWidth < 900 ? (
                <Row className='flex center'>
                    <Col className="home-empty-search-box" style={{ paddingTop: '5px', paddingBottom: '5px' }}>
                        <li style={{ width: 'auto', listStyleType: 'none' }}>
                            <Link
                                className='flex align nav-a center'
                                style={{ cursor: 'pointer' }}
                                to='/support'
                            >
                                <span style={{ fontSize: '1.3em' }}>
                                    Support Us on
                                </span>
                                {isLightTheme === false
                                    ? <img src="https://assets.revolut.com/assets/brand/Revolut-White.svg" style={{ paddingLeft: '10px', marginTop: '-2px', width: "75px", display: "flex" }} alt="" />
                                    : <img src="https://assets.revolut.com/assets/brand/Revolut-Black.svg" style={{ paddingLeft: '10px', marginTop: '-2px', width: "75px", display: "flex" }} alt="" />
                                }
                            </Link>
                        </li>
                    </Col>
                </Row>
            ) : ('')
            }
            <Container className="flex center">
                {innerWidth < 900 ?
                    ('') : (
                        <Col className="home-empty-search-box" style={{ paddingTop: '5px', paddingBottom: '5px' }}>
                            <Row className='flex center'>
                                <li style={{ width: 'auto', listStyleType: 'none' }}>
                                    <Link
                                        className='flex align nav-a'
                                        style={{ marginLeft: '20px', cursor: 'pointer' }}
                                        to='/support'
                                    >
                                        <span style={{ fontSize: '1.3em' }}>
                                            Support Us on
                                        </span>
                                        {isLightTheme === false
                                            ? <img src="https://assets.revolut.com/assets/brand/Revolut-White.svg" style={{ paddingLeft: '10px', width: "75px", display: "flex" }} alt="" />
                                            : <img src="https://assets.revolut.com/assets/brand/Revolut-Black.svg" style={{ paddingLeft: '10px', width: "75px", display: "flex" }} alt="" />
                                        }
                                    </Link>
                                </li>
                            </Row>
                        </Col>
                    )}
            </Container>
        </>
    );
}

export default SearchSupportUs;