import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import AuthService from '../services/auth.service';
import CharacterPreview from './CharacterPreview';
import Pagination from './Search/Pagination';
import SearchMenu from './Search/SearchMenu';
import './Classes.css';
import './Search.css';
import SearchAdd from './Search/search-add.svg';
import SearchWelcome from './Search/SearchWelcome';
import SearchNews from './Search/SearchNews';
import SearchCounter from './Search/SearchCounter';

function Search() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedRace, setSelectedRace] = useState('');
  const [selectedProfession, setSelectedProfession] = useState('');

  const [accounts, setAccounts] = useState([]);
  const [filteredAccounts, setFilteredAccounts] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [accountsPage, setAccountsPage] = useState(1);
  const [charactersPage, setCharactersPage] = useState(1);

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
        const filteredCharacters = charactersWithMatchingNames.filter((character) => {
          if (selectedGender && character.gender !== selectedGender) {
            return false;
          }
          if (selectedRace && character.race !== selectedRace) {
            return false;
          }
          if (selectedProfession && character.profession !== selectedProfession) {
            return false;
          }
          return true;
        });
        acc.push(...filteredCharacters);
      }
      return acc;
    }, []);

    setFilteredCharacters(filteredCharacters.sort(customSortCharacters));
  }, [accounts, searchTerm, selectedGender, selectedRace, selectedProfession]);

  const itemsPerPage = 15;

  const startIndexAccounts = (accountsPage - 1) * itemsPerPage;
  const endIndexAccounts = startIndexAccounts + itemsPerPage;
  const displayedAccounts = filteredAccounts.slice(startIndexAccounts, endIndexAccounts);

  const startIndexCharacters = (charactersPage - 1) * itemsPerPage;
  const endIndexCharacters = startIndexCharacters + itemsPerPage;
  const displayedCharacters = filteredCharacters.slice(startIndexCharacters, endIndexCharacters);

  const totalPagesAccounts = Math.ceil(filteredAccounts.length / itemsPerPage);
  const totalPagesCharacters = Math.ceil(filteredCharacters.length / itemsPerPage);

  const handleGenderSelection = (gender) => {
    if (gender === selectedGender) {
      setSelectedGender('');
      setAccountsPage(1);
      setCharactersPage(1);
    } else {
      setSelectedGender(gender);
      setAccountsPage(1);
      setCharactersPage(1);
    }
  };

  const handleRaceSelection = (race) => {
    if (race === selectedRace) {
      setSelectedRace('');
      setAccountsPage(1);
      setCharactersPage(1);
    } else {
      setSelectedRace(race);
      setAccountsPage(1);
      setCharactersPage(1);
    }
  };

  const handleProfessionSelection = (profession) => {
    if (profession === selectedProfession) {
      setSelectedProfession('');
      setAccountsPage(1);
      setCharactersPage(1);
    } else {
      setSelectedProfession(profession);
      setAccountsPage(1);
      setCharactersPage(1);
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  }

  const toggleX = () => {
    setSearchTerm('');
    setSelectedGender('');
    setSelectedRace('');
    setSelectedProfession('');
  }

  return (
    <>
      <div className="search-container">
        {/* Search Input */}
        <input
          className="search-input"
          type="text"
          placeholder="Search account or character name..."
          value={searchTerm}
          onChange={handleSearch}
          key="search-input"
        />
        {searchTerm !== '' || selectedGender !== '' || selectedRace !== '' || selectedProfession !== '' ?
          <button className='basic-button x-button' onClick={toggleX} >
            X
          </button> :
          <button className='basic-button x-button' style={{ visibility: 'hidden' }} onClick={toggleX} >
            X
          </button>
        }
        {/* Search Button */}
        {!isOpen
          ? (
            <button onClick={toggleMenu} className='basic-button-search plus-minus-button'  >
              <img src={SearchAdd} style={{ width: "25px", display: "flex" }} alt="" />
            </button>
          ) : (
            <button onClick={toggleMenu} className='basic-button-search plus-minus-button active'  >
              <img src={SearchAdd} style={{ width: "25px", display: "flex" }} alt="" />
            </button>
          )
        }
      </div>
      {/* Search Button Menu*/}
      {isOpen && (
        <SearchMenu
          isOpen={isOpen}
          selectedGenderUp={handleGenderSelection}
          selectedGender={selectedGender}
          selectedRaceUp={handleRaceSelection}
          selectedRace={selectedRace}
          selectedProfessionUp={handleProfessionSelection}
          selectedProfession={selectedProfession}
        />
      )}

      <div className='flex center' style={{ marginTop: '0px', marginBottom: '5px' }}>
        {selectedGender && !isOpen && (
          <span
            className="selected-span"
            onClick={() => setSelectedGender('')}
          >
            {selectedGender}
          </span>
        )}
        {selectedRace && !isOpen && (
          <span
            className="selected-span"
            onClick={() => setSelectedRace('')}
          >
            {selectedRace}
          </span>
        )}
        {selectedProfession && !isOpen && (
          <span
            className="selected-span"
            onClick={() => setSelectedProfession('')}
          >
            {selectedProfession}
          </span>
        )}
      </div>

      {searchTerm !== '' || selectedGender !== '' || selectedRace !== '' || selectedProfession !== '' ? (
        <React.Fragment key={`home-fragment-${searchTerm}`}>
          {searchTerm !== '' && selectedGender === '' && selectedRace === '' && selectedProfession === '' && (
            <>
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
            </>
          )}
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
          <SearchWelcome />
          <SearchNews />
          <SearchCounter accounts={accounts} />
          <br />
        </>
      )}
    </>
  );
}

export default Search;