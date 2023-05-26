import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import AuthService from '../services/auth.service';
import './Classes.css';
import './Accounts.css';
import AccountTooltip from './AccountTooltip';
import CharacterPreview from './CharacterPreview';

function Home() {
    const [accounts, setAccounts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    function getRandomSort() {
        return Math.random() - 0.5;
    }

    useEffect(() => {
        try {
            (async () => {
                const usersRespond = await AuthService.getAllUsers();
                const updatedAccounts = [];
                for (const user of usersRespond.data.users) {
                    for (const apiKey of user.apiKeys) {
                        if (apiKey && apiKey.active) {
                            updatedAccounts.push(apiKey);
                        }
                    }
                }
                setAccounts(updatedAccounts.sort((a, b) => getRandomSort()));
            })();
        } catch (error) {
            console.error(error);
        }
    }, []);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredAccounts = accounts.filter((account) =>
        account.accountName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (account.apiKeys && account.apiKeys.some((apiKey) =>
            apiKey.active && apiKey.characters && apiKey.characters.some((character) =>
                character.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
        )) ||
        (account.characters && account.characters.some((character) =>
            character.name.toLowerCase().includes(searchTerm.toLowerCase())
        ))
    );

    const getMatchingCharacters = (account) => {
        const matchingCharacters = [];
        if (account.characters && account.characters.length > 0 && account.active) {
            account.characters.forEach((character) => {
                if (character.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                    matchingCharacters.push(character);
                }
            });
        }
        return matchingCharacters.sort((a, b) => getRandomSort());
    };

    return (
        <>
            <div className="search-container">
                <input
                    className="search-input"
                    type="text"
                    placeholder="Search account or character name..."
                    value={searchTerm}
                    onChange={handleSearch}
                    key="search-input"
                />
            </div>
            {searchTerm !== ''
                ? (
                    <React.Fragment key="home-fragment">
                        <Container className="characters" key="accounts-container">
                            {filteredAccounts.length > 0 ? (
                                filteredAccounts.map((account) => (
                                    <div key={account.accountName} className="characters-boxes">
                                        <Link className="accounts-link" to={`/accounts/${account.accountName.replace(/\s/g, '_')}`}>
                                            <Container className="accounts-box" key={account.accountName}>
                                                <Col>
                                                    <Row className="center-class">
                                                        <div className="accounts-name">{account.accountName}</div>
                                                        <AccountTooltip account={account} key={account.accountName} />
                                                    </Row>
                                                </Col>
                                            </Container>
                                        </Link>
                                    </div>
                                ))
                            ) : (
                                <div key="no-matching-accounts">No matching accounts or characters found.</div>
                            )}
                        </Container>
                        <div className="characters">
                            <React.Fragment key="characters-fragment">
                                {filteredAccounts.length > 0 ? (
                                    filteredAccounts.map((account, index) => (
                                        <React.Fragment key={index}>
                                            {getMatchingCharacters(account).map((character) => (
                                                <CharacterPreview
                                                    character={character}
                                                    key={character.name}
                                                />
                                            ))}
                                        </React.Fragment>
                                    ))
                                ) : (
                                    <div key="no-matching-characters">No matching accounts found.</div>
                                )}
                            </React.Fragment>
                        </div>
                    </React.Fragment>)
                : 'Placeholder TODO'
            }
        </>
    );
}

export default Home;
