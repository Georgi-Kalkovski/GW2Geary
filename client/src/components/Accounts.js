import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import fetchData from "./fetchData";
import './Classes.css'

function Accounts() {
    const [data, setData] = useState([]);
    const [professions, setProfessions] = useState([]);

    useEffect(() => {
        try {
            (async () => {
                setData(await fetchData('accounts'));
                setProfessions(await fetchData('professionsAll'));
            })();
        } catch (error) {
            console.error(error);
        }
    }, []);

    console.log(data)

    return (
        <>
            {data.length > 0 ? (
                data.map((item, index) => (
                    <div key={index}>
                        {item && item.account && (
                            <div>
                                <div>Name: {item.account.name}</div>
                                {/* <div>Api Key: {item.account.id}</div> */}
                            </div>
                        )}
                        <div className="home-characters">
                            {item && item.chars && item.chars.map(character => {
                                const prof = professions.find((p) => p.id === character.profession);
                                return (
                                    <div key={character.name.replace(/\s/g, "_")} className="home-character">
                                        <Link to={`/characters/${character.name.replace(/\s/g, "_")}`} className="home-character-link">
                                            <div><h3>{character.name}</h3></div>
                                            <div className={`${prof && prof.name && prof.name.toLowerCase()}-border home-box`} >
                                                <div>{character.level} {character.race}</div>
                                                <img src={prof && prof.icon_big} key={character.name} alt={character.name} />
                                                <div>{character.profession}</div>
                                            </div>
                                        </Link>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))
            ) : (
                <div>Loading data...</div>
            )}
        </>
    );
}

export default Accounts;
