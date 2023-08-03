import { Container, Col } from 'react-bootstrap';
import Trait from './Trait';
import React from 'react';

function Traits({ setTraits, specializations, prof }) {
    setTraits(specializations);
    return (
        <>
            {specializations && specializations.length > 0 && (
                specializations.map((specializationData, index) => (
                    <div key={index}>
                        <div className='spec-name'>{specializationData.specialization.name}</div>
                        <Col className="traits-box">
                            <Trait
                                traitMin={specializationData.traits.min}
                                traitMaj={specializationData.traits.maj}
                                traitsActive={specializationData.activeTraits}
                                prof={prof}
                            />
                        </Col>
                        <Container className={`cropped-spec-img-div`}>
                        {/* <Container className={`cropped-spec-img-div ${prof.toLowerCase()}-lightning-border`}> */}
                            <img
                                className="cropped-spec-img"
                                src={specializationData.specialization.background}
                                alt={specializationData.specialization.name}
                            />
                        </Container>
                    </div>
                ))
            )}
        </>
    );
}

export default Traits;
