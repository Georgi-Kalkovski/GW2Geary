import { useState, useEffect } from 'react';
import { Container, Col } from 'react-bootstrap';
import fetchData from '../../fetchData';
import Trait from './Trait';

function Traits({ spec, prof }) {
    const [specialization, setSpecialization] = useState(null);
    const [traitMin, setTraitMin] = useState(null);
    const [traitMaj, setTraitMaj] = useState(null);
    useEffect(() => {
        (async () => {
            try {
                const char = await fetchData('specializations', spec.id);
                setSpecialization(char);
                const min = await fetchData('traits', char.minor_traits.join(","));
                const maj = await fetchData('traits', char.major_traits.join(","));
                setTraitMin(min);
                setTraitMaj(maj);
            } catch (error) {
                console.error(error);
            }
        })();
    }, [spec.id]);

    return (
        <>
            {specialization && traitMin && traitMaj && (
                <>
                    <Col className='traits-box'>
                        <Trait traitMin={traitMin} traitMaj={traitMaj} traitsActive={spec.traits} prof={prof} />
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