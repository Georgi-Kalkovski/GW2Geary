import React from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import fetchData from './fetchData';
import AuthService from "../services/auth.service";
import EquipmentDropdown from './Character/Fashion/EquipmentDropdown';
import './Character.css';
import Dragon from '../dragon.svg';
import Cog from '../cog.svg';
import { getFromLocalStorage, saveToLocalStorage } from "./localStorage";

function CharacterFashion() {
    let [searchParams, setSearchParams] = useSearchParams();
    const { name } = useParams();
    const formattedName = name.replaceAll('_', ' ');
    const currentUser = AuthService.getCurrentUser();
    const [character, setCharacter] = useState(null);
    const [accFound, setAccFound] = useState(null);
    const [isPrivate, setIsPrivate] = useState(false)
    const [eqUp, setEqUp] = useState(searchParams.get('eq'));
    let navigate = useNavigate();

    useEffect(() => {
        let params = {};
        if (eqUp) {
            params.eq = eqUp;
        }
        if (character) {
            params.prof = character.profession;
            params.race = character.race;
            params.gen = character.gender;
        }
        setSearchParams(params);
    }, [eqUp]);

    useEffect(() => {
        try {
            (async () => {
                const user = await AuthService.getCharacter(formattedName);
                const account = user.data?.user?.apiKeys?.find(acc => acc.characters.find(char => char.name === formattedName));
                const character = account?.characters.find(char => char.name === formattedName);
                if (!account.active || !character.active) {
                    if (!currentUser || !currentUser.apiKeys.find(api => api.accountName === account.accountName)) {
                        navigate("/");
                    }
                    setIsPrivate(true);
                }
                if (account) {
                    const charFound = await fetchData('characters', formattedName);
                    setCharacter(charFound)
                    const accFound = await fetchData('account', account.accountName);
                    setAccFound(accFound)
                }
            })();
        } catch (error) {
            console.error(error);
        }
    }, []);

    return (
        character === null || accFound === null
            ? <div className="flex center">
                <div className="logo-loading-div">
                    <img src={Dragon} alt="" className="logo--loading-dragon" />
                    <img src={Cog} alt="" className="logo-loading-cog" />
                </div>
            </div>
            : <div>
                <Helmet>
                    <title>GW2Geary - {character ? character?.name : 'Character'}</title>
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
                        </ul>
                    </nav>

                    {/* Private Character */}
                    {isPrivate === true
                        ? <div className="flex center" style={{ color: '#f16565', fontSize: '25px', paddingBottom: '20px', marginTop: '-15px' }}>Only you can see this character !</div>
                        : ''
                    }
                    <div className='equipment-build-flex-fashion'>
                        <EquipmentDropdown char={character} initial={eqUp} setEquip={setEqUp} />
                    </div>
                    <br />
                </Container>
            </div>
    );
}

export default CharacterFashion;