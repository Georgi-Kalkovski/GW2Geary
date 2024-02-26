import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useParams, Link, useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import AuthService from "../services/auth.service";
import CharacterPreview from "./CharacterPreview";
import Dragon from '../dragon.svg';
import Cog from '../cog.svg';
import fetchData from "./fetchData";
import { getFromLocalStorage, saveToLocalStorage } from "./localStorage";
import Share from "./Share";
import ArrowSvg from './arrow.svg'

const Account = () => {
  const { name } = useParams();
  const currentUser = AuthService.getCurrentUser();
  const formattedName = name.replaceAll('_', ' ');
  const [characters, setCharacters] = useState(null);
  const [accFound, setAccFound] = useState(null);
  const [mastery, setMastery] = useState(null);
  const [world, setWorld] = useState(null);
  const [active, setActive] = useState(false)
  const [showMenu, setShowMenu] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isOpen, setIsOpen] = useState(false);
  let navigate = useNavigate();

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (world !== null) {
      localStorage.setItem('w', world);
    }

    if (accFound) {
      localStorage.removeItem('acc');
      localStorage.removeItem('lvl');
      localStorage.removeItem('prof');
      localStorage.removeItem('race');
      localStorage.removeItem('gen');
      localStorage.removeItem('frac', accFound.fractal_level);
      localStorage.setItem('wvw', accFound.wvw_rank);
    }
    localStorage.removeItem('spec');

    if (mastery !== null) {
      localStorage.setItem('mp', mastery);
    }
  }, [mastery, world, accFound]);

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
    setShowMenu(windowWidth >= 900);
  }, [windowWidth]);

  useEffect(() => {
    try {
      (async () => {
        const accFoundData = getFromLocalStorage('accFound');
        const accName = accFoundData?.name;

        // if (accName && accName === formattedName) {
        //   setAccFound(getFromLocalStorage('accFound'))
        //   setMastery(getFromLocalStorage('mastery'))
        //   setWorld(getFromLocalStorage('world'))
        //   setCharacters(getFromLocalStorage('characters'))

        //   const activeStored = getFromLocalStorage('account');
        //   if (activeStored && !activeStored.active) {
        //     if (!currentUser || !currentUser.apiKeys.find(acc => acc.accountName === activeStored.accountName)) {
        //       navigate("/");
        //     }
        //     setActive(true)
        //   }
        // } else {
          const user = await AuthService.getAccount(formattedName);

          const updatedCharacters = [];

          const account = user.data?.user?.apiKeys?.find(acc => acc.accountName === formattedName);
          if (!account.active) {
            if (!currentUser || !currentUser.apiKeys.find(acc => acc.accountName === account.accountName)) {
              navigate("/");
            }
            setActive(true)
          }

          if (account) {
            updatedCharacters.push(account);
            const accFound = await fetchData('account', formattedName);
            setAccFound(accFound);

            const mastery_points = await fetchData('mastery', formattedName);

            let world;
            if (accFound && accFound.world) {
              world = (await axios.get(`https://api.guildwars2.com/v2/worlds/${accFound.world}`)).data;
            }
            let mastery = mastery_points?.totals.reduce((acc, x) => acc + x.spent, 0)
            setMastery(mastery);
            setWorld(world.name);

            // Save data to localStorage
            saveToLocalStorage('accFound', accFound);
            saveToLocalStorage('account', account);
            saveToLocalStorage('mastery', mastery);
            saveToLocalStorage('world', world.name);
          }

          setCharacters(updatedCharacters);
          saveToLocalStorage('characters', updatedCharacters);
        // }
      })();
    } catch (error) {
      console.error(error);
    }
  }, []);

  const [maxHeight, setMaxHeight] = useState(0);

  useEffect(() => {
    if (window.innerWidth <= 900) {
      setMaxHeight(Math.max(document.documentElement.clientHeight, window.innerHeight || 0) * 0.68);
    }
  }, []);


  return (
    <div>
      <Helmet>
        <title>GW2Geary - {accFound ? accFound?.name : 'Account'}</title>
      </Helmet>
      <div>
        <div className="container">
          <div>
            {/* Breadcrumb */}
            <nav aria-label="breadcrumb" className="breadcrumb" style={{ marginTop: '15px' }}>
              <div style={{ listStyleType: "none" }} className='flex center'>
                <li>
                  <Link className='nav-a' to="/">Search</Link>
                </li>
                <li style={{ cursor: "default" }} aria-current="page">
                  <span>{`/`} </span><span style={{ color: "rgb(241, 101, 101)" }}>Account</span>
                </li>
                <li className="flex">
                  <span style={{ margin: '0px 5px' }}>{`-`}</span>
                  <span>
                    <Share
                      isOpen={isOpen}
                      setIsOpen={setIsOpen}
                    />
                  </span>
                </li>
              </div>
            </nav>
            {/* Private Account */}
            {active === true
              ? <div className="flex center" style={{ color: '#f16565', fontSize: '25px' }}>Only you can see this account!</div>
              : ''
            }
            {/* Account */}
            {!characters || !accFound
              ? <div className="flex center">
                <div className="logo-loading-div">
                  <img src={Dragon} alt="" className="logo--loading-dragon" />
                  <img src={Cog} alt="" className="logo-loading-cog" />
                </div>
              </div>
              : <React.Fragment >
                <Container className="flex center center-items" onClick={() => window.innerWidth < 900 ? toggleMenu() : ''}>
                  <Row className={`flex center acc-info acc-info-new accounts-box`}>
                    {/* Name */}
                    {window.innerWidth >= 900 && (
                      <Col className='character-col'>
                        <Row style={{ fontSize: '30px' }}>{accFound.name}</Row>
                      </Col>
                    )}
                    {window.innerWidth < 900 && (
                      <div className='flex center'>
                        <Col className={showMenu ? 'character-col' : 'character-col-close'}>
                          <Row className="acc-name-font-mobile" style={{ fontSize: '30px' }}>
                            {accFound.name}
                            <div className="arrow-logic" style={!showMenu ? {} : { marginRight: '15px' }}>
                              <span className="arrow-text">{!showMenu ? 'more' : 'less'}</span>
                              <img className='arrow-svg' src={ArrowSvg} style={!showMenu ? {} : { transform: 'scaleY(-1)' }} alt="" />
                            </div>
                          </Row>
                        </Col>
                      </div>
                    )}
                    {window.innerWidth < 900
                      ? (
                        <div className="flex acc-info-font-mobile">
                          <div style={{ paddingRight: '10px' }}>
                            {/* World */}
                            <Col className={`${showMenu ? 'character-col show-content' : 'hide-content'}`}>
                              <Row>{world}</Row>
                              <Row className='yellow-highlight'>World</Row>
                            </Col>
                            {/* Mastery Points */}
                            <Col className={`${showMenu ? 'character-col show-content' : 'hide-content'}`}>
                              <Row>{mastery !== null ? mastery : '0'}</Row>
                              <Row className="yellow-highlight">Mastery Points </Row>
                            </Col>
                          </div>
                          <div style={{ paddingLeft: '10px' }}>
                            {/* Fractal Level */}
                            <Col className={`${showMenu ? 'character-col show-content' : 'hide-content'}`}>
                              <Row>
                                {accFound?.fractal_level ? accFound?.fractal_level : '0'}
                              </Row>
                              <Row className="yellow-highlight">Fractal Level</Row>
                            </Col>
                            {/* WvW Rank */}
                            <Col className={`${showMenu ? 'character-col show-content' : 'hide-content'}`}>
                              <Row>{accFound?.wvw_rank ? accFound?.wvw_rank : '0'}</Row>
                              <Row className="yellow-highlight">WvW Rank</Row>
                            </Col>
                          </div>
                        </div>
                      ) : (
                        <>
                          {/* World */}
                          <Col className={`${showMenu ? 'character-col show-content' : 'hide-content'}`}>
                            <Row style={{ fontSize: '20px', paddingBottom: '6px' }}>{world}</Row>
                            <Row className='yellow-highlight'>World</Row>
                          </Col>
                          {/* Mastery Points */}
                          <Col className={`${showMenu ? 'character-col show-content' : 'hide-content'}`}>
                            <Row className="font-size-22px">{mastery !== null ? mastery : '0'}</Row>
                            <Row className="yellow-highlight">Mastery Points </Row>
                          </Col>
                          {/* Fractal Level */}
                          <Col className={`${showMenu ? 'character-col show-content' : 'hide-content'}`}>
                            <Row className="font-size-22px">
                              {accFound?.fractal_level ? accFound?.fractal_level : '0'}
                            </Row>
                            <Row className="yellow-highlight">Fractal Level</Row>
                          </Col>
                          {/* WvW Rank */}
                          <Col className={`${showMenu ? 'character-col show-content' : 'hide-content'}`}>
                            <Row className="font-size-22px">{accFound?.wvw_rank ? accFound?.wvw_rank : '0'}</Row>
                            <Row className="yellow-highlight">WvW Rank</Row>
                          </Col>
                        </>
                      )
                    }
                  </Row>
                </Container>
                {/* Characters */}
                <div className={window.innerWidth < 900 ? 'custom-scrollbar' : ''} style={window.innerWidth < 900 ? { textAlign: 'left', justifyContent: 'right', marginBottom: '20px', maxHeight: `${maxHeight}px`, overflow: 'auto' } : {}}>
                  {characters &&
                    characters.map((character, index) => (
                      <React.Fragment key={index}>
                        <div className="characters">
                          {character &&
                            character.characters
                              .filter((char) => char.active !== false)
                              .sort((a, b) => a.name.localeCompare(b.name))
                              .map((char, charIndex) => (
                                <React.Fragment key={charIndex}>
                                  <CharacterPreview
                                    character={char}
                                    key={`${char.accountName}_${char.name}`}
                                  />
                                </React.Fragment>
                              ))}
                        </div>
                      </React.Fragment>
                    ))}
                </div>
              </React.Fragment>
            }
          </div>
        </div>
        <br />
      </div>
    </div >
  );
};

export default Account;