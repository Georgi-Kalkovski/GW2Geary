import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { wikiBigProfessionIcons } from "./icons";
import { Container, Row, Col } from 'react-bootstrap';
import { usePopperTooltip } from 'react-popper-tooltip';
import AuthService from '../services/auth.service';

function CharacterPreview({ character, apiKey }) {
    const Icon = wikiBigProfessionIcons[character.profession];
    const [isVisible, setIsVisible] = useState(null);
    const updateCharacterStatus = useCallback((active) => {
        AuthService.updateCharacterStatus(apiKey._id, character._id, active)
            .then((response) => {
                console.log(repsponse)
                if (response.user && response.user.apiKey) {
                    //setIsActive(response.user.apiKey);
                }
            })
            .catch((error) => {
                console.error("Error updating API key status:", error);
            });
    }, [apiKey, character._id, AuthService]);

    const {
        getArrowProps,
        getTooltipProps,
        setTooltipRef,
        setTriggerRef,
        visible,
    } = usePopperTooltip({
        placement: 'top',
        visible: isVisible,
        onVisibleChange: setIsVisible
    });

    return (
        <Container key={`${character.name}-box`} className="character">
            {/* Checkbox */}
            {apiKey && character && (<>
                <div className='character-checkbox'>
                    <label className="custom-checkbox"
                        ref={setTriggerRef}>
                        <input
                            type="checkbox"
                            className="api-checkbox"
                            defaultChecked={character.active}
                            onChange={(e) => updateCharacterStatus(e.target.checked)}
                            key={`api-key-checkbox-${apiKey._id}`}
                        />
                        <span className="checkmark"></span>
                    </label>
                    {visible && (
                        <div
                            ref={setTooltipRef}
                            {...getTooltipProps({ className: 'tooltip-container attribute-popup ' })}
                        >
                            <div style={{ fontSize: '14px' }}>
                                Make the character
                                <span style={{ color: 'darkgreen' }}> Public </span>
                                /<span style={{ color: '#aa0404' }}> Private </span>
                            </div>
                            <div {...getArrowProps({ className: 'tooltip-arrow' })} />
                        </div>
                    )}
                </div>
            </>)}

            <Link to={`/c/${character.name.replace(/\s/g, "_")}`} className="character-link">
                <Container className={`${character.profession.toLowerCase()}-border ${character.profession.toLowerCase()}-lightning-border character-box`}>
                    <Row className='character-name-div'>
                        <div className="character-name">{character.name}</div>
                    </Row>
                    <Row className='flex space-between'>
                        <Col style={{ fontSize: '15px' }}>
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
