import { useState, useEffect } from "react";
import fetchData from "../fetchData";
import { loading } from "../functions";
import '../Classes.css';

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
    }, [charName]);

    return (
        <>
            {profession ?
                <>
                    <div className={`${character.profession.toLowerCase()}-border home-box`} >
                        <div>{character.level} {character.race}</div>
                        <img src={profession.icon_big} key={character.name} alt={character.name} />
                        <div>{character.profession}</div>
                    </div>
                </>
                : loading
            }
        </>
    );

}

export default CharacterBox;