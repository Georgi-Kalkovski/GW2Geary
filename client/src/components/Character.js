import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Character() {
    const [characterData, setCharacterData] = useState([]);
    const characterName = window.location.pathname.split("/").pop();

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get(`http://localhost:3001/api/characters/${characterName}`);
            setCharacterData(response.data);
        }

        fetchData();
    }, [characterName]);

    if (!characterData) {
        return <div>Loading...</div>;
    }
    
    // TODO: Play with the reading of the build tabs
    console.log(characterData.build_tabs)

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
