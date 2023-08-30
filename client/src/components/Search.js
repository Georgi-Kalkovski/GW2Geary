import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import AuthService from '../services/auth.service';
import CharacterPreview from './CharacterPreview';
import Pagination from './Search/Pagination';
import './Classes.css';
import './Search.css';

function Search() {
  const [accounts, setAccounts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [accountsPage, setAccountsPage] = useState(1);
  const [charactersPage, setCharactersPage] = useState(1);
  const [filteredAccounts, setFilteredAccounts] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);

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
    setAccountsPage(1);
    setCharactersPage(1);
  };

  useEffect(() => {
    const filteredAccounts = accounts.filter(
      (account) =>
        account.accountName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (account.apiKeys &&
          account.apiKeys.some(
            (apiKey) =>
              apiKey.active &&
              apiKey.characters &&
              apiKey.characters.some((character) =>
                character.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
          )) ||
        (account.characters &&
          account.characters.some((character) =>
            character.name.toLowerCase().includes(searchTerm.toLowerCase())
          ))
    );

    // Custom sorting function for accounts
    const customSortAccounts = (a, b) => {
      const aName = a.accountName.toLowerCase();
      const bName = b.accountName.toLowerCase();
      if (aName.startsWith(searchTerm.toLowerCase()) && !bName.startsWith(searchTerm.toLowerCase())) {
        return -1;
      } else if (!aName.startsWith(searchTerm.toLowerCase()) && bName.startsWith(searchTerm.toLowerCase())) {
        return 1;
      } else {
        return aName.localeCompare(bName);
      }
    };

    setFilteredAccounts(filteredAccounts.sort(customSortAccounts));

    // Custom sorting function for characters
    const customSortCharacters = (a, b) => {
      const aName = a.name.toLowerCase();
      const bName = b.name.toLowerCase();
      if (aName.startsWith(searchTerm.toLowerCase()) && !bName.startsWith(searchTerm.toLowerCase())) {
        return -1;
      } else if (!aName.startsWith(searchTerm.toLowerCase()) && bName.startsWith(searchTerm.toLowerCase())) {
        return 1;
      } else {
        return aName.localeCompare(bName);
      }
    };

    const filteredCharacters = filteredAccounts.reduce((acc, account) => {
      if (account.characters && account.characters.length > 0 && account.active) {
        const charactersWithMatchingNames = account.characters.filter((character) =>
          character.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        acc.push(...charactersWithMatchingNames);
      }
      return acc;
    }, []);

    setFilteredCharacters(filteredCharacters.sort(customSortCharacters));
  }, [accounts, searchTerm]);

  const itemsPerPage = 15;

  const startIndexAccounts = (accountsPage - 1) * itemsPerPage;
  const endIndexAccounts = startIndexAccounts + itemsPerPage;
  const displayedAccounts = filteredAccounts.slice(startIndexAccounts, endIndexAccounts);

  const startIndexCharacters = (charactersPage - 1) * itemsPerPage;
  const endIndexCharacters = startIndexCharacters + itemsPerPage;
  const displayedCharacters = filteredCharacters.slice(startIndexCharacters, endIndexCharacters);

  const totalPagesAccounts = Math.ceil(filteredAccounts.length / itemsPerPage);
  const totalPagesCharacters = Math.ceil(filteredCharacters.length / itemsPerPage);

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
      {searchTerm !== '' ? (
        <React.Fragment key={`home-fragment-${searchTerm}`}>
          <Container className="characters" key={`accounts-container-${searchTerm}`}>
            {displayedAccounts.length > 0 ? (
              displayedAccounts.map((account, index) => (
                <div key={`${account.accountName}-div-${index}`} className="characters-boxes">
                  <Link className="accounts-link" to={`/a/${account.accountName.replace(/\s/g, '_')}`}>
                    <Container className="accounts-box" key={`${account.accountName}-container-${index}`}>
                      <Col>
                        <Row className="center-class accounts-hover">
                          <div className="accounts-name">{account.accountName}</div>
                        </Row>
                      </Col>
                    </Container>
                  </Link>
                </div>
              ))
            ) : (
              <div key="no-matching-accounts">No matching accounts & characters found.</div>
            )}
          </Container>
          <Pagination filtered={filteredAccounts} itemsPerPage={itemsPerPage} totalPages={totalPagesAccounts} page={accountsPage} setPage={setAccountsPage} />
          <div className="characters" key={`character-div-${searchTerm}`}>
            <React.Fragment key={`character-fragment-${searchTerm}`}>
              {displayedCharacters.map((character, index) => (
                <React.Fragment key={`character-fragment-${character.name}-${index}`}>
                  {character.active != false &&
                    <CharacterPreview character={character} key={`character-name-${character.name}-${index}`} />
                  }
                </React.Fragment>
              ))}
            </React.Fragment>
          </div>
          <Pagination filtered={filteredCharacters} itemsPerPage={itemsPerPage} totalPages={totalPagesCharacters} page={charactersPage} setPage={setCharactersPage} />
        </React.Fragment>
      ) : (
        <>
          {/* Empty Search Text */}
          <Container className="flex center">
            <Col className="home-empty-search-box">
              <Row className='home-welcome'>
                Welcome to <span className="gw2-logo-style">GW2</span>
                <span className="geary-logo-style">Geary</span>!
              </Row>
              <Row>A place where you can inspect or share equipment and builds of registered accounts and their characters.
                If someone adds a valid{' '}
                <Link to="https://account.arena.net/applications" style={{ color: '#d70000' }} target="_blank">
                  GW2 API key
                </Link>
                <span style={{ fontSize: '15px' }}>(<span className='yellow-highlight'></span>
                  <span style={{ borderBottom: '1px dotted' }}>account</span>
                  , <span style={{ borderBottom: '1px dotted' }}>characters</span>
                  , <span style={{ borderBottom: '1px dotted' }}>builds</span>
                  , <span style={{ borderBottom: '1px dotted' }}>progression</span>) </span>
                with us and grants access, you'll be able to find and inspect them.
              </Row>
            </Col>
          </Container>

          <Container className="flex center">
            <Col className="home-empty-search-box">
              <Row className='home-welcome' style={{ fontSize: '25px' }}>
                Latest News
              </Row>
              <Row className='search-news'>

                <div>
                  <span className='yellow-highlight' style={{ marginBlockEnd: '0em', marginBlockStart: '0em', }}>30.08.2023</span> -
                  Added a button/s allowing the users to
                  <span className="yellow-highlight"> copy</span> the
                  <span className="yellow-highlight"> chat codes</span> of the
                  <span className="yellow-highlight"> items</span> or their
                  <span className="yellow-highlight"> skins</span>.
                </div>

                <div>
                  <span className='yellow-highlight' style={{ marginBlockEnd: '0em', marginBlockStart: '0em', }}>28.08.2023</span> -
                  Now the <span className="yellow-highlight"> fashion mode </span> can preview <span className="yellow-highlight"> wiki images</span>.
                </div>

                <div>
                  <span className='yellow-highlight' style={{ marginBlockEnd: '0em', marginBlockStart: '0em', }}>18.08.2023</span> -
                  Now the user can choose between fashion mode or normal mode preview on the characters.
                  Happy Fashion Wars everybody! <span style={{ color: '#9fc3f0' }}>o/</span>
                </div>

                <div>
                  <span className='yellow-highlight' style={{ marginBlockEnd: '0em', marginBlockStart: '0em', }}>04.08.2023</span> -
                  Added information about the <span style={{ color: '#ff1e1e' }}>missing prefixes</span>,
                  <span style={{ color: '#ff1e1e' }}> runes</span>,
                  <span style={{ color: '#ff1e1e' }}> sigils</span> and
                  <span style={{ color: '#ff1e1e' }}> infusions </span>
                  to the <span className="yellow-highlight"> Stats </span> menu.
                </div>

                <div>
                  <span className='yellow-highlight' style={{ marginBlockEnd: '0em', marginBlockStart: '0em', }}>31.07.2023</span> -
                  Now the user can preview the dyes of an item.
                </div>

              </Row>
            </Col>
          </Container>

          <Container className="flex center">
            <Col className="home-empty-search-box" style={{ width: 'auto', padding: '10px 10px' }}>
              <Row>Аccounts: <span className='yellow-highlight'>{accounts.length}</span> | Characters: <span className='yellow-highlight'>{accounts.map(x => x.characters.length).reduce((partialSum, a) => partialSum + a, 0)}</span></Row>
            </Col>
          </Container>
          <br />
        </>
      )}
    </>
  );
}

export default Search;
