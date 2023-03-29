import React, { useState } from 'react';
import { useFetchData } from './useFetchData';

function Character() {
    const [characterData, setCharacterData] = useState([]);
    const characterName = window.location.pathname.split("/").pop();

    useFetchData(`http://localhost:3001/api/characters/${characterName}`, setCharacterData);


    if (!characterData) {
        return <div>Loading...</div>;
    }

    // TODO: Play with the reading of the build tabs
    // console.log(characterData.build_tabs)
    console.log(characterData.world)
    return (
        <div>
            <h1>{characterData.name}</h1>
            <p>Level: {characterData.level}</p>
            <p>Race: {characterData.race}</p>
            <p>Profession: {characterData.profession}</p>
            <p>Guild: {characterData.guild}</p>
        </div>
    );
}

export default Character;
