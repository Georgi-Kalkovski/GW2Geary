import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Popup from 'reactjs-popup';
import fetchData from '../../fetchData';
import Land from './img/land.png';
import Water from './img/water.png';

function Skills({ skills, water_skills }) {
    const [heal, setHeal] = useState(null);
    const [utilities, setUtilities] = useState(null);
    const [elite, setElite] = useState(null);
    const [waterHeal, setWaterHeal] = useState(null);
    const [waterUtilities, setWaterUtilities] = useState(null);
    const [waterElite, setWaterElite] = useState(null);

    useEffect(() => {
        const fetchHeal = async () => {
            const skill = await fetchData('skills', skills.heal);
            setHeal(skill);
        };
        fetchHeal();
    }, []);

    useEffect(() => {
        const fetchUtilities = async () => {
            const utilitySkills = [];
            for (const utility of skills.utilities) {
                const skill = await fetchData('skills', utility);
                utilitySkills.push(skill);
            }
            setUtilities(utilitySkills);
        };
        fetchUtilities();
    }, []);

    useEffect(() => {
        const fetchElite = async () => {
            const skill = await fetchData('skills', skills.elite);
            setElite(skill);
        };
        fetchElite();
    }, []);

    useEffect(() => {
        const fetchWaterHeal = async () => {
            const skill = await fetchData('skills', water_skills.heal);
            setWaterHeal(skill);
        };
        fetchWaterHeal();
    }, []);

    useEffect(() => {
        const fetchWaterUtilities = async () => {
            const utilitySkills = [];
            for (const utility of water_skills.utilities) {
                const skill = await fetchData('skills', utility);
                utilitySkills.push(skill);
            }
            setWaterUtilities(utilitySkills);
        };
        fetchWaterUtilities();
    }, []);

    useEffect(() => {
        const fetchWaterElite = async () => {
            const skill = await fetchData('skills', water_skills.elite);
            setWaterElite(skill);
        };
        fetchWaterElite();
    }, []);

    function skillCheck(skill) {
        if (skill && skill != null && skill.icon) {
            return <img className='skill-box' src={skill.icon} />;
        }
        return <img className="skill-box" alt="" />;
    }

    return (
        <>
            {
                <Container className='skills-center'>
                    <Row className='custom-row'>
                        <Col className='center-land'><img src={Land} /></Col>
                        <Col>{skillCheck(heal)}</Col>
                        <Col>{skillCheck(utilities?.[0])}</Col>
                        <Col>{skillCheck(utilities?.[1])}</Col>
                        <Col>{skillCheck(utilities?.[2])}</Col>
                        <Col>{skillCheck(elite)}</Col>
                    </Row>
                    <Row className='custom-row'>
                        <Col className='center-water'><img src={Water} /></Col>
                        <Col>{skillCheck(waterHeal)}</Col>
                        <Col>{skillCheck(waterUtilities?.[0])}</Col>
                        <Col>{skillCheck(waterUtilities?.[1])}</Col>
                        <Col>{skillCheck(waterUtilities?.[2])}</Col>
                        <Col>{skillCheck(waterElite)}</Col>
                    </Row>
                </Container>
            }
        </>
    );
}

export default Skills;