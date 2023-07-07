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
    setFilteredAccounts(filteredAccounts);
  }, [accounts, searchTerm]);

  useEffect(() => {
    const filteredCharacters = [];
    filteredAccounts.forEach((account) => {
      if (account.characters && account.characters.length > 0 && account.active) {
        account.characters.forEach((character) => {
          if (character.name.toLowerCase().includes(searchTerm.toLowerCase())) {
            filteredCharacters.push(character);
          }
        });
      }
    });
    setFilteredCharacters(filteredCharacters);
  }, [filteredAccounts, searchTerm]);

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
        <React.Fragment key="home-fragment">
          <Container className="characters" key="accounts-container">
            {displayedAccounts.length > 0 ? (
              displayedAccounts.map((account) => (
                <div key={account.accountName} className="characters-boxes">
                  <Link className="accounts-link" to={`/accounts/${account.accountName.replace(/\s/g, '_')}`}>
                    <Container className="accounts-box" key={account.accountName}>
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
          <div className="characters">
            <React.Fragment key="characters-fragment">
              {displayedCharacters.map((character) => (
                <CharacterPreview character={character} key={character.name} />
              ))}
            </React.Fragment>
          </div>
          <Pagination filtered={filteredCharacters} itemsPerPage={itemsPerPage} totalPages={totalPagesCharacters} page={charactersPage} setPage={setCharactersPage} />
        </React.Fragment>
      ) : (
        <>
          <Container className="flex center">
            <Col className="home-empty-search-box">
              <Row style={{ fontSize: '1.5em' }}>
                Welcome to <span className="gw2-logo-style">GW2</span>
                <span className="geary-logo-style">Geary</span>!
              </Row>
              <Row>A place where you can inspect equipment and builds of registered accounts and their characters.</Row>
              <Row>
                If someone has registered a valid{' '}
                <Link to="https://account.arena.net/applications" style={{ color: '#d70000' }} target="_blank">
                  GW2 API key
                </Link>{' '}
                with us and granted access, you'll be able to find and inspect them.
              </Row>
            </Col>
          </Container>
        </>
      )}
    </>
  );
}

export default Search;
