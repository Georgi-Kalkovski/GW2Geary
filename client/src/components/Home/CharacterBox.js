import { useState, useEffect } from "react";
import fetchData from "../fetchData";
import '../Classes.css';

function CharacterBox({ charName }) {
    const [character, setCharacter] = useState({});
    const [profession, setProfession] = useState('');

    useEffect(() => {
        (async () => {
            try {
                const char = await fetchData('characters', charName);
                setCharacter(char);
                const prof = await fetchData('professions', char.profession)
                setProfession(prof);
            } catch (error) {
                console.error(error);
            }
        })();
    }, [charName, character]);

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
                : <div className='center-items'>Loading...</div>
            }
        </>
    );

}

export default CharacterBox;