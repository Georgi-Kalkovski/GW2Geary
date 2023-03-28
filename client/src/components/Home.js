import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
    const [characters, setCharacters] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get('http://localhost:3001/api/characters');
            setCharacters(response.data);
        }

        fetchData();
    }, []);

    return (
        <div>
            <h1>Character List</h1>
            <ul>
                {characters.map((character) => (
                    <div key={character}>
                        <Link className='home-link' to={`/characters/${character}`}>{character}</Link>
                    </div>
                ))}
            </ul>
        </div>
    );
}

export default Home;
