import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import AuthService from '../services/auth.service';
import CharacterPreview from './CharacterPreview';
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

  // Account Pagination
  const renderAccountsPagination = () => {
    if (filteredAccounts.length < itemsPerPage) {
      return null;
    }
  
    const renderPageNumbers = [];
    const totalPagesToShow = 15;
  
    let startPage, endPage;
    if (totalPagesAccounts <= totalPagesToShow) {
      startPage = 1;
      endPage = totalPagesAccounts;
    } else {
      const middlePage = Math.floor(totalPagesToShow / 2);
      let leftOffset = Math.min(middlePage, Math.floor(totalPagesToShow / 2));
      let rightOffset = Math.min(middlePage, totalPagesAccounts - totalPagesToShow + 1) - 1;
  
      if (accountsPage <= middlePage) {
        startPage = 1;
        endPage = totalPagesToShow;
      } else if (accountsPage >= totalPagesAccounts - middlePage) {
        startPage = totalPagesAccounts - totalPagesToShow + 1;
        endPage = totalPagesAccounts;
      } else {
        startPage = accountsPage - leftOffset;
        endPage = accountsPage + rightOffset;
      }
    }
  
    for (let i = startPage; i <= endPage; i++) {
      renderPageNumbers.push(
        <button
          key={i}
          className={i === accountsPage ? 'pagination-item active' : 'pagination-item'}
          onClick={() => setAccountsPage(i)}
          disabled={i === accountsPage}
        >
          {i}
        </button>
      );
    }
  
    return (
      <div className="pagination-container">
        <button
          className="pagination-item"
          onClick={() => setAccountsPage(accountsPage - 1)}
          disabled={accountsPage <= 1}
        >
          &lt;
        </button>
        {startPage > 1 && (
          <>
            <button
              className="pagination-item"
              onClick={() => setAccountsPage(1)}
            >
              1
            </button>
            {startPage > 2 && (
              <span className="pagination-ellipsis">...</span>
            )}
          </>
        )}
        {renderPageNumbers}
        {endPage < totalPagesAccounts && (
          <>
            {endPage < totalPagesAccounts - 1 && (
              <span className="pagination-ellipsis">...</span>
            )}
            <button
              className="pagination-item"
              onClick={() => setAccountsPage(totalPagesAccounts)}
            >
              {totalPagesAccounts}
            </button>
          </>
        )}
        <button
          className="pagination-item"
          onClick={() => setAccountsPage(accountsPage + 1)}
          disabled={accountsPage >= totalPagesAccounts}
        >
          &gt;
        </button>
      </div>
    );
  };
  
  const renderCharactersPagination = () => {
    if (filteredCharacters.length < itemsPerPage) {
      return null;
    }
  
    const renderPageNumbers = [];
    const totalPagesToShow = 15;
  
    // Calculate the start and end page numbers to display
    let startPage, endPage;
    if (totalPagesCharacters <= totalPagesToShow) {
      startPage = 1;
      endPage = totalPagesCharacters;
    } else {
      const middlePage = Math.floor(totalPagesToShow / 2);
      let leftOffset = Math.min(middlePage, Math.floor(totalPagesToShow / 2));
      let rightOffset = Math.min(middlePage, totalPagesCharacters - totalPagesToShow + 1) - 1;
  
      if (charactersPage <= middlePage) {
        startPage = 1;
        endPage = totalPagesToShow;
      } else if (charactersPage >= totalPagesCharacters - middlePage) {
        startPage = totalPagesCharacters - totalPagesToShow + 1;
        endPage = totalPagesCharacters;
      } else {
        startPage = charactersPage - leftOffset;
        endPage = charactersPage + rightOffset;
      }
    }
  
    for (let i = startPage; i <= endPage; i++) {
      renderPageNumbers.push(
        <button
          key={i}
          className={i === charactersPage ? 'pagination-item active' : 'pagination-item'}
          onClick={() => setCharactersPage(i)}
          disabled={i === charactersPage}
        >
          {i}
        </button>
      );
    }
  
    return (
      <div className="pagination-container">
        <button
          className="pagination-item"
          onClick={() => setCharactersPage(charactersPage - 1)}
          disabled={charactersPage <= 1}
        >
          &lt;
        </button>
        {startPage > 1 && (
          <>
            <button
              className="pagination-item"
              onClick={() => setCharactersPage(1)}
            >
              1
            </button>
            {startPage > 2 && (
              <span className="pagination-ellipsis">...</span>
            )}
          </>
        )}
        {renderPageNumbers}
        {endPage < totalPagesCharacters && (
          <>
            {endPage < totalPagesCharacters - 1 && (
              <span className="pagination-ellipsis">...</span>
            )}
            <button
              className="pagination-item"
              onClick={() => setCharactersPage(totalPagesCharacters)}
            >
              {totalPagesCharacters}
            </button>
          </>
        )}
        <button
          className="pagination-item"
          onClick={() => setCharactersPage(charactersPage + 1)}
          disabled={charactersPage >= totalPagesCharacters}
        >
          &gt;
        </button>
      </div>
    );
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
              <div key="no-matching-accounts">No matching accounts found.</div>
            )}
          </Container>
          {renderAccountsPagination()}
          <div className="characters">
            <React.Fragment key="characters-fragment">
              {displayedCharacters.map((character) => (
                <CharacterPreview character={character} key={character.name} />
              ))}
            </React.Fragment>
          </div>
          {renderCharactersPagination()}
        </React.Fragment>
      ) : (
        <Container className="flex center">
          <Col className="home-empty-search-box">
            <Row style={{ fontSize: '1.5em' }}>
              Welcome to <span className="gw2-logo-style">GW2</span>
              <span className="geary-logo-style">Geary</span> !
            </Row>
            <Row>A place where you can inspect equipment and builds of registered accounts and their characters.</Row>
            <Row>
              If someone has registered a valid{' '}
              <Link to="https://account.arena.net/applications" style={{ color: '#aa0404' }}>
                GW2 API key
              </Link>{' '}
              with us and granted access, you'll be able to find and inspect them.
            </Row>
          </Col>
        </Container>
      )}
    </>
  );
}

export default Search;
