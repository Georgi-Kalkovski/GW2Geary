import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Traits from './Traits';
import fetchData from '../../fetchData';

function SpecBox({ spec }) {
    const [specialization, setSpecialization] = useState(null);
    const [traits, setTraits] = useState(null);

    useEffect(() => {
        const fetchSpec = async () => {
            const char = await fetchData('specializations', spec.id);
            setSpecialization(char);
            setTraits(char.minor_traits);
        };
        fetchSpec();
    }, [spec.id]);

    return (
        <Container className='cropped-spec-img-div'>
            {specialization && traits && (
                <>
                    {
                        <Row className='traits-box'>
                            <Col><Traits trait={traits} /></Col>
                        </Row>
                    }
                    <img className='cropped-spec-img' src={specialization.background} alt={specialization.name} />
                </>

            )}
        </Container>
    );
}

export default SpecBox;