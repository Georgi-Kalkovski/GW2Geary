import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import AuthService from "../services/auth.service";
import fetchData from './fetchData';
import EquipmentDropdown from './Character/Equipment/EquipmentDropdown';
import BuildDropdown from './Character/Build/BuildDropdown';
import './Character.css';

function Character() {
    const { name } = useParams();

    const formattedName = name.replaceAll('_', ' ');
    const [character, setCharacter] = useState(null);
    const [profession, setProfession] = useState('');

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
                                setProfession(await fetchData('professions', charFound.profession))
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
        character === null
            ? <div className='center-items'>Loading...</div>
            : <>
                <div className='center-items'>
                    <h1>{character.name}</h1>
                    <div>{character.level} {character.race}</div>
                    <div className="center-class">
                        <img src={profession.icon} alt={character.profession} />{character.profession}
                    </div>
                    <div className='equipment-build-flex'>
                        <EquipmentDropdown char={character} />
                        <BuildDropdown char={character} />
                    </div>
                </div>
            </>
    );
}

export default Character;