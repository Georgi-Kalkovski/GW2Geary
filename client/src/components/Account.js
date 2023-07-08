import React, { useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import AuthService from "../services/auth.service";
import CharacterPreview from "./CharacterPreview";
import Dragon from '../dragon.svg';
import Cog from '../cog.svg';
import fetchData from "./fetchData";

const Account = () => {
  const { name } = useParams();
  const currentUser = AuthService.getCurrentUser();
  const formattedName = name.replaceAll('_', ' ');
  const [characters, setCharacters] = useState(null);
  const [account, setAccount] = useState(null);
  const [mastery, setMastery] = useState(null);
  const [world, setWorld] = useState(null);
  const [active, setActive] = useState(false)
  const [showMenu, setShowMenu] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    setShowMenu(windowWidth >= 550);
  }, [windowWidth]);

  useEffect(() => {
    try {
      (async () => {
        const usersRespond = await AuthService.getAllUsers();
        const updatedCharacters = [];
        for (const user of usersRespond.data.users) {
          for (const key of user.apiKeys) {
            if (key.active
              && key.accountName === formattedName
              || key && key.accountName === formattedName
              && currentUser?.apiKeys.find(k => k._id === key._id)) {
              if (!key.active
                && key.accountName === formattedName
                && currentUser.apiKeys.find(k => k._id === key._id)) {
                setActive(true)
              }
              updatedCharacters.push(key);
              const accFound = await fetchData('account', formattedName);
              setAccount(accFound);
              const mastery_points = await fetchData('mastery', formattedName);
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
      // console.error(error);
    }
  }, []);

  return (
    <div>
      <div>
        <div className="container">
          <div>
            {/* Breadcrumb */}
            <nav aria-label="breadcrumb">
              <div style={{ listStyleType: "none" }} className='flex center'>
                <li>
                  <Link className='nav-a' to="/search">Search</Link>
                </li>
                <li style={{ cursor: "default" }} aria-current="page">
                  <span>{`/ `} </span><span style={{ color: "#d70000" }}>Account</span>
                </li>
              </div>
            </nav>

            {/* Private Account */}
            {active === true
              ? <div className="flex center" style={{ color: '#f16565', fontSize: '25px' }}>Only you can see this account !</div>
              : ''
            }

            {/* Account */}
            {!characters || !account
              ? <div className="flex center">
                <div className="logo-loading-div">
                  <img src={Dragon} alt="" className="logo--loading-dragon" />
                  <img src={Cog} alt="" className="logo-loading-cog" />
                </div>
              </div>
              : characters.map((character, index) => (
                <React.Fragment key={index}>
                  <Container className="flex center center-items">
                    <Row className={`flex center acc-info accounts-box`}>
                      {/* Name */}
                      <Col className='character-col'>
                        <Row style={{ fontSize: '30px' }}>{account.name}</Row>
                      </Col>
                      <div className='flex center'>
                        {window.innerWidth < 550 && !showMenu && (
                          <button
                            className={`basic-button`}
                            style={{ marginTop: '5px', padding: '2px 0', width: '100px', border: '1px solid' }}
                            onClick={() => setShowMenu(true)}
                          >
                            Show More
                          </button>
                        )}
                        {window.innerWidth < 550 && showMenu && (
                          <button
                            className={`basic-button`}
                            style={{ marginTop: '5px', padding: '2px 0', width: '100px', border: '1px solid' }}
                            onClick={() => setShowMenu(false)}
                          >
                            Hide More
                          </button>
                        )}
                      </div>
                      {/* World */}
                      {showMenu && (
                        <Col className='character-col'>
                          <Row style={{ fontSize: '20px', paddingBottom: '6px' }}>{world}</Row>
                          <Row className='yellow-highlight'>World</Row>
                        </Col>
                      )}
                      {/* Mastery Points */}
                      {showMenu && (
                        <Col className="character-col">
                          <Row className="font-size-25px">{mastery}</Row>
                          <Row className="yellow-highlight">Mastery Points </Row>
                        </Col>
                      )}
                      {/* Fractal Level */}
                      {showMenu && (
                        <Col className="character-col">
                          <Row className="font-size-25px">{account?.fractal_level}</Row>
                          <Row className="yellow-highlight">Fractal Level</Row>
                        </Col>
                      )}
                      {/* WvW Rank */}
                      {showMenu && (
                        <Col className="character-col">
                          <Row className="font-size-25px">{account?.wvw_rank}</Row>
                          <Row className="yellow-highlight">WvW Rank</Row>
                        </Col>
                      )}
                    </Row>
                  </Container>

                  {/* Characters */}
                  <div className="characters">
                    {character && character?.characters.map(character => (
                      <CharacterPreview
                        character={character}
                        key={`${character?.accountName}_${character?.name}`}
                      />
                    ))}
                  </div>
                </React.Fragment>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;