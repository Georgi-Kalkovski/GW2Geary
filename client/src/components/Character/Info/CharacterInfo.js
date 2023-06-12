import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { wikiSmallProfessionIcons, wikiBigRacesIcons } from "../../icons";

function CharacterInfo({ char, acc, mastery, world }) {

    return (
        <Container className="flex center">
            <Row className={`flex center char-info ${char.profession.toLowerCase()}-lightning-border`}>
                {/* Name */}
                <Col className='character-col'>
                    <Row style={{ fontSize: '30px' }}>{char.name}</Row>
                    <Row className='yellow-highlight' style={{ fontSize: '20px' }}>{acc.name}</Row>
                </Col>
                {/* World */}
                <Col className='character-col'>
                    <Row style={{ fontSize: '20px', paddingBottom: '6px' }}>{world}</Row>
                    <Row className='yellow-highlight'>World</Row>
                </Col>
                {/* Level */}
                <Col className='character-col'>
                    <Row className='font-size-25px'>{char.level}</Row>
                    <Row className='yellow-highlight'>Level </Row>
                </Col>
                {/* Profession */}
                <Col className='character-col'>
                    <Row className='font-size-25px'>
                        <img
                            src={wikiSmallProfessionIcons[char.profession]}
                            style={{ maxWidth: '25px' }}
                            alt={char.profession}
                        />
                    </Row>
                    <Row className='yellow-highlight'>{char.profession}</Row>
                </Col>
                {/* Race & Gender */}
                <Col className='character-col'>
                    <Row className='font-size-25px'>
                        <img
                            src={wikiBigRacesIcons[char.race]}
                            alt={char.profession}
                            style={{ maxWidth: '25px'}}
                        />
                    </Row>
                    <Row className='yellow-highlight'>
                        {char.race} {char.gender}
                    </Row>
                </Col>
                {/* Mastery Points */}
                <Col className='character-col'>
                    <Row className='font-size-25px'>{mastery}</Row>
                    <Row className='yellow-highlight'>Mastery Points </Row>
                </Col>
                {/* Fractal Level */}
                <Col className='character-col'>
                    <Row className='font-size-25px'>{acc.fractal_level}</Row>
                    <Row className='yellow-highlight'>Fractal Level</Row>
                </Col>
                {/* WvW Rank */}
                <Col className='character-col'>
                    <Row className='font-size-25px'>{acc.wvw_rank}</Row>
                    <Row className='yellow-highlight'>WvW Rank</Row>
                </Col>
            </Row>
        </Container>
    );
}

export default CharacterInfo;