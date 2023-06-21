import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AuthService from "../services/auth.service";
import EquipmentDropdown from './Character/Equipment/EquipmentDropdown';
import BuildDropdown from './Character/Build/BuildDropdown';
import CharacterInfo from './Character/Info/CharacterInfo';
import './Character.css';
import Dragon from '../dragon.svg';
import Cog from '../cog.svg';

function Character() {
    const { name } = useParams();
    const formattedName = name.replaceAll('_', ' ');
    const currentUser = AuthService.getCurrentUser();
    const [character, setCharacter] = useState(null);
    const [account, setAccount] = useState(null);
    const [mastery, setMastery] = useState(null);
    const [world, setWorld] = useState(null);
    const [isPrivate, setIsPrivate] = useState(false)

    const [selectedBuild, setSelectedBuild] = useState([]);

    useEffect(() => {
        try {
            (async () => {
                const users = await AuthService.getAllUsers();
                for (const keys of users.data.users) {
                    for (const key of keys.apiKeys) {
                        for (const char of key.characters) {
                            if (char.name === formattedName
                                && key.active
                                || char.name === formattedName
                                && currentUser?.apiKeys.find(k => k._id === key._id)) {
                                if (!key.active
                                    && char.name === formattedName
                                    && currentUser.apiKeys.find(k => k._id === key._id)) {
                                    setIsPrivate(true)
                                }

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
                {/* Breadcrumb */}
                <nav aria-label="breadcrumb">
                    <ul style={{ listStyleType: "none" }} className='flex center'>
                        <li>
                            <Link className='nav-a' to="/search">Search</Link>
                        </li>
                        <li className="breadcrumb-item">
                            <span>{`/ `} </span><Link className='nav-a' to={`/accounts/${account.name.replaceAll(' ', '_')}`}>Account</Link>
                        </li>
                        <li style={{ cursor: "default" }} aria-current="page">
                            <span>{`/ `} </span><span style={{ color: "#d70000" }}>Character</span>
                        </li>
                    </ul>
                </nav>

                {/* Private Character */}
                {isPrivate === true
                    ? <div className="flex center" style={{ color: '#f16565', fontSize: '25px', paddingBottom: '20px', marginTop: '-15px' }}>Only you can see this character !</div>
                    : ''
                }

                <CharacterInfo char={character} acc={account} mastery={mastery} world={world} />

                <div className='equipment-build-flex'>
                    <EquipmentDropdown char={character} build={selectedBuild}/>
                    <BuildDropdown char={character} setSelectedBuild={setSelectedBuild}/>
                </div>
            </Container>
    );
}

export default Character;