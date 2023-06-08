import { useState, useEffect } from 'react';
import { Container, Col } from 'react-bootstrap';
import fetchData from '../../fetchData';
import Trait from './Trait';

function Traits({ spec, prof }) {
    const [specialization, setSpecialization] = useState(null);
    const [traitsMin, setTraitsMin] = useState(null);
    const [traitsMaj, setTraitsMaj] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const char = await fetchData('specializations', spec.id);
                setSpecialization(char);
                setTraitsMin(char.minor_traits);
                setTraitsMaj(char.major_traits);
            } catch (error) {
                console.error(error);
            }
        })();
    }, [spec.id]);


    return (
        <>
            {specialization && traitsMin && traitsMaj && (
                <>
                    <Col className='traits-box'>
                        <Trait traitsMin={traitsMin} traitsMaj={traitsMaj} traitsActive={spec.traits} prof={prof} />
                    </Col>
                    <Container className='cropped-spec-img-div'>
                        <img className='cropped-spec-img' src={specialization.background} alt={specialization.name} />
                    </Container>
                </>
            )}
        </>
    );
}

export default Traits;