import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import fetchData from './fetchData';
import Equipment from './Character/Equipment/Equipment';
import Build from './Character/Build/Build';
import BackButton from './BackButton';
import { loading } from './functions';
import './Character.css';

function Character() {
    const { name } = useParams();
    const [character, setCharacter] = useState(null);
    const [profession, setProfession] = useState('');

    useEffect(() => {
        const fetchCharacter = async () => {
            const char = await fetchData('characters', name);
            setCharacter(char);
        };
        fetchCharacter();
    }, [name]);


    useEffect(() => {
        const fetchProfession = async () => {
            const response = await fetchData('characters', name);
            const prof = await fetchData('professions', response.profession);
            setProfession(prof);
        };
        fetchProfession();
    }, [name]);

    if (!character) {
        return loading;
    }

    return (
        <>
            <BackButton />
            <div className='center-items'>
                <h1>{character.name}</h1>
                <div>{character.level} {character.race}</div>
                <div className="center-class">
                    <img src={profession.icon} alt={character.profession} />{character.profession}
                </div>
                <div className='equipment-build-flex'>
                    <Equipment char={character} />
                    <Build char={character} />
                </div>
            </div>
        </>
    );
}

export default Character;