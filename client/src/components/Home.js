import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFetchData } from './useFetchData';
import World from './Home/World';
import CharacterBox from './Home/CharacterBox';

function Home() {
    const [account, setAccount] = useState({});
    let [mastery, setMastery] = useState({});
    const [characters, setCharacters] = useState([]);
    let masteryCount = 0;

    useFetchData('account', setAccount);
    useFetchData('account/mastery/points', setMastery);
    useFetchData('characters', setCharacters);
    
    if (mastery.totals) {
        masteryCount = mastery.totals[0].spent + mastery.totals[1].spent + mastery.totals[2].spent;
    }
    return (
        <div>
            <span className='account-name'>
                <h1>{account.name}</h1>
                <h5>Fractal Level: {account.fractal_level}</h5>
                <h5>Mastery Points: {masteryCount}</h5>
                <h5 className='item-or-loader'><span>World: </span>{<World worldName={account.world} />}</h5>
                <h5>WvW Rank: {account.wvw_rank}</h5>
            </span>
            <div className='home-flex'>
                {characters.map((character) => (
                    <div key={character} className='home-boxes'>
                        <Link className='home-link' to={`/characters/${character}`}>
                            <CharacterBox character={character} />
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;
