import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import AuthService from "../services/auth.service";
import EquipmentDropdown from './Character/Equipment/EquipmentDropdown';
import BuildDropdown from './Character/Build/BuildDropdown';
import { wikiSmallProfessionIcons, wikiBigRacesIcons } from "./icons";
import './Character.css';

function Character() {
    const { name } = useParams();

    const formattedName = name.replaceAll('_', ' ');
    const [character, setCharacter] = useState(null);
    const [account, setAccount] = useState(null);
    const [mastery, setMastery] = useState(null);
    const [world, setWorld] = useState(null);

    useEffect(() => {
        try {
            (async () => {
                const users = await AuthService.getAllUsers();
                for (const keys of users.data.users) {
                    for (const key of keys.apiKeys) {
                        for (const char of key.characters) {
                            console.log(key)
                            if (char.name === formattedName && key.active) {
                                const charFound = (await axios.get(`https://api.guildwars2.com/v2/characters/${formattedName.replaceAll(' ', '%20')}?access_token=${key._id}&v=latest`)).data;
                                setCharacter(charFound)
                                const accFound = (await axios.get(`https://api.guildwars2.com/v2/account?access_token=${key._id}&v=latest`)).data;
                                setAccount(accFound)
                                setMastery(key.mastery_points)
                                setWorld(key.world)
                            }
                        }
                    }
                }
            })();
        } catch (error) {
            console.error(error);
        }
    }, []);
    return (
        character === null || account === null
            ? <div className='center-items'>Loading...</div>
            : <>
                <Container className='center-items'>
                    <Row><h1>{character.name}</h1></Row>
                    <Row><h3>{account.name}</h3></Row>
                    
                    <Col className='flex center' style={{ flexDirection: 'column' }}>
                            <Row style={{ fontSize: '20px', paddingBottom: '6px' }}>{world}</Row>
                            <Row className='yellow-highlight'>World</Row>
                        </Col>
                    <Row className='flex center'>
                        <Col className='flex center' style={{ flexDirection: 'column', marginRight: '20px' }}>
                            <Row><img src={wikiBigRacesIcons[character.race]} alt={character.profession} style={{ maxWidth: '25px', filter: 'grayscale(100%) brightness(300%)' }} /></Row>
                            <Row className='yellow-highlight'>{character.race} {character.gender}</Row>
                        </Col>
                        <Col className='flex center' style={{ flexDirection: 'column', marginRight: '20px' }}>
                            <Row><img  src={wikiSmallProfessionIcons[character.profession]} alt={character.profession} style={{ maxWidth: '25px' }} /></Row>
                            <Row className='yellow-highlight'>{character.profession}</Row>
                        </Col>
                        <Col className='flex center' style={{ flexDirection: 'column', marginRight: '20px' }}>
                            <Row style={{ fontSize: '25px' }}>{character.level}</Row>
                            <Row className='yellow-highlight'>Level </Row>
                        </Col>
                        <Col className='flex center' style={{ flexDirection: 'column', marginRight: '20px' }}>
                            <Row style={{ fontSize: '25px' }}>{mastery}</Row>
                            <Row className='yellow-highlight'>Mastery Points </Row>
                        </Col>
                        <Col className='flex center' style={{ flexDirection: 'column', marginRight: '20px' }}>
                            <Row style={{ fontSize: '25px' }}>{account.fractal_level}</Row>
                            <Row className='yellow-highlight'>Fractal Level</Row>
                        </Col>
                        <Col className='flex center' style={{ flexDirection: 'column', marginRight: '20px' }}>
                            <Row style={{ fontSize: '25px' }}>{account.wvw_rank}</Row>
                            <Row className='yellow-highlight'>WvW Rank</Row>
                        </Col>
                    </Row>
                    <div className='equipment-build-flex'>
                        <EquipmentDropdown char={character} />
                        <BuildDropdown char={character} />
                    </div>
                </Container>
            </>
    );
}

export default Character;