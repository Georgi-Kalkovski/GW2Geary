import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import fetchData from '../../fetchData';
import Tooltip from './Tooltip';
import Land from './img/land.png';
import Water from './img/water.png';
import Link from '../link.svg';

function Skills({ skills, water_skills, prof }) {
    const [skillsData, setSkillsData] = useState({
        heal: null,
        utilities: [null, null, null],
        elite: null,
        waterHeal: null,
        waterUtilities: [null, null, null],
        waterElite: null
    });

    useEffect(() => {
        const skillIds = [
            skills.heal,
            skills.elite,
            water_skills.heal,
            water_skills.elite,
            ...skills.utilities,
            ...water_skills.utilities
        ].filter(id => id !== null);

        (async () => {
            try {
                const skillsData = await fetchData('skills', skillIds.join(','));
                setSkillsData({
                    heal: skillsData.find(skill => skill.id === skills.heal),
                    utilities: skillsData.filter(skill => skills.utilities.includes(skill.id)).slice(0, 3),
                    elite: skillsData.find(skill => skill.id === skills.elite),
                    waterHeal: skillsData.find(skill => skill.id === water_skills.heal),
                    waterUtilities: skillsData.filter(skill => water_skills.utilities.includes(skill.id)).slice(0, 3),
                    waterElite: skillsData.find(skill => skill.id === water_skills.elite)
                });
            } catch (error) {
                console.error('Error loading data:', error);
            }
        })();
    }, [skills, water_skills]);

    const SkillBox = ({ skill }) => {
        const [showWikiButton, setShowWikiButton] = useState(false);

        const handleButtonClick = (event) => {
            event.preventDefault();

            window.open(`https://wiki.guildwars2.com/wiki/${skill.name}`, '_blank');
        };

        const handleLeftClick = (event) => {
            setShowWikiButton(true);
        };

        if (skill && skill.name) {
            return (
                <Container
                    className="skill-box-container"
                    onClick={handleLeftClick}
                    onMouseLeave={() => setShowWikiButton(false)}>
                    {showWikiButton &&
                        <button className='wiki-button basic-button' onClick={handleButtonClick}>Wiki <img src={Link} alt="" /></button>
                    }
                    <Tooltip tooltip={skill} prof={prof}>
                        <img 
                    style={{cursor: 'pointer'}} className="skill-box cursor" src={skill.icon} alt={skill.name} />
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
                {[0, 1, 2].map(index => (
                    <SkillBox key={`utility-${index}`} skill={skillsData.utilities[index]} />
                ))}
                <SkillBox skill={skillsData.elite} />
            </Row>
            <Row className="flex">
                <Col className="center-water">
                    <img src={Water} alt="water" />
                </Col>
                <SkillBox skill={skillsData.waterHeal} />
                {[0, 1, 2].map(index => (
                    <SkillBox key={`water-utility-${index}`} skill={skillsData.waterUtilities[index]} />
                ))}
                <SkillBox skill={skillsData.waterElite} />
            </Row>
        </Container>
    );
}

export default Skills;