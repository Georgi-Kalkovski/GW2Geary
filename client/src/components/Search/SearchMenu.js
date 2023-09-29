import React from 'react';
import SearchSubbutton from './SearchSubbutton';

function SearchMenu({ isOpen, selectedGenderUp, selectedRaceUp, selectedProfessionUp, selectedGender, selectedRace, selectedProfession }) {

    const handleGenderSelection = (gender) => {
        if (selectedGender === gender) {
            selectedGenderUp('');
        } else {
            selectedGenderUp(gender);
        }
    };

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
                            <SearchSubbutton active={selectedGender} text='Male' onClick={() => handleGenderSelection('Male')} />
                            <SearchSubbutton active={selectedGender} text='Female' onClick={() => handleGenderSelection('Female')} />
                            {window.innerWidth < 550 && <div className="thin-hr flex column"></div>}
                            {window.innerWidth > 550 && <span className="thin-hr-vertical"></span>}
                            <SearchSubbutton active={selectedRace} text='Asura' onClick={() => handleRaceSelection('Asura')} />
                            <SearchSubbutton active={selectedRace} text='Sylvari' onClick={() => handleRaceSelection('Sylvari')} />
                            <SearchSubbutton active={selectedRace} text='Human' onClick={() => handleRaceSelection('Human')} />
                            <SearchSubbutton active={selectedRace} text='Norn' onClick={() => handleRaceSelection('Norn')} />
                            <SearchSubbutton active={selectedRace} text='Charr' onClick={() => handleRaceSelection('Charr')} />
                            <div className="thin-hr"></div>
                        </div>
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
