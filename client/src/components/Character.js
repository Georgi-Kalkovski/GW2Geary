import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import fetchData from './fetchData';
import AuthService from "../services/auth.service";
import EquipmentDropdown from './Character/Equipment/EquipmentDropdown';
import BuildDropdown from './Character/Build/BuildDropdown';
import CharacterInfo from './Character/Info/CharacterInfo';
import CharacterShareLink from './Character/Info/CharacterShareLink';
import './Character.css';
import Dragon from '../dragon.svg';
import Cog from '../cog.svg';

function Character() {
    let [searchParams, setSearchParams] = useSearchParams();
    const { name } = useParams();
    const formattedName = name.replaceAll('_', ' ');
    const currentUser = AuthService.getCurrentUser();
    const [character, setCharacter] = useState(null);
    const [account, setAccount] = useState(null);
    const [mastery, setMastery] = useState(null);
    const [world, setWorld] = useState(null);
    const [isPrivate, setIsPrivate] = useState(false)
    const [selectedBuild, setSelectedBuild] = useState([]);
    const [shareLink, setShareLink] = useState(window.location.href);
    const [eqUp, setEqUp] = useState(searchParams.get('eq'));
    const [bldUp, setBldUp] = useState(searchParams.get('bld'));
    let navigate = useNavigate();

    useEffect(() => {
        let params = {};
        if (eqUp) {
            params.eq = eqUp;
        }
        if (bldUp) {
            params.bld = bldUp;
        }
        setSearchParams(params);
        setShareLink(window.location.href);
    }, [eqUp, bldUp]);

    useEffect(() => {
        try {
            (async () => {
                const users = await AuthService.getAllUsers();
                const apis = users.data?.users?.find(accs => accs.apiKeys.find(chars => chars.characters.find(char => char.name === formattedName)))
                const account = apis?.apiKeys?.find(chars => chars.characters.find(char => char.name === formattedName))
                const character = account?.characters.find(char => char.name === formattedName);
                if (!account.active || !character.active) {
                    if (!currentUser || currentUser?.apiKeys.includes(api => api?.accountName === account.accountName)) {
                        navigate("/");
                    }
                    setIsPrivate(true)
                } else {
                }
                if (account) {
                    const charFound = await fetchData('characters', formattedName);
                    setCharacter(charFound)
                    const accFound = await fetchData('account', account.accountName);
                    setAccount(accFound)
                    const mastery_points = await fetchData('mastery', account.accountName);
                    let world;
                    if (accFound && accFound.world) {
                        world = (await axios.get(`https://api.guildwars2.com/v2/worlds/${accFound.world}`)).data;
                    }
                    setMastery(mastery_points.totals.reduce((acc, x) => acc + x.spent, 0))
                    setWorld(world.name)
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
                            <span>{`/`} </span><Link className='nav-a' to={`/a/${account.name.replaceAll(' ', '_')}`}>Account</Link>
                        </li>
                        <li style={{ cursor: "default" }} aria-current="page">
                            <span>{`/`} </span><span style={{ color: "#d70000" }}>Character</span>
                        </li>
                    </ul>
                </nav>

                {/* Private Character */}
                {isPrivate === true
                    ? <div className="flex center" style={{ color: '#f16565', fontSize: '25px', paddingBottom: '20px', marginTop: '-15px' }}>Only you can see this character !</div>
                    : ''
                }
                <CharacterInfo char={character} acc={account} mastery={mastery} world={world} shareLink={shareLink} />
                <div className='equipment-build-flex'>
                    <EquipmentDropdown char={character} initial={eqUp} build={selectedBuild} setEquip={setEqUp} />
                    <BuildDropdown char={character} initial={bldUp} setSelectedBuild={setSelectedBuild} setBuildState={setBldUp} />
                </div>
            </Container>
    );
}

export default Character;