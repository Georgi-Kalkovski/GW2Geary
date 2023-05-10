import { useState, useEffect } from 'react';
import { Container, Col } from 'react-bootstrap';
import Trait from './Trait';
import fetchData from '../../fetchData';

function Traits({ spec }) {
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
        <Container className='cropped-spec-img-div'>
            {specialization && traitsMin && traitsMaj && (
                <>
                    {
                        <Col className='traits-box'>
                            <Trait traitsMin={traitsMin} traitsMaj={traitsMaj} traitsActive={spec.traits} />
                        </Col>
                    }
                    <img className='cropped-spec-img' src={specialization.background} alt={specialization.name} />
                </>

            )}
        </Container>
    );
}

export default Traits;