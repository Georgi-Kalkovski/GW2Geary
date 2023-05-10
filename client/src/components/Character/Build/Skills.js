import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import fetchData from '../../fetchData';
import Tooltip from './Tooltip';

import Land from './img/land.png';
import Water from './img/water.png';

function Skills({ skills, water_skills }) {
    const [skillsData, setSkillsData] = useState({
        heal: null,
        utilities: [null, null, null],
        elite: null,
        waterHeal: null,
        waterUtilities: [null, null, null],
        waterElite: null
    });
    useEffect(() => {
        (async () => {
            try {
                const promises = [
                    skills.heal && fetchData('skills', skills.heal),
                    skills.elite && fetchData('skills', skills.elite),
                    water_skills.heal && fetchData('skills', water_skills.heal),
                    water_skills.elite && fetchData('skills', water_skills.elite),
                    Promise.all(skills.utilities.map(utility => utility && fetchData('skills', utility))),
                    Promise.all(water_skills.utilities.map(utility => utility && fetchData('skills', utility)))
                ];
                const [
                    healSkill,
                    eliteSkill,
                    waterHealSkill,
                    waterEliteSkill,
                    utilitySkills,
                    waterUtilitySkills
                ] = await Promise.all(promises);

                setSkillsData({
                    heal: healSkill,
                    utilities: utilitySkills.slice(0, 3),
                    elite: eliteSkill,
                    waterHeal: waterHealSkill,
                    waterUtilities: waterUtilitySkills.slice(0, 3),
                    waterElite: waterEliteSkill
                });
            } catch (error) {
                console.error('Error loading data:', error);
            }
        })();
    }, [skills, water_skills]);

    const SkillBox = ({ skill }) => {
        if (skill && skill.name) {
            return (
                <Container className="skill-box-container">
                    {console.log(skill)}
                    <Tooltip tooltip={skill}>
                        <img className="skill-box cursor" src={skill.icon} alt={skill.name} />
                    </Tooltip>
                </Container>
            );
        } else {
            return <img className="skill-box" alt="" />;
        }
    };

    return (
        <Container className="skills-center">
            <Row className="flex">
                <Col className="center-land">
                    <img src={Land} alt="land" />
                </Col>
                <SkillBox skill={skillsData.heal} />
                {skillsData.utilities.map((utility, index) => (
                    <SkillBox key={`utility-${index}`} skill={utility} />
                ))}
                <SkillBox skill={skillsData.elite} />
            </Row>
            <Row className="flex">
                <Col className="center-water">
                    <img src={Water} alt="water" />
                </Col>
                <SkillBox skill={skillsData.waterHeal} />
                {skillsData.waterUtilities.map((utility, index) => (
                    <SkillBox key={`water-utility-${index}`} skill={utility} />
                ))}
                <SkillBox skill={skillsData.waterElite} />
            </Row>
        </Container>
    );
}

export default Skills;