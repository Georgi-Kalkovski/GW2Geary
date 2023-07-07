import React from 'react';
import { Link } from 'react-router-dom';
import { wikiBigProfessionIcons } from "./icons";
import { Container, Row, Col } from 'react-bootstrap';

function CharacterPreview({ character }) {
    const Icon = wikiBigProfessionIcons[character.profession];

    return (
        <Container key={`${character.name}-box`} className="character">
            <Link to={`/c/${character.name.replace(/\s/g, "_")}`} className="character-link">
                <Container className={`${character.profession.toLowerCase()}-border ${character.profession.toLowerCase()}-lightning-border character-box`}>
                    <Row className='character-name-div'>
                        <div className="character-name">{character.name}</div>
                    </Row>
                    <Row className='flex space-between'>
                        <Col style={{fontSize:'15px'}}>
                            <Row >
                                lvl. {character.level}
                            </Row>
                            <Row >
                                {character.race}
                            </Row>

                            <Row>{character.profession}</Row>
                        </Col>
                        <Col className='flex column'>
                            <Row>
                                <img src={Icon} key={`${character.name}-img`} alt={character.name} style={{ width: '55px' }} />
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </Link>
        </Container>
    );
}

export default CharacterPreview;
