import React, { useState, useEffect } from 'react';
import AuthService from "../services/auth.service";
import CharacterPreview from "./CharacterPreview";
import './Classes.css';

function Characters() {
    const [accounts, setAccounts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

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

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredAccounts = accounts.filter((account) =>
        account &&
        account.apiKeys &&
        account.apiKeys.some((apiKey) =>
            apiKey.active &&
            apiKey.characters &&
            apiKey.characters.some((character) =>
                character.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
        )
    );

    const getMatchingCharacters = (account) => {
        const matchingCharacters = [];
        account.apiKeys.forEach((apiKey) => {
            if (apiKey.active && apiKey.characters) {
                apiKey.characters.forEach((character) => {
                    if (character.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                        matchingCharacters.push(character);
                    }
                });
            }
        });
        return matchingCharacters.sort((a, b) => a.name.localeCompare(b.name));
    };

    return (
        <>
            <div className="search-container">
                <input
                className='search-input'
                    type="text"
                    placeholder="Search character name..."
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </div>
            <div className="characters">
                <React.Fragment className="character-list">
                    {filteredAccounts.length > 0 ? (
                        filteredAccounts.map((account) => (
                            <React.Fragment key={account.id}>
                                {getMatchingCharacters(account).map((character) => (
                                    <CharacterPreview
                                        character={character}
                                        key={character.name}
                                    />
                                ))}
                            </React.Fragment>
                        ))
                    ) : (
                        <div>No matching accounts found.</div>
                    )}
                </React.Fragment>
            </div>
        </>
    );
}

export default Characters;
