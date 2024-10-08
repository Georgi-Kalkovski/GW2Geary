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
        setShowMenu(windowWidth >= 900);
    }, [windowWidth]);

    return (
        <Container className="flex center" onClick={() => window.innerWidth < 900 ? toggleMenu() : null}>
            <Row className={`flex center char-info acc-info-new ${char.profession.toLowerCase()}-lightning-border`}>
                {/* Name */}
                {window.innerWidth >= 900 && (
                    <Col className="character-col">
                        <Row style={{ fontSize: '30px' }}>{char.name}</Row>
                        <Row className="yellow-highlight" style={{ fontSize: '20px' }}>
                            {acc.name}
                        </Row>
                    </Col>
                )}
                {window.innerWidth < 900 && (
                    <div className='flex center' >
                        <Col className={showMenu ? 'character-col' : 'character-col-close'}>
                            <Row className='acc-name-font-mobile'>
                                {char.name}
                                <div className="arrow-logic" style={!showMenu ? {} : { marginRight: '15px' }}>
                                    <span className="arrow-text">{!showMenu ? 'more' : 'less'}</span>
                                    <img className='arrow-svg' src={ArrowSvg} style={!showMenu ? {} : { transform: 'scaleY(-1)' }} alt="" />
                                </div>
                            </Row>
                            <Row className="yellow-highlight" >
                                {acc.name}
                            </Row>
                        </Col>
                    </div>
                )}
                {window.innerWidth >= 900
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
                            <Col className="character-col">
                                <Row className="font-size-22px">{acc.fractal_level ? acc.fractal_level : '0'}</Row>
                                <Row className="yellow-highlight">Fractal Level</Row>
                            </Col>
                            {/* WvW Rank */}
                            <Col className="character-col">
                                <Row className="font-size-22px">{acc.wvw.rank ? acc.wvw.rank : '0'}</Row>
                                <Row className="yellow-highlight">WvW Rank</Row>
                            </Col>
                        </>
                    )
                    : (
                        <div className='acc-info-font-mobile'>
                            {/* World */}
                            <Col className={`${showMenu ? 'character-col show-content' : 'hide-content'}`}>
                                <Row>{world}</Row>
                                <Row className="yellow-highlight">World</Row>
                            </Col>

                            <div className='flex center'>
                                <div className='column' style={{ paddingRight: '20px', marginTop: '-2px' }}>
                                    {/* Level */}
                                    <Col className={`${showMenu ? 'character-col  show-content' : 'hide-content'}`}>
                                        <Row>{char.level}</Row>
                                        <Row className="yellow-highlight">Level </Row>
                                    </Col>
                                    {/* Mastery Points */}
                                    <Col className={`${showMenu ? 'character-col  show-content' : 'hide-content'}`}>
                                        <Row>{mastery}</Row>
                                        <Row className="yellow-highlight">Mastery Points </Row>
                                    </Col>
                                </div>
                                <div className='column' style={{ marginTop: '-5px' }}>
                                    {/* Profession */}
                                    <Col className={`${showMenu ? 'character-col  show-content' : 'hide-content'}`}>
                                        <Row style={{ marginTop: '-5px' }}>
                                            <img
                                                src={wikiSmallProfessionIcons[char.profession]}
                                                style={{ maxWidth: '25px' }}
                                                alt={char.profession}
                                            />
                                        </Row>
                                        <Row className="yellow-highlight">{char.profession}</Row>
                                    </Col>
                                    {/* Fractal Level */}
                                    <Col className={`${showMenu ? 'character-col  show-content' : 'hide-content'}`}>
                                        <Row>{acc.fractal_level}</Row>
                                        <Row className="yellow-highlight">Fractal Level</Row>
                                    </Col>
                                </div>
                                <div className='column' style={{ paddingLeft: '20px' }}>
                                    {/* Race & Gender */}
                                    <Col className={`${showMenu ? 'character-col  show-content' : 'hide-content'}`}>
                                        <Row style={{ marginTop: '-5px' }}>
                                            <img
                                                src={wikiBigRacesIcons[char.race]}
                                                alt={char.profession}
                                                style={{ maxWidth: '20px' }}
                                            />
                                        </Row>
                                        <Row className="yellow-highlight">
                                            {char.race} {char.gender}
                                        </Row>
                                    </Col>
                                    {/* WvW Rank */}
                                    <Col className={`${showMenu ? 'character-col  show-content' : 'hide-content'}`}>
                                        <Row>{acc.wvw.rank}</Row>
                                        <Row className="yellow-highlight">WvW Rank</Row>
                                    </Col>
                                </div>
                            </div>
                        </div>
                    )
                }
            </Row>
        </Container >
    );
}

export default CharacterInfo;
