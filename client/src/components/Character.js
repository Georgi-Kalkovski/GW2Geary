import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import fetchData from './fetchData';
import EquipmentDropdown from './Character/Equipment/EquipmentDropdown';
import BuildDropdown from './Character/Build/BuildDropdown';
import './Character.css';

function Character() {
    const { name } = useParams();

    const formattedName = name.replaceAll('_', '%20');
    const [character, setCharacter] = useState(null);
    const [profession, setProfession] = useState('');

    useEffect(() => {
        (async () => {
            try {
                const char = await fetchData('characters', formattedName);
                setCharacter(char);
                const prof = await fetchData('professions', char.profession);
                setProfession(prof);
            } catch (error) {
                console.log(error);
            }
        })();
    }, [name]);

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