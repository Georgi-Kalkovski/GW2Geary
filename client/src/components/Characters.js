import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import AuthService from "../services/auth.service";
import './Classes.css';
import { wikiBigProfessionIcons } from "./icons";

function Characters() {
    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        try {
            (async () => {
                const usersRespond = await AuthService.getAllUsers();
                setAccounts(usersRespond.data.users);
            })();
        } catch (error) {
            console.error(error);
        }
    }, []);

    return (
        <div className="home-characters">
            {accounts
                ? accounts.map((user, index) => (
                    <>
                        {user.apiKeys && user.apiKeys.map(apiKey => {
                            if (apiKey.active) {
                                return (
                                    <>
                                        {apiKey.characters && apiKey.characters.map(character => {

                                            const Icon = wikiBigProfessionIcons[character.profession];

                                            return (
                                                <div key={`${character.name}${index}-box`} className="home-character">
                                                    <Link to={`/characters/${character.name.replace(/\s/g, "_")}`} className="home-character-link">
                                                        <div className={`${character.profession.toLowerCase()}-border ${character.profession.toLowerCase()}-lightning-border home-box`}>
                                                            <div className="characters-names"><h3>{character.name}</h3></div>
                                                            <div>{character.level} {character.race}</div>
                                                            <img src={Icon} key={`${character.name}${index}-img`} alt={character.name} style={{ width: '75px' }} />
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
                : <div>Loading data...</div>
            }
        </div>
    );
}

export default Characters;
