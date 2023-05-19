import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import fetchData from "./fetchData";
import './Classes.css'
function Account() {
    const [account, setAccount] = useState([]);
    const [world, setWorld] = useState({});
    const [characters, setCharacters] = useState([]);
    const [mastery, setMastery] = useState(null);
    const [professions, setProfessions] = useState([]);

    useEffect(() => {
        try {
            (async () => {
                setAccount(await fetchData('account'));
                if (account.world) {
                    setWorld((await fetchData('worlds', account.world))[0]);
                }
                setCharacters(await fetchData('charactersAll'));
                setProfessions(await fetchData('professionsAll'));
                setMastery((await fetchData('mastery')).totals.reduce((acc, x) => acc + x.earned, 0));
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
                {professions.length > 0 && characters.length > 0
                    ? characters.map((character) => {
                        const prof = professions.find((p) => p.id === character.profession);
                        return (
                            <div key={character.name.replace(/\s/g, "_")} className="home-character">
                                <Link to={`/characters/${character.name.replace(/\s/g, "_")}`} className="home-character-link">
                                    <div><h3>{character.name}</h3></div>
                                    <>
                                        <div className={`${prof.name.toLowerCase()}-border home-box`} >
                                            <div>{character.level} {character.race}</div>
                                            <img src={prof.icon_big} key={character.name} alt={character.name} />
                                            <div>{character.profession}</div>
                                        </div>
                                    </>
                                </Link>
                            </div>
                        );
                    })
                    : <div className="center-items">Loading...</div>
                }
            </div>

        </>
    );
}

export default Account;