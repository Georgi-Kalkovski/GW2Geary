import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import AuthService from "../services/auth.service";
import './Classes.css';

import Elementalist from './img/Elementalist.png';
import Engineer from './img/Engineer.png';
import Guardian from './img/Guardian.png';
import Mesmer from './img/Mesmer.png';
import Necromancer from './img/Necromancer.png';
import Ranger from './img/Ranger.png';
import Revenant from './img/Revenant.png';
import Thief from './img/Thief.png';
import Warrior from './img/Warrior.png';

function Accounts() {
    const [data, setData] = useState([]);

    useEffect(() => {
        try {
            (async () => {
                const response = await AuthService.getAllUsers();
                setData(response.data.users);
            })();
        } catch (error) {
            console.error(error);
        }
    }, []);

    const professionIcons = {
        Elementalist: Elementalist,
        Engineer: Engineer,
        Guardian: Guardian,
        Mesmer: Mesmer,
        Necromancer: Necromancer,
        Ranger: Ranger,
        Revenant: Revenant,
        Thief: Thief,
        Warrior: Warrior
    };

    console.log(data)

    return (
        <div className="home-characters">
            {data.length > 0 ? (
                data.map((user, index) => (
                    <>
                        {user.apiKeys && user.apiKeys.map(apiKey => {
                            if (apiKey.active) {
                                return (
                                    <>
                                        {apiKey.characters && apiKey.characters.map(character => {
                                            const Icon = professionIcons[character.profession];

                                            return (
                                                <div key={character.name.replace(/\s/g, "_")} className="home-character">
                                                    <Link to={`/characters/${character.name.replace(/\s/g, "_")}`} className="home-character-link">
                                                        <div className={`${character.profession.toLowerCase()}-border ${character.profession.toLowerCase()}-lightning-border home-box`} >
                                                            <div className="acccounts-names"><h3>{character.name}</h3></div>
                                                            <div>{character.level} {character.race}</div>
                                                            <img src={Icon} key={character.name} alt={character.name} />
                                                            <div>{character.profession}</div>
                                                        </div>
                                                    </Link>
                                                </div>
                                            );
                                        })}
                                    </>
                                );
                            } else {
                                return null; // Skip inactive apiKeys
                            }
                        })}
                    </>
                ))
            ) : (
                <div>Loading data...</div>
            )}
        </div>
    );
}

export default Accounts;
