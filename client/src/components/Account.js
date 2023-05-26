import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import AuthService from "../services/auth.service";
import { Container, Row, Col } from 'react-bootstrap';
import CharacterPreview from "./CharacterPreview";

const Account = () => {
  const { name } = useParams();
  const fromattedName = name.replaceAll('_', ' ');
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    try {
      (async () => {
        const usersRespond = await AuthService.getAllUsers();
        const updatedAccounts = [];
        for (const user of usersRespond.data.users) {
          for (const apiKey of user.apiKeys) {
            if (apiKey && apiKey.active && apiKey.accountName === fromattedName) {
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
    <div>
      <div>
        <div className="container">
          <div>
            {accounts &&
              accounts.map((account, index) => (
                <React.Fragment key={index}>
                  {/* User */}
                  <Container className='center-items'>
                    <div className="flex center" style={{ fontSize: '30px' }}>{account.accountName}</div>
                    <br />
                    <Col className='flex center' style={{ flexDirection: 'column' }}>
                      <Row style={{ fontSize: '20px', paddingBottom: '6px' }}>{account.world}</Row>
                      <Row className='yellow-highlight'>World</Row>
                    </Col>
                    <br />
                    <Row className='flex center'>
                      <Col className='flex center' style={{ flexDirection: 'column', marginRight: '20px' }}>
                        <Row style={{ fontSize: '25px' }}>{account.mastery_points}</Row>
                        <Row className='yellow-highlight'>Mastery Points</Row>
                      </Col>
                      <Col className='flex center' style={{ flexDirection: 'column', marginRight: '20px' }}>
                        <Row style={{ fontSize: '25px' }}>{account.fractal_level}</Row>
                        <Row className='yellow-highlight'>Fractal Level</Row>
                      </Col>
                      <Col className='flex center' style={{ flexDirection: 'column', marginRight: '20px' }}>
                        <Row style={{ fontSize: '25px' }}>{account.wvw_rank}</Row>
                        <Row className='yellow-highlight'>WvW Rank</Row>
                      </Col>
                    </Row>
                  </Container>

                  <br />

                  {/* Characters */}
                  <div className="characters">
                    {account && account.characters.map(character => (
                      <CharacterPreview
                        character={character}
                        key={`${account.accountName}_${character.name}`}
                      />
                    ))}
                  </div>
                </React.Fragment>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;