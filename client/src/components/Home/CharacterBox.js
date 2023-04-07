import { useState, useEffect } from "react";
import fetchData from "../fetchData";
import { loading } from "../functions";

function CharacterBox({ charName }) {
    const [character, setCharacter] = useState({});
    const [profession, setProfession] = useState('');

    useEffect(() => {
        const fetchProfession = async () => {
            const response = await fetchData('characters', charName);
            const prof = await fetchData('professions', response.profession);
            setCharacter(response);
            setProfession(prof);
        };
        fetchProfession();
    }, []);

    return (
        <>
            {profession ?
                <>
                    <div><h3>{character.name}</h3></div>
                    <div className='home-box'>
                        <p>{character.level} {character.race}</p>
                        <img src={profession.icon_big} key={character.name}/>
                        <p>{character.profession}</p>
                    </div>
                </>
                : loading
            }
        </>
    );

}

export default CharacterBox;