import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import AuthService from "../services/auth.service";
import { Container, Row, Col } from 'react-bootstrap';
import './Classes.css';
import './Accounts.css';

function Accounts() {
    const [accounts, setAccounts] = useState([]);

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
                setAccounts(updatedAccounts);
            })();
        } catch (error) {
            console.error(error);
        }
    }, []);

    return (
        <Container className="home-characters">
            {accounts.map(account => (
                <div key={account.accountName} className="characters-boxes">
                    <Link className="accounts-link" to={`/accounts/${account.accountName.replace(/\s/g, "_")}`}>
                        <Container className="accounts-box">
                            <Col>
                                <Row><h3 className="accounts-name">{account.accountName}</h3></Row>
                                <Row className="accounts-flex">
                                    <Col className="flex column center accounts-col">
                                        <Col>{account.mastery_points}</Col>
                                        <Col><h6 className="yellow-highlight accounts-h6">Mastery Points</h6></Col>
                                    </Col>
                                    <Col className="flex column center accounts-col">
                                        <Col>{account.fractal_level}</Col>
                                        <Col><h6 className="yellow-highlight accounts-h6">Fractal Level</h6></Col>
                                    </Col>
                                </Row>
                                <Row className="accounts-flex">
                                    <Col className="flex column center accounts-col">
                                        <Col>{account.wvw_rank}</Col>
                                        <Col><h6 className="yellow-highlight accounts-h6">WvW Rank</h6></Col>
                                    </Col>
                                    <Col className="flex column center accounts-col">
                                        <Col>{account.world}</Col>
                                        <Col><h6 className="yellow-highlight accounts-h6">World</h6></Col>
                                    </Col>
                                </Row>

                            </Col>


                        </Container>
                    </Link>
                </div>
            ))}
        </Container>
    );
}

export default Accounts;
