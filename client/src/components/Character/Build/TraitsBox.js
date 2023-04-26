import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
//import Popup from 'reactjs-popup';
import fetchData from '../../fetchData';

function TraitsBox({ traitsMin, traitsMaj, traitsActive }) {
    const [traitMin, setTraitMin] = useState(null);
    const [traitMaj, setTraitMaj] = useState(null);

    useEffect(() => {
        const fetchTraits = async () => {
            const fetchedTraits = await Promise.all(
                traitsMin.map((t) => fetchData('traits', t))
            );
            setTraitMin(fetchedTraits);
        };
        fetchTraits();
    }, [traitsMin]);
    useEffect(() => {
        const fetchTraits = async () => {
            const fetchedTraits = await Promise.all(
                traitsMaj.map((t) => fetchData('traits', t))
            );
            setTraitMaj(fetchedTraits);
        };
        fetchTraits();
    }, [traitsMaj]);

    function imageTraitMin(trait) {
        return <img className='minor-trait-icon' src={trait.icon} alt={trait.name} />;
    }

    function imageTraitMaj(trait) {
        return <img className={traitsActive.includes(trait.id) ? 'major-trait-icon' : 'major-trait-icon inactive-trait'} src={trait.icon} alt={trait.name} />;
    }
    return (
        <>
            {traitMin && traitMaj &&
                <Container className='custom-row'>
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
export default TraitsBox;