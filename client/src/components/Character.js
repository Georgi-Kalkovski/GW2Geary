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
import fetchData from './fetchData';

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
            const response = await axios.get(`https:/gw2geary.com/api/characters/${formattedName}`);
            console.log(response)
            const data = response.data;
    
            if (data.character && data.account) {
              setCharacter(data.character);
              setAccount(data.account);
              setMastery(data.mastery);
              setWorld(data.world);
            }
    
            if (!data.account.active && data.character && currentUser?.apiKeys.find(k => k._id === data.account._id)) {
              setIsPrivate(true);
            }
          })();
        } catch (error) {
          console.error(error);
        }
      }, [formattedName, currentUser]);

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
                            <span>{`/ `} </span><Link className='nav-a' to={`/a/${account.name.replaceAll(' ', '_')}`}>Account</Link>
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
                    <EquipmentDropdown char={character} build={selectedBuild} />
                    <BuildDropdown char={character} setSelectedBuild={setSelectedBuild} />
                </div>
            </Container>
    );
}

export default Character;