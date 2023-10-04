import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Tooltip from './Tooltip';
import Link from '../link.svg';

function Trait({ traitMin, traitMaj, traitsActive, prof }) {

    function TraitImage({ trait, traitType }) {
        const [showWikiButton, setShowWikiButton] = useState(false);

        const handleButtonClick = (event) => {
            event.preventDefault();

            window.open(`https://wiki.guildwars2.com/wiki/${trait.name}`, '_blank');
        };

        const handleLeftClick = (event) => {
            setShowWikiButton(true);
        };

        return (
            <Container
                onClick={handleLeftClick}
                onMouseLeave={() => setShowWikiButton(false)}
            >
                {showWikiButton && (
                    <button className='wiki-button basic-button' onClick={handleButtonClick}>
                        Wiki <img src={Link} alt="" />
                    </button>
                )}
                <Tooltip tooltip={trait} prof={prof}>
                    <img
                        src={trait.icon}
                        alt={trait.name}
                        className={traitType === 'major'
                            ? traitsActive.includes(trait.id)
                                ? 'major-trait-icon'
                                : 'major-trait-icon inactive-trait'
                            : 'minor-trait-icon'}
                        style={{ cursor: 'pointer' }}
                    />
                </Tooltip>
            </Container>
        );
    }

    return (
        <>
            {traitMin && traitMaj &&
                <Container className='flex'>
                    <Col>{<TraitImage trait={traitMin[0]} traitType="minor" />}</Col>
                    <Col className='major-col'>
                        <Row>{<TraitImage trait={traitMaj[0]} traitType="major" />}</Row>
                        <Row>{<TraitImage trait={traitMaj[1]} traitType="major" />}</Row>
                        <Row>{<TraitImage trait={traitMaj[2]} traitType="major" />}</Row>
                    </Col>
                    <Col>{<TraitImage trait={traitMin[1]} traitType="minor" />}</Col>
                    <Col className='major-col'>
                        <Row>{<TraitImage trait={traitMaj[3]} traitType="major" />}</Row>
                        <Row>{<TraitImage trait={traitMaj[4]} traitType="major" />}</Row>
                        <Row>{<TraitImage trait={traitMaj[5]} traitType="major" />}</Row>
                    </Col>
                    <Col>{<TraitImage trait={traitMin[2]} traitType="minor" />}</Col>
                    <Col className='major-col'>
                        <Row>{<TraitImage trait={traitMaj[6]} traitType="major" />}</Row>
                        <Row>{<TraitImage trait={traitMaj[7]} traitType="major" />}</Row>
                        <Row>{<TraitImage trait={traitMaj[8]} traitType="major" />}</Row>
                    </Col>
                </Container>
            }
        </>
    );
}
export default Trait;