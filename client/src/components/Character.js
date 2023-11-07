import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { Helmet } from "react-helmet";
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import fetchData from './fetchData';
import AuthService from "../services/auth.service";
import EquipmentDropdown from './Character/Equipment/EquipmentDropdown';
import BuildDropdown from './Character/Build/BuildDropdown';
import CharacterInfo from './Character/Info/CharacterInfo';
import './Character.css';
import Dragon from '../dragon.svg';
import Cog from '../cog.svg';
import { getFromLocalStorage, saveToLocalStorage } from "./localStorage";
import Share from './Share';

function Character() {
    let [searchParams, setSearchParams] = useSearchParams();
    const { name } = useParams();
    const formattedName = name.replaceAll('_', ' ');
    const currentUser = AuthService.getCurrentUser();
    const [charFound, setCharFound] = useState(null);
    const [accFound, setAccFound] = useState(null);
    const [mastery, setMastery] = useState(null);
    const [world, setWorld] = useState(null);
    const [isPrivate, setIsPrivate] = useState(false)
    const [selectedBuild, setSelectedBuild] = useState([]);
    const [shareLink, setShareLink] = useState(window.location.href);
    const [eqUp, setEqUp] = useState(searchParams.get('eq'));
    const [bldUp, setBldUp] = useState(searchParams.get('bld'));
    const [specUp, setSpecUp] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    let navigate = useNavigate();

    useEffect(() => {
        let params = {};
        if (eqUp) {
            params.eq = eqUp;
        }
        if (bldUp) {
            params.bld = bldUp;
        }
        if (world !== null) {
            localStorage.setItem('w', world);
        }

        if (accFound && charFound) {
            localStorage.setItem('acc', accFound.name);
            localStorage.setItem('lvl', charFound.level);
            localStorage.setItem('prof', charFound.profession);
            localStorage.setItem('race', charFound.race);
            localStorage.setItem('gen', charFound.gender);
            localStorage.setItem('frac', accFound.fractal_level);
            localStorage.setItem('wvw', accFound.wvw_rank);
        }

        if (specUp !== null) {
            localStorage.setItem('spec', specUp);
        }

        if (mastery !== null) {
            localStorage.setItem('mp', mastery);
        }
        setSearchParams(params);
        setShareLink(window.location.href);
    }, [eqUp, bldUp, mastery, world, charFound, accFound, specUp]);
    useEffect(() => {
        try {
            (async () => {
                const accFoundData = getFromLocalStorage('accFound');
                const accName = accFoundData?.name;
                const charFoundData = getFromLocalStorage('charFound');
                const charName = charFoundData?.name;

                if (accName && charName && charName === formattedName) {
                    setAccFound(getFromLocalStorage('accFound'))
                    setMastery(getFromLocalStorage('mastery'))
                    setWorld(getFromLocalStorage('world'))
                    setCharFound(getFromLocalStorage('charFound'))

                    const activeStored = getFromLocalStorage('account');
                    if (activeStored && !activeStored.active) {
                        if (!currentUser || !currentUser.apiKeys.find(acc => acc.accountName === activeStored.accountName)) {
                            navigate("/");
                        }
                        setActive(true)
                    }
                } else {
                    const user = await AuthService.getCharacter(formattedName);
                    const updatedCharacters = [];
                    const account = user.data?.user?.apiKeys?.find(acc => acc.characters.find(char => char.name === formattedName));
                    const character = account?.characters.find(char => char.name === formattedName);
                    if (!account.active || !character.active) {
                        if (!currentUser || !currentUser.apiKeys.find(api => api.accountName === account.accountName)) {
                            navigate("/");
                        }
                        setIsPrivate(true);
                    }
                    if (account) {
                        updatedCharacters.push(account);
                        const charFound = await fetchData('characters', formattedName);
                        setCharFound(charFound)
                        const accFound = await fetchData('account', account.accountName);
                        setAccFound(accFound);
                        const mastery_points = await fetchData('mastery', account.accountName);
                        let world;
                        if (accFound && accFound.world) {
                            world = (await axios.get(`https://api.guildwars2.com/v2/worlds/${accFound.world}`)).data;
                        }
                        let mastery = mastery_points.totals.reduce((acc, x) => acc + x.spent, 0)
                        setMastery(mastery)
                        setWorld(world.name)

                        saveToLocalStorage('accFound', accFound);
                        saveToLocalStorage('mastery', mastery);
                        saveToLocalStorage('world', world.name);
                        saveToLocalStorage('charFound', charFound);
                        saveToLocalStorage('characters', account);
                    }
                    saveToLocalStorage('characters', updatedCharacters);

                }
            })();
        } catch (error) {
            console.error(error);
        }
    }, []);

    const [maxHeight, setMaxHeight] = useState(0);

    useEffect(() => {
        if (window.innerWidth <= 900) {
            setMaxHeight(Math.max(document.documentElement.clientHeight, window.innerHeight || 0) * 0.68);
        }
    }, []);

    return (
        charFound === null || accFound === null
            ? <div className="flex center">
                <div className="logo-loading-div">
                    <img src={Dragon} alt="" className="logo--loading-dragon" />
                    <img src={Cog} alt="" className="logo-loading-cog" />
                </div>
            </div>
            : <div>
                <Helmet>
                    <title>GW2Geary - {charFound ? charFound?.name : 'Character'}</title>
                </Helmet>
                <Container className='center-items'>
                    {/* Breadcrumb */}
                    <nav aria-label="breadcrumb" className="breadcrumb">
                        <ul style={{ listStyleType: "none" }} className='flex center'>
                            <li>
                                <Link className='nav-a' to="/">Search</Link>
                            </li>
                            <li className="breadcrumb-item">
                                <span>{`/`} </span><Link className='nav-a' to={`/a/${accFound.name.replaceAll(' ', '_')}`}>Account</Link>
                            </li>
                            <li style={{ cursor: "default" }} aria-current="page">
                                <span>{`/`} </span><span style={{ color: "rgb(241, 101, 101" }}>Character</span>
                            </li>
                            <li className="breadcrumb-item flex">
                                <span style={{ margin: '0px 5px' }}>{`-`}</span>
                                <span>
                                    <Share
                                        isOpen={isOpen}
                                        setIsOpen={setIsOpen}
                                        prof={charFound.profession}
                                    />
                                </span>
                            </li>
                        </ul>
                    </nav>

                    {/* Private Character */}
                    {isPrivate === true
                        ? <div className="flex center" style={{ color: '#f16565', fontSize: '25px', paddingBottom: '20px', marginTop: '-15px' }}>Only you can see this character !</div>
                        : ''
                    }
                    <CharacterInfo char={charFound} acc={accFound} mastery={mastery ? mastery : '0'} world={world ? world : '0'} shareLink={shareLink} />
                    <div className={window.innerWidth < 900 ? 'custom-scrollbar equipment-build-flex' : 'equipment-build-flex'} style={window.innerWidth < 900 ? { textAlign: 'left', marginBottom: '20px', maxHeight: `${maxHeight}px`, overflow: 'auto' } : {}}>
                        <EquipmentDropdown char={charFound} initial={eqUp} build={selectedBuild} setEquip={setEqUp} />
                        <BuildDropdown char={charFound} initial={bldUp} setSelectedBuild={setSelectedBuild} setBuildState={setBldUp} setEliteSpec={setSpecUp} />
                    </div>
                    <br />
                </Container>
            </div>
    );
}

export default Character;