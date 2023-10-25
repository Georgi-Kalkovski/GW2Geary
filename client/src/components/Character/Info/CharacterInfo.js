import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { wikiSmallProfessionIcons, wikiBigRacesIcons } from '../../icons';
import ArrowSvg from '../../arrow.svg'

function CharacterInfo({ char, acc, mastery, world }) {
    const [showMenu, setShowMenu] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

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
<Container className="flex center" onClick={() => window.innerWidth < 550 ? toggleMenu() : null}>
            <Row className={`flex center char-info acc-info-new ${char.profession.toLowerCase()}-lightning-border`}>
                {/* Name */}
                {window.innerWidth >= 550 && (
                    <Col className="character-col">
                        <Row style={{ fontSize: '30px' }}>{char.name}</Row>
                        <Row className="yellow-highlight" style={{ fontSize: '20px' }}>
                            {acc.name}
                        </Row>
                    </Col>
                )}
                {window.innerWidth < 550 && (
                    <div className='flex center' >
                        <Col className={showMenu ? 'character-col' : 'character-col-close'}>
                            <Row style={{ fontSize: '30px' }}>
                                {char.name}
                                <div className="arrow-logic" style={!showMenu ? {} : { marginRight: '15px' }}>
                                    <span className="arrow-text">{!showMenu ? 'more' : 'less'}</span>
                                    <img className='arrow-svg' src={ArrowSvg} style={!showMenu ? {} : { transform: 'scaleY(-1)' }} alt="" />
                                </div>
                            </Row>
                            <Row className="yellow-highlight" style={{ fontSize: '20px' }}>
                                {acc.name}
                            </Row>
                        </Col>
                    </div>
                )}
                {window.innerWidth >= 550
                    ? (
                        <>
                            {/* World */}
                            <Col className='character-col'>
                                <Row style={{ fontSize: '20px' }}>{world}</Row>
                                <Row className="yellow-highlight">World</Row>
                            </Col>
                            {/* Level */}
                            <Col className="character-col ">
                                <Row className="font-size-22px">{char.level}</Row>
                                <Row className="yellow-highlight">Level </Row>
                            </Col>
                            {/* Profession */}
                            <Col className="character-col ">
                                <Row className="font-size-22px">
                                    <img
                                        src={wikiSmallProfessionIcons[char.profession]}
                                        style={{ maxWidth: '25px' }}
                                        alt={char.profession}
                                    />
                                </Row>
                                <Row className="yellow-highlight">{char.profession}</Row>
                            </Col>
                            {/* Race & Gender */}
                            <Col className="character-col ">
                                <Row className="font-size-22px">
                                    <img
                                        src={wikiBigRacesIcons[char.race]}
                                        alt={char.profession}
                                        style={{ maxWidth: '25px' }}
                                    />
                                </Row>
                                <Row className="yellow-highlight">
                                    {char.race} {char.gender}
                                </Row>
                            </Col>
                            {/* Mastery Points */}
                            <Col className="character-col ">
                                <Row className="font-size-22px">{mastery}</Row>
                                <Row className="yellow-highlight">Mastery Points </Row>
                            </Col>
                            {/* Fractal Level */}
                            <Col className="character-col ">
                                <Row className="font-size-22px">{acc.fractal_level ? acc.fractal_level : '0'}</Row>
                                <Row className="yellow-highlight">Fractal Level</Row>
                            </Col>
                            {/* WvW Rank */}
                            <Col className="character-col ">
                                <Row className="font-size-22px">{acc.wvw_rank ? acc.wvw_rank : '0'}</Row>
                                <Row className="yellow-highlight">WvW Rank</Row>
                            </Col>
                        </>
                    )
                    : (
                        <>
                            {/* World */}
                            <Col className={`${showMenu ? 'character-col show-content' : 'hide-content'}`}>
                                <Row style={{ fontSize: '20px' }}>{world}</Row>
                                <Row className="yellow-highlight">World</Row>
                            </Col>

                            <div className='flex center'>
                                <div className='column' style={{ paddingRight: '20px' }}>
                                    {/* Level */}
                                    <Col className={`${showMenu ? 'character-col  show-content' : 'hide-content'}`}>
                                        <Row className="font-size-22px">{char.level}</Row>
                                        <Row className="yellow-highlight">Level </Row>
                                    </Col>
                                    {/* Profession */}
                                    <Col className={`${showMenu ? 'character-col  show-content' : 'hide-content'}`}>
                                        <Row className="font-size-22px">
                                            <img
                                                src={wikiSmallProfessionIcons[char.profession]}
                                                style={{ maxWidth: '25px' }}
                                                alt={char.profession}
                                            />
                                        </Row>
                                        <Row className="yellow-highlight">{char.profession}</Row>
                                    </Col>
                                    {/* Race & Gender */}
                                    <Col className={`${showMenu ? 'character-col  show-content' : 'hide-content'}`}>
                                        <Row className="font-size-22px">
                                            <img
                                                src={wikiBigRacesIcons[char.race]}
                                                alt={char.profession}
                                                style={{ maxWidth: '25px' }}
                                            />
                                        </Row>
                                        <Row className="yellow-highlight">
                                            {char.race} {char.gender}
                                        </Row>
                                    </Col>
                                </div>
                                <div className='column' style={{ paddingLeft: '20px' }}>
                                    {/* Mastery Points */}
                                    <Col className={`${showMenu ? 'character-col  show-content' : 'hide-content'}`}>
                                        <Row className="font-size-22px">{mastery}</Row>
                                        <Row className="yellow-highlight">Mastery Points </Row>
                                    </Col>
                                    {/* Fractal Level */}
                                    <Col className={`${showMenu ? 'character-col  show-content' : 'hide-content'}`}>
                                        <Row className="font-size-22px">{acc.fractal_level}</Row>
                                        <Row className="yellow-highlight">Fractal Level</Row>
                                    </Col>
                                    {/* WvW Rank */}
                                    <Col className={`${showMenu ? 'character-col  show-content' : 'hide-content'}`}>
                                        <Row className="font-size-22px">{acc.wvw_rank}</Row>
                                        <Row className="yellow-highlight">WvW Rank</Row>
                                    </Col>
                                </div>
                            </div>
                        </>
                    )
                }
            </Row>
        </Container >
    );
}

export default CharacterInfo;
