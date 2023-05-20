import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import AuthService from "../services/auth.service";
import fetchData from './fetchData';
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
                            if (char.name === formattedName) {
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
                    <Row className='flex center'>
                        <Col className='flex center' style={{ flexDirection: 'column', marginRight: '20px' }}>
                            <Row><img src={wikiBigRacesIcons[character.race]} alt={character.profession} style={{ maxWidth: '30px', filter: 'grayscale(100%) brightness(600%)' }} /></Row>
                            <Row >{character.race} {character.gender}</Row>
                        </Col>
                        <Col className='flex center' style={{ flexDirection: 'column', marginRight: '20px' }}>
                            <Row><img src={wikiSmallProfessionIcons[character.profession]} alt={character.profession} style={{ maxWidth: '30px' }} /></Row>
                            <Row >{character.profession}</Row>
                        </Col>
                        <Col className='flex center' style={{ flexDirection: 'column', marginRight: '20px' }}>
                            <Row style={{ fontSize: '30px' }}>{character.level}</Row>
                            <Row >Level </Row>
                        </Col>
                        <Col className='flex center' style={{ flexDirection: 'column', marginRight: '20px' }}>
                            <Row style={{ fontSize: '30px' }}>{mastery}</Row>
                            <Row >Mastery Points </Row>
                        </Col>
                        <Col className='flex center' style={{ flexDirection: 'column', marginRight: '20px' }}>
                            <Row style={{ fontSize: '30px' }}>{account.fractal_level}</Row>
                            <Row >Fractal Level</Row>
                        </Col>
                        <Col className='flex center' style={{ flexDirection: 'column', marginRight: '20px' }}>
                            <Row style={{ fontSize: '30px' }}>{account.wvw_rank}</Row>
                            <Row >WvW Rank</Row>
                        </Col>
                        <Col className='flex center' style={{ flexDirection: 'column' }}>
                            <Row style={{ fontSize: '25px', paddingBottom: '6px'}}>{world}</Row>
                            <Row >World</Row>
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