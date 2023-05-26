import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import AuthService from "../services/auth.service";
import { Container, Row, Col } from 'react-bootstrap';
import './Classes.css';
import './Accounts.css';

import AccountTooltip from './AccountTooltip';

function Accounts() {
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
        account.accountName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (<>
        <div className="search-container">
            <input
                className='search-input'
                type="text"
                placeholder="Search account name..."
                value={searchTerm}
                onChange={handleSearch}
                key="search-input"
            />
        </div>
        <Container className="characters" key="characters-container">
            {filteredAccounts.length > 0 ? (
                filteredAccounts.map(account => (
                    <div key={account.accountName} className="characters-boxes">
                        <Link className="accounts-link" to={`/accounts/${account.accountName.replace(/\s/g, "_")}`}>
                            <Container className="accounts-box" key={account.accountName}>
                                <Col>
                                    <Row className="center-class">
                                        <div className="accounts-name">{account.accountName}</div>
                                        <AccountTooltip account={account} key={account.accountName}/>
                                    </Row>
                                </Col>
                            </Container>
                        </Link>
                    </div>
                ))
            ) : (
                <div key="no-matching-accounts">No matching accounts found.</div>
            )}
        </Container>
    </>
    );
}

export default Accounts;
