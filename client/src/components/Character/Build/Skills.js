import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import fetchData from '../../fetchData';
import SkillsTooltip from './SkillsTooltip';

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

    const SkillBox = ({ skill }) => {
        if (skill && skill.name) {
            return (
                <Container className="skill-box-container">
                    <SkillsTooltip name={skill.name} icon={skill.icon} tooltipText={skill.description} />
                </Container>
            );
        } else {
            return <img className="skill-box" alt="" />
        }
    };
    
    return (
        <Container className="skills-center">
            <Row className="flex">
                <Col className="center-land"><img src={Land} alt="land" /></Col>
                <SkillBox skill={heal} />
                <SkillBox skill={utilities[0]} />
                <SkillBox skill={utilities[1]} />
                <SkillBox skill={utilities[2]} />
                <SkillBox skill={elite} />
            </Row>
            <Row className="flex">
                <Col className="center-water"><img src={Water} alt="water" /></Col>
                <SkillBox skill={waterHeal} />
                <SkillBox skill={waterUtilities[0]} />
                <SkillBox skill={waterUtilities[1]} />
                <SkillBox skill={waterUtilities[2]} />
                <SkillBox skill={waterElite} />
            </Row>
        </Container>
    );

}

export default Skills;
