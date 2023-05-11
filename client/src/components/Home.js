import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import fetchData from "./fetchData";
import CharacterBox from './Home/CharacterBox';

function Home() {
    const [account, setAccount] = useState([]);
    const [world, setWorld] = useState({});
    const [charNames, setCharNames] = useState([]);
    const [mastery, setMastery] = useState(null);

    useEffect(() => {
        try {
            (async () => {
                const acc = await fetchData('account')
                setAccount(acc);
                if (account.world) {
                    const world = (await fetchData('worlds', account.world))[0]
                    setWorld(world);
                }
                const charName = await fetchData('characters', account.world)
                setCharNames(charName);
                const { totals } = await fetchData('mastery');
                setMastery(totals.reduce((acc, x) => acc + x.earned, 0));
            })();
        } catch (error) {
            console.error(error);
        }
    }, [account.world]);


    return (
        <>
            <span className="home-account">
                <h1>{account.name}</h1>
                <h5>Fractal Level: {account.fractal_level}</h5>
                <h5>Mastery Points: {mastery}</h5>
                <h5>World: {world.name}</h5>
                <h5>WvW Rank: {account.wvw_rank}</h5>
            </span>
            <div className="home-characters">
                {charNames.map((charName) => (
                    <div key={charName} className="home-character">
                        <Link to={`/characters/${charName}`} className="home-character-link" char={charName}>
                            <div><h3>{charName}</h3></div>
                            <CharacterBox charName={charName} />
                        </Link>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Home;