import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import fetchData from "./fetchData";
import CharacterBox from './Home/CharacterBox';
import { loading } from "./functions";

function Home() {
    const [account, setAccount] = useState([]);
    const [mastery, setMastery] = useState(null);
    const [world, setWorld] = useState({});
    const [charNames, setCharNames] = useState([]);

    useEffect(() => {
        const fetchAccount = async () => {
            const response = await fetchData('account');
            setAccount(response);
        };
        fetchAccount();
    }, []);

    useEffect(() => {
        const fetchWorld = async () => {
            if (account.world) {
                const response = await fetchData('worlds', account.world);
                setWorld(response[0]);
            }
        };
        fetchWorld();
    }, [account.world]);

    useEffect(() => {
        const fetchMastery = async () => {
            const response = await fetchData('mastery');
            const totals = response.totals;
            const earnedSum = totals.reduce((acc, x) => acc + x.earned, 0)
            setMastery(earnedSum)
        };
        fetchMastery();
    }, []);

    useEffect(() => {
        const fetchCharNames = async () => {
            const response = await fetchData('characters', account.world);
            setCharNames(response);
        };
        fetchCharNames();
    }, []);

    return (
        <>
            <span className="home-account">
                <h1>{account.name}</h1>
                <h5>Fractal Level: {account.fractal_level}</h5>
                <h5>Mastery Points: {mastery}</h5>
                <h5>World: {world.name ? world.name : loading}</h5>
                <h5>WvW Rank: {account.wvw_rank}</h5>
            </span>
            <div className="home-characters">
                {charNames.map((charName) => (
                    <div key={charName} className="home-character">
                        <div><h3>{charName}</h3></div>
                        <Link to={`/characters/${charName}`} className="home-character-link" char={charName}>
                            <CharacterBox charName={charName} />
                        </Link>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Home;