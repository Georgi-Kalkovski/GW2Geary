import React from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import fetchData from './fetchData';
import AuthService from "../services/auth.service";
import EquipmentDropdown from './Character/Fashion/EquipmentDropdown';
import './Character.css';
import Dragon from '../dragon.svg';
import Cog from '../cog.svg';

function CharacterFashionEmbed() {
    let [searchParams, setSearchParams] = useSearchParams();
    const { name } = useParams();
    const formattedName = name.replaceAll('_', ' ');
    const currentUser = AuthService.getCurrentUser();
    const [character, setCharacter] = useState(null);
    const [accFound, setAccFound] = useState(null);
    const [eqUp, setEqUp] = useState(searchParams.get('eq'));
    let navigate = useNavigate();

    useEffect(() => {
        let params = {};
        if (eqUp) {
            params.eq = eqUp;
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
            ?
            <Container className='center-items equipment equipment-fashion'>
                <div className="flex">
                    <div className="logo-loading-div" style={{ top: '200px', left: '140px' }}>
                        <img src={Dragon} alt="" className="logo--loading-dragon" />
                        <img src={Cog} alt="" className="logo-loading-cog" />
                    </div>
                </div>
            </Container>
            : <Container className='center-items'>
                <div style={{ margin: '-75px 0 -5px -36px' }}>
                    <EquipmentDropdown char={character} initial={eqUp} setEquip={setEqUp} embed={true}/>
                </div>
            </Container>
    );
}

export default CharacterFashionEmbed;