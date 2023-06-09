import React, { useState, useEffect } from 'react';
import { Container, Col } from 'react-bootstrap';
import fetchData from '../../fetchData';
import Trait from './Trait';

function Traits({ specs, prof }) {
    const [specializations, setSpecializations] = useState([]);

    useEffect(() => {
        const fetchSpecializations = async () => {
            try {
                const specializationData = await Promise.all(
                    specs.map(async (spec) => {
                        const sp = await fetchData('specializations', spec.id);
                        const [min, maj] = await Promise.all([
                            fetchData('traits', sp[0].minor_traits.join(',')),
                            fetchData('traits', sp[0].major_traits.join(','))
                        ]);
                        return { specialization: sp[0], traits: { min, maj }, activeTraits: spec?.traits };
                    })
                );

                setSpecializations(specializationData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchSpecializations();
    }, [specs]);

    return (
        <>
            {specializations.length > 0 && (
                specializations.map((specializationData, index) => (
                    <div key={index}>
                        <Col className="traits-box">
                            <Trait
                                traitMin={specializationData.traits.min}
                                traitMaj={specializationData.traits.maj}
                                traitsActive={specializationData.activeTraits}
                                prof={prof}
                            />
                        </Col>
                        <Container className="cropped-spec-img-div">
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
