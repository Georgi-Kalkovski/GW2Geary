import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
//import Popup from 'reactjs-popup';
import fetchData from '../../fetchData';

import Land from './img/land.png';
import Water from './img/water.png';

function Skills({ skills, water_skills }) {
    const [heal, setHeal] = useState(null);
    const [utilities] = useState([]);
    const [elite, setElite] = useState(null);
    const [waterHeal, setWaterHeal] = useState(null);
    const [waterUtilities] = useState([]);
    const [waterElite, setWaterElite] = useState(null);

    useEffect(() => {
        const fetchSkills = async () => {
            const [healSkill, utilitySkills, eliteSkill, waterHealSkill, waterUtilitySkills, waterEliteSkill] = await Promise.all([
                skills.heal && fetchData('skills', skills.heal),
                Promise.all(skills.utilities.map(utility => utility && fetchData('skills', utility))),
                skills.elite && fetchData('skills', skills.elite),
                water_skills.heal && fetchData('skills', water_skills.heal),
                Promise.all(water_skills.utilities.map(utility => utility && fetchData('skills', utility))),
                water_skills.elite && fetchData('skills', water_skills.elite)
            ]);
            utilities.push(...utilitySkills);
            waterUtilities.push(...waterUtilitySkills);
            return [healSkill, utilitySkills, eliteSkill, waterHealSkill, waterUtilitySkills, waterEliteSkill];
        };
        fetchSkills()
            .then(([healSkill, utilitySkills, eliteSkill, waterHealSkill, waterUtilitySkills, waterEliteSkill]) => {
                utilities.push(...utilitySkills);
                waterUtilities.push(...waterUtilitySkills);
                healSkill && setHeal(healSkill);
                eliteSkill && setElite(eliteSkill);
                waterHealSkill && setWaterHeal(waterHealSkill);
                waterEliteSkill && setWaterElite(waterEliteSkill);
            })
            .catch(error => console.error('Error loading data:', error));
    }, [skills.elite, skills.heal, skills.utilities, utilities, waterUtilities, water_skills.elite, water_skills.heal, water_skills.utilities]);

    function skillCheck(skill) {
        return skill && skill.icon ? <img className='skill-box' src={skill.icon} alt={skill.name} /> : <img className="skill-box" alt="" />;
    }

    return (
        <Container className='skills-center'>
            <Row className='custom-row'>
                <Col className='center-land'><img src={Land} alt="land"/></Col>
                <Col>{skillCheck(heal)}</Col>
                <Col>{skillCheck(utilities[0])}</Col>
                <Col>{skillCheck(utilities[1])}</Col>
                <Col>{skillCheck(utilities[2])}</Col>
                <Col>{skillCheck(elite)}</Col>
            </Row>
            <Row className='custom-row'>
                <Col className='center-water'><img src={Water} alt="water"/></Col>
                <Col>{skillCheck(waterHeal)}</Col>
                <Col>{skillCheck(waterUtilities[0])}</Col>
                <Col>{skillCheck(waterUtilities[1])}</Col>
                <Col>{skillCheck(waterUtilities[2])}</Col>
                <Col>{skillCheck(waterElite)}</Col>
            </Row>
        </Container>
    );
}

export default Skills;
