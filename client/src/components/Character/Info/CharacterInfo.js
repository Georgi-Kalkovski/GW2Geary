import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { wikiSmallProfessionIcons, wikiBigRacesIcons } from '../../icons';

function CharacterInfo({ char, acc, mastery, world }) {
    const [showMenu, setShowMenu] = useState(true);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        setShowMenu(windowWidth >= 550);
    }, [windowWidth]);

    return (
        <Container className="flex center">
            <Row
                className={`flex center char-info ${char?.profession.toLowerCase()}-lightning-border`
                }
            >
                {/* Name */}
                <Col className="character-col">
                    <Row style={{ fontSize: '30px' }}>{char?.name}</Row>
                    <Row className="yellow-highlight" style={{ fontSize: '20px' }}>
                        {acc?.name}
                    </Row>
                </Col>
                <div className='flex center'>
                        {window.innerWidth < 550 && !showMenu && (
                    <button
                        className={`${char?.profession.toLowerCase()}-border dropdown-button show-menu-button`}
                        style={{ marginTop: '5px', padding: '2px 0', width: '100px' }}
                        onClick={() => setShowMenu(true)}
                    >
                        Show More
                    </button>
                    )}
                    {window.innerWidth < 550 &&  showMenu && (
                        <button
                            className={`${char?.profession.toLowerCase()}-border dropdown-button`}
                            style={{ marginTop: '5px', padding: '2px 0', width: '100px' }}
                            onClick={() => setShowMenu(false)}
                        >
                            Hide More
                        </button>
                    )}
                </div>
                {/* World */}
                {showMenu && (
                    <Col className="character-col">
                        <Row style={{ fontSize: '20px', paddingBottom: '6px' }}>{world}</Row>
                        <Row className="yellow-highlight">World</Row>
                    </Col>
                )}
                {/* Level */}
                {showMenu && (
                    <Col className="character-col">
                        <Row className="font-size-25px">{char?.level}</Row>
                        <Row className="yellow-highlight">Level </Row>
                    </Col>
                )}
                {/* Profession */}
                {showMenu && (
                    <Col className="character-col">
                        <Row className="font-size-25px">
                            <img
                                src={wikiSmallProfessionIcons[char?.profession]}
                                style={{ maxWidth: '25px' }}
                                alt={char?.profession}
                            />
                        </Row>
                        <Row className="yellow-highlight">{char?.profession}</Row>
                    </Col>
                )}
                {/* Race & Gender */}
                {showMenu && (
                    <Col className="character-col">
                        <Row className="font-size-25px">
                            <img
                                src={wikiBigRacesIcons[char?.race]}
                                alt={char?.profession}
                                style={{ maxWidth: '25px' }}
                            />
                        </Row>
                        <Row className="yellow-highlight">
                            {char?.race} {char?.gender}
                        </Row>
                    </Col>
                )}
                {/* Mastery Points */}
                {showMenu && (
                    <Col className="character-col">
                        <Row className="font-size-25px">{mastery}</Row>
                        <Row className="yellow-highlight">Mastery Points </Row>
                    </Col>
                )}
                {/* Fractal Level */}
                {showMenu && (
                    <Col className="character-col">
                        <Row className="font-size-25px">{acc?.fractal_level}</Row>
                        <Row className="yellow-highlight">Fractal Level</Row>
                    </Col>
                )}
                {/* WvW Rank */}
                {showMenu && (
                    <Col className="character-col">
                        <Row className="font-size-25px">{acc?.wvw_rank}</Row>
                        <Row className="yellow-highlight">WvW Rank</Row>
                    </Col>
                )}
            </Row>
        </Container >
    );
}

export default CharacterInfo;
