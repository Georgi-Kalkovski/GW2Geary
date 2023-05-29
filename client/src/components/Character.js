import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import AuthService from "../services/auth.service";
import EquipmentDropdown from './Character/Equipment/EquipmentDropdown';
import BuildDropdown from './Character/Build/BuildDropdown';
import { wikiSmallProfessionIcons, wikiBigRacesIcons } from "./icons";
import './Character.css';
import Cog from '../cog.svg'
import Dragon from '../dragon.svg'

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
                            if (char.name === formattedName && key.active) {
                                const charFound = (await axios.get(`https://api.guildwars2.com/v2/characters/${formattedName.replaceAll(' ', '%20')}?access_token=${key._id}&v=latest`)).data;
                                setCharacter(charFound)
                                const accFound = (await axios.get(`https://api.guildwars2.com/v2/account?access_token=${key._id}&v=latest`)).data;
                                const mastery_points = (await axios.get(`https://api.guildwars2.com/v2/account/mastery/points?access_token=${key._id}`)).data;
                                let world;
                                if (accFound && accFound.world) {
                                    world = (await axios.get(`https://api.guildwars2.com/v2/worlds/${accFound.world}`)).data;
                                }
                                setAccount(accFound)
                                setMastery(mastery_points.totals.reduce((acc, x) => acc + x.spent, 0))
                                setWorld(world.name)
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
            ? <div className="flex center">
                <div className="logo-loading-div">
                    <img src={Dragon} alt="" className="logo--loading-dragon" />
                    <img src={Cog} alt="" className="logo-loading-cog" />
                </div>
            </div>
            : <Container className='center-items'>
                {/* Name */}
                <Row><div style={{ fontSize: '30px' }}>{character.name}</div></Row>
                <Row><div className='yellow-highlight' style={{ fontSize: '20px' }}>{account.name}</div></Row>
                <br />
                {/* World */}
                <Col className='flex center' style={{ flexDirection: 'column' }}>
                    <Row style={{ fontSize: '20px', paddingBottom: '6px' }}>{world}</Row>
                    <Row className='yellow-highlight'>World</Row>
                </Col>
                <br />
                <Row className='flex center'>
                    {/* Race & Gender */}
                    <Col className='character-col'>
                        <Row className='font-size-25px'>
                            <img
                                src={wikiBigRacesIcons[character.race]} alt={character.profession}
                                style={{ maxWidth: '25px', filter: 'grayscale(100%) brightness(300%)' }}
                            />
                        </Row>
                        <Row className='yellow-highlight'>{character.race} {character.gender}</Row>
                    </Col>
                    {/* Profession */}
                    <Col className='character-col'>
                        <Row className='font-size-25px'>
                            <img
                                src={wikiSmallProfessionIcons[character.profession]}
                                style={{ maxWidth: '25px' }}
                                alt={character.profession}
                            />
                        </Row>
                        <Row className='yellow-highlight'>{character.profession}</Row>
                    </Col>
                    {/* Level */}
                    <Col className='character-col'>
                        <Row className='font-size-25px'>{character.level}</Row>
                        <Row className='yellow-highlight'>Level </Row>
                    </Col>
                    {/* Mastery Points */}
                    <Col className='character-col'>
                        <Row className='font-size-25px'>{mastery}</Row>
                        <Row className='yellow-highlight'>Mastery Points </Row>
                    </Col>
                    {/* Fractal Level */}
                    <Col className='character-col'>
                        <Row className='font-size-25px'>{account.fractal_level}</Row>
                        <Row className='yellow-highlight'>Fractal Level</Row>
                    </Col>
                    {/* WvW Rank */}
                    <Col className='character-col'>
                        <Row className='font-size-25px'>{account.wvw_rank}</Row>
                        <Row className='yellow-highlight'>WvW Rank</Row>
                    </Col>
                </Row>

                <div className='equipment-build-flex'>
                    <EquipmentDropdown char={character} />
                    <BuildDropdown char={character} />
                </div>
            </Container>
    );
}

export default Character;