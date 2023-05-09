import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import TraitsTooltip from './TraitsTooltip';
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
        console.log(trait)
        return (
            <TraitsTooltip description={trait.description} skills={trait.skills} facts={trait.facts} name={trait.name}>
                <img className='minor-trait-icon' src={trait.icon} alt={trait.name} />
            </TraitsTooltip>
        );
    }

    function imageTraitMaj(trait) {
        console.log(trait)
        return (
            <TraitsTooltip description={trait.description} skills={trait.skills} facts={trait.facts} name={trait.name}>
                <img src={trait.icon} alt={trait.name} className={traitsActive.includes(trait.id) ? 'major-trait-icon' : 'major-trait-icon inactive-trait'} />
            </TraitsTooltip>
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
export default TraitsBox;

// const [traits, setTraits] = useState(null);
    
//     useEffect(() => {
//         (async () => {
//             try {
//                 const fetchedTraits = await Promise.all([
//                     ...traitsMin.map((t) => fetchData('traits', t)),
//                     ...traitsMaj.map((t) => fetchData('traits', t)),
//                 ]);
//                 setTraits(fetchedTraits);
//             } catch (error) {
//                 console.error('Error fetching traits:', error);
//             }
//         })();
//     }, [traitsMin, traitsMaj]);

//     if (!traits) {
//         return null;
//     }

//     const traitMin = [traits[0], traits[1], traits[2]];
//     const traitMaj = [traits[3], traits[4], traits[5], traits[6], traits[7], traits[8]];

//     return (
//         <Container className='flex'>
//             <Col>{imageTraitMin(traitMin[0])}</Col>
//             <Col className='major-col'>
//                 <Row>{imageTraitMaj(traitMaj[0])}</Row>
//                 <Row>{imageTraitMaj(traitMaj[1])}</Row>
//                 <Row>{imageTraitMaj(traitMaj[2])}</Row>
//             </Col>
//             <Col>{imageTraitMin(traitMin[1])}</Col>
//             <Col className='major-col'>
//                 <Row>{imageTraitMaj(traitMaj[3])}</Row>
//                 <Row>{imageTraitMaj(traitMaj[4])}</Row>
//                 <Row>{imageTraitMaj(traitMaj[5])}</Row>
//             </Col>
//             <Col>{imageTraitMin(traitMin[2])}</Col>
//             <Col className='major-col'>
//                 <Row>{imageTraitMaj(traitMaj[6])}</Row>
//                 <Row>{imageTraitMaj(traitMaj[7])}</Row>
//                 <Row>{imageTraitMaj(traitMaj[8])}</Row>
//             </Col>
//         </Container>
//     );