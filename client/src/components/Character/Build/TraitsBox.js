import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Popup from 'reactjs-popup';
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
    }, []);
    useEffect(() => {
        const fetchTraits = async () => {
            const fetchedTraits = await Promise.all(
                traitsMaj.map((t) => fetchData('traits', t))
            );
            setTraitMaj(fetchedTraits);
        };
        fetchTraits();
    }, []);
    if(traitMaj)
    return (
        <>
            {traitMin && traitMaj &&
                <Container className='custom-row'>
                    <Col><img className='minor-trait-icon' src={traitMin[0].icon} alt={traitMin[0].name} /></Col>
                    <Col className='major-col'>
                        <Row><img className={traitsActive.includes(traitMaj[0].id) ? 'major-trait-icon': 'major-trait-icon inactive-trait' } src={traitMaj[0].icon} alt={traitMaj[0].name} /></Row>
                        <Row><img className={traitsActive.includes(traitMaj[1].id) ? 'major-trait-icon': 'major-trait-icon inactive-trait' } src={traitMaj[1].icon} alt={traitMaj[1].name} /></Row>
                        <Row><img className={traitsActive.includes(traitMaj[2].id) ? 'major-trait-icon': 'major-trait-icon inactive-trait' } src={traitMaj[2].icon} alt={traitMaj[2].name} /></Row>
                    </Col>
                    <Col><img className='minor-trait-icon' src={traitMin[1].icon} alt={traitMin[1].name} /></Col>
                    <Col className='major-col'>
                        <Row><img className={traitsActive.includes(traitMaj[3].id) ? 'major-trait-icon': 'major-trait-icon inactive-trait' } src={traitMaj[3].icon} alt={traitMaj[3].name} /></Row>
                        <Row><img className={traitsActive.includes(traitMaj[4].id) ? 'major-trait-icon': 'major-trait-icon inactive-trait' } src={traitMaj[4].icon} alt={traitMaj[4].name} /></Row>
                        <Row><img className={traitsActive.includes(traitMaj[5].id) ? 'major-trait-icon': 'major-trait-icon inactive-trait' } src={traitMaj[5].icon} alt={traitMaj[5].name} /></Row>
                    </Col>
                    <Col><img className='minor-trait-icon' src={traitMin[2].icon} alt={traitMin[2].name} /></Col>
                    <Col className='major-col'>
                        <Row><img className={traitsActive.includes(traitMaj[6].id) ? 'major-trait-icon': 'major-trait-icon inactive-trait' } src={traitMaj[6].icon} alt={traitMaj[6].name} /></Row>
                        <Row><img className={traitsActive.includes(traitMaj[7].id) ? 'major-trait-icon': 'major-trait-icon inactive-trait' } src={traitMaj[7].icon} alt={traitMaj[7].name} /></Row>
                        <Row><img className={traitsActive.includes(traitMaj[8].id) ? 'major-trait-icon': 'major-trait-icon inactive-trait' } src={traitMaj[8].icon} alt={traitMaj[8].name} /></Row>
                    </Col>
                </Container>
            }
        </>
    );
}
export default TraitsBox;