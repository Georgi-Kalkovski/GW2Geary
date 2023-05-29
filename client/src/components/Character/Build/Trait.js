import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import fetchData from '../../fetchData';
import Tooltip from './Tooltip';

function Trait({ traitsMin, traitsMaj, traitsActive, prof }) {
    const [traitMin, setTraitMin] = useState(null);
    const [traitMaj, setTraitMaj] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const fetchedTraits = await fetchData('traits', traitsMin.join(","));
                setTraitMin(fetchedTraits);
            } catch (error) {
                console.error(error);
            }
        })();
    }, [traitsMin]);

    useEffect(() => {
        (async () => {
            try {
                const fetchedTraits = await fetchData('traits', traitsMaj.join(","));
                setTraitMaj(fetchedTraits);
            } catch (error) {
                console.error(error);
            }
        })();
    }, [traitsMaj]);

    function imageTraitMin(trait) {
        return (
            <Container>
                <Tooltip tooltip={trait} prof={prof}>
                    <img src={trait.icon} alt={trait.name} className='minor-trait-icon' />
                </Tooltip>
            </Container>
        );
    }

    function imageTraitMaj(trait) {
        return (
            <Tooltip tooltip={trait} prof={prof}>
                <img src={trait.icon} alt={trait.name}
                    className={traitsActive.includes(trait.id)
                        ? 'major-trait-icon'
                        : 'major-trait-icon inactive-trait'}
                />
            </Tooltip>
        );
    }
    return (
        <>
            {traitMin && traitMaj &&
                <Container className='flex'>
                    <Col>{imageTraitMin(traitMin[0])}</Col>
                    <Col className='major-col'>
                        <Row>{imageTraitMaj(traitMaj[0])}</Row>
                        <Row>{imageTraitMaj(traitMaj[1])}</Row>
                        <Row>{imageTraitMaj(traitMaj[2])}</Row>
                    </Col>
                    <Col>{imageTraitMin(traitMin[1])}</Col>
                    <Col className='major-col'>
                        <Row>{imageTraitMaj(traitMaj[3])}</Row>
                        <Row>{imageTraitMaj(traitMaj[4])}</Row>
                        <Row>{imageTraitMaj(traitMaj[5])}</Row>
                    </Col>
                    <Col>{imageTraitMin(traitMin[2])}</Col>
                    <Col className='major-col'>
                        <Row>{imageTraitMaj(traitMaj[6])}</Row>
                        <Row>{imageTraitMaj(traitMaj[7])}</Row>
                        <Row>{imageTraitMaj(traitMaj[8])}</Row>
                    </Col>
                </Container>
            }
        </>
    );
}
export default Trait;