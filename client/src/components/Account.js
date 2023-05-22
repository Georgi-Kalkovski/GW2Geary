import React, { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
import AuthService from "../services/auth.service";
import { wikiBigProfessionIcons } from "./icons";
import { Container, Row, Col } from 'react-bootstrap';

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
              accounts.map((account) => (
                <>
                  {/* User */}
                  <Container className='center-items'>
                    <h1 className="flex center">{account.accountName}</h1>
                    <Row className='flex center'>
                      <Col className='flex center' style={{ flexDirection: 'column', marginRight: '20px' }}>
                        <Row style={{ fontSize: '30px' }}>{account.mastery_points}</Row>
                        <Row className='yellow-highlight'>Mastery Points </Row>
                      </Col>
                      <Col className='flex center' style={{ flexDirection: 'column', marginRight: '20px' }}>
                        <Row style={{ fontSize: '30px' }}>{account.fractal_level}</Row>
                        <Row className='yellow-highlight'>Fractal Level</Row>
                      </Col>
                      <Col className='flex center' style={{ flexDirection: 'column', marginRight: '20px' }}>
                        <Row style={{ fontSize: '30px' }}>{account.wvw_rank}</Row>
                        <Row className='yellow-highlight'>WvW Rank</Row>
                      </Col>
                      <Col className='flex center' style={{ flexDirection: 'column' }}>
                        <Row style={{ fontSize: '25px', paddingBottom: '6px' }}>{account.world}</Row>
                        <Row className='yellow-highlight'>World</Row>
                      </Col>
                    </Row>
                  </Container>

                  <br />

                  {/* Characters */}
                  <div className="home-characters">
                    {account && account.characters.map(character => {
                      const Icon = wikiBigProfessionIcons[character.profession];
                      console.log(character)
                      return (
                        <div key={character.name.replace(/\s/g, "_")} className="home-character">
                          <Link to={`/characters/${character.name.replace(/\s/g, "_")}`} className="home-character-link">
                            <div className={`${character.profession.toLowerCase()}-border ${character.profession.toLowerCase()}-lightning-border home-box`} >
                              <div className="characters-names"><h3>{character.name}</h3></div>
                              <div>{character.level} {character.race}</div>
                              <img src={Icon} key={character.name} alt={character.name} style={{ width: '75px' }} />
                              <div>{character.profession}</div>
                            </div>
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                </>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;