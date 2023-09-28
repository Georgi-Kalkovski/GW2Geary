import React from 'react';
import SearchSubbutton from './SearchSubbutton';

function SearchMenu({ isOpen, selectedRaceUp, selectedProfessionUp, selectedRace, selectedProfession }) {

    const handleRaceSelection = (race) => {
        if (selectedRace === race) {
            selectedRaceUp('');
        } else {
            selectedRaceUp(race);
        }
    };

    const handleProfessionSelection = (profession) => {
        if (selectedProfession === profession) {
            selectedProfessionUp('');
        } else {
            selectedProfessionUp(profession);
        }
    };

    return (
        <div>
            {/* Dropdown menu */}
            <div className="dropdown">
                {isOpen && (
                    <div className='hr-container' style={{ marginTop: '-10px' }}>
                        <div className='flex cursor search-menu-flex'>
                            <SearchSubbutton active={selectedRace} text='Asura' onClick={() => handleRaceSelection('Asura')} />
                            <SearchSubbutton active={selectedRace} text='Sylvari' onClick={() => handleRaceSelection('Sylvari')} />
                            <SearchSubbutton active={selectedRace} text='Human' onClick={() => handleRaceSelection('Human')} />
                            <SearchSubbutton active={selectedRace} text='Norn' onClick={() => handleRaceSelection('Norn')} />
                            <SearchSubbutton active={selectedRace} text='Charr' onClick={() => handleRaceSelection('Charr')} />
                        </div>
                        <div className="thin-hr"></div>
                        <div className='flex cursor search-menu-flex'>
                            <SearchSubbutton active={selectedProfession} text='Mesmer' onClick={() => handleProfessionSelection('Mesmer')} />
                            <SearchSubbutton active={selectedProfession} text='Guardian' onClick={() => handleProfessionSelection('Guardian')} />
                            <SearchSubbutton active={selectedProfession} text='Necromancer' onClick={() => handleProfessionSelection('Necromancer')} />
                            <SearchSubbutton active={selectedProfession} text='Ranger' onClick={() => handleProfessionSelection('Ranger')} />
                            <SearchSubbutton active={selectedProfession} text='Elementalist' onClick={() => handleProfessionSelection('Elementalist')} />
                            <SearchSubbutton active={selectedProfession} text='Warrior' onClick={() => handleProfessionSelection('Warrior')} />
                            <SearchSubbutton active={selectedProfession} text='Thief' onClick={() => handleProfessionSelection('Thief')} />
                            <SearchSubbutton active={selectedProfession} text='Engineer' onClick={() => handleProfessionSelection('Engineer')} />
                            <SearchSubbutton active={selectedProfession} text='Revenant' onClick={() => handleProfessionSelection('Revenant')} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default SearchMenu;
