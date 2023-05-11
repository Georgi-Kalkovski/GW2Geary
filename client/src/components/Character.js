import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import fetchData from './fetchData';
import EquipmentDropdown from './Character/Equipment/EquipmentDropdown';
import BuildDropdown from './Character/Build/BuildDropdown';
import BackButton from './BackButton';
import './Character.css';

function Character() {
    const { name } = useParams();
    const [character, setCharacter] = useState(null);
    const [profession, setProfession] = useState('');

    useEffect(() => {
        (async () => {
            try {            
                const char = await fetchData('characters', name);
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
                <BackButton />
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