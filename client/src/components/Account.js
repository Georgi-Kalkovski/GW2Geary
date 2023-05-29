import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import AuthService from "../services/auth.service";
import CharacterPreview from "./CharacterPreview";

const Account = () => {
  const { name } = useParams();
  const fromattedName = name.replaceAll('_', ' ');
  const [characters, setCharacters] = useState(null);
  const [account, setAccount] = useState(null);
  const [mastery, setMastery] = useState(null);
  const [world, setWorld] = useState(null);

  useEffect(() => {
    try {
      (async () => {
        const usersRespond = await AuthService.getAllUsers();
        const updatedCharacters = [];
        for (const user of usersRespond.data.users) {
          for (const key of user.apiKeys) {
            if (key && key.active && key.accountName === fromattedName) {
              updatedCharacters.push(key);
              const accFound = (await axios.get(`https://api.guildwars2.com/v2/account?access_token=${key._id}&v=latest`)).data;
              setAccount(accFound);
              const mastery_points = (await axios.get(`https://api.guildwars2.com/v2/account/mastery/points?access_token=${key._id}`)).data;
              let world;
              if (accFound && accFound.world) {
                world = (await axios.get(`https://api.guildwars2.com/v2/worlds/${accFound.world}`)).data;
              }
              setMastery(mastery_points.totals.reduce((acc, x) => acc + x.spent, 0));
              setWorld(world.name);
            }
          }
          setCharacters(updatedCharacters);
        }
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
            {characters &&
              characters.map((character, index) => (
                <React.Fragment key={index}>
                  
                  {/* User */}
                  <Container className='center-items'>
                    <div className="flex center" style={{ fontSize: '30px' }}>{character.accountName}</div>
                    <br />
                    <Col className='flex center' style={{ flexDirection: 'column' }}>
                      <Row style={{ fontSize: '20px', paddingBottom: '6px' }}>{world}</Row>
                      <Row className='yellow-highlight'>World</Row>
                    </Col>
                    <br />
                    <Row className='flex center'>
                      <Col className='character-col'>
                        <Row className="font-size-25px">{mastery}</Row>
                        <Row className='yellow-highlight'>Mastery Points</Row>
                      </Col>
                      <Col className='character-col'>
                        <Row className="font-size-25px">{account?.fractal_level}</Row>
                        <Row className='yellow-highlight'>Fractal Level</Row>
                      </Col>
                      <Col className='character-col'>
                        <Row className="font-size-25px">{account?.wvw_rank}</Row>
                        <Row className='yellow-highlight'>WvW Rank</Row>
                      </Col>
                    </Row>
                  </Container>

                  <br />

                  {/* Characters */}
                  <div className="characters">
                    {character && character.characters.map(character => (
                      <CharacterPreview
                        character={character}
                        key={`${character.accountName}_${character.name}`}
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