import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import fetchData from './fetchData';
import Specialization from "./Character/Specialization";
import BuildDropdown from './Character/BuildDropdown';
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
            const prof = await fetchData('professions', character.profession);
            setProfession(prof);
        };
        fetchProfession();
    }, []);

    if (!character) {
        return loading;
    }

    return (
        <>
            <div className='center-items'>
                <h1>{character.name}</h1>
                <p>{character.level} {character.race}</p>
                <p className="center-class"><img src={profession.icon} />{character.profession} - <Specialization char={character} /></p>
                <BuildDropdown />
            </div>
        </>
    );
}

export default Character;