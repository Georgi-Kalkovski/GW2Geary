import React from 'react';
import SearchSubbutton from './SearchSubbutton';
// import Male from './imgSearch/male.png';
// import Female from './imgSearch/female.png';
import Asura from './imgSearch/asura.png';
import Charr from './imgSearch/charr.png';
import Human from './imgSearch/human.png';
import Norn from './imgSearch/norn.png';
import Sylvari from './imgSearch/sylvari.png';
import { wikiBigProfessionIcons } from "../icons";
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
            <div className={`dropdown ${isOpen ? 'open' : ''}`}>
                {isOpen && (
                    <div className='hr-container' style={{ marginTop: '-10px' }}>
                        <div className='flex cursor search-menu-flex'>
                            <SearchSubbutton active={selectedRace} img={Asura} text='Asura' onClick={() => handleRaceSelection('Asura')} />
                            <SearchSubbutton active={selectedRace} img={Sylvari} text='Sylvari' onClick={() => handleRaceSelection('Sylvari')} />
                            <SearchSubbutton active={selectedRace} img={Human} text='Human' onClick={() => handleRaceSelection('Human')} />
                            <SearchSubbutton active={selectedRace} img={Norn} text='Norn' onClick={() => handleRaceSelection('Norn')} />
                            <SearchSubbutton active={selectedRace} img={Charr} text='Charr' onClick={() => handleRaceSelection('Charr')} />
                        </div>
                        <div className="thin-hr"></div>
                        <div className='flex cursor search-menu-flex'>
                            <SearchSubbutton active={selectedProfession} img={wikiBigProfessionIcons['Mesmer']} text='Mesmer' onClick={() => handleProfessionSelection('Mesmer')} />
                            <SearchSubbutton active={selectedProfession} img={wikiBigProfessionIcons['Guardian']} text='Guardian' onClick={() => handleProfessionSelection('Guardian')} />
                            <SearchSubbutton active={selectedProfession} img={wikiBigProfessionIcons['Necromancer']} text='Necromancer' onClick={() => handleProfessionSelection('Necromancer')} />
                            <SearchSubbutton active={selectedProfession} img={wikiBigProfessionIcons['Ranger']} text='Ranger' onClick={() => handleProfessionSelection('Ranger')} />
                            <SearchSubbutton active={selectedProfession} img={wikiBigProfessionIcons['Elementalist']} text='Elementalist' onClick={() => handleProfessionSelection('Elementalist')} />
                            <SearchSubbutton active={selectedProfession} img={wikiBigProfessionIcons['Warrior']} text='Warrior' onClick={() => handleProfessionSelection('Warrior')} />
                            <SearchSubbutton active={selectedProfession} img={wikiBigProfessionIcons['Thief']} text='Thief' onClick={() => handleProfessionSelection('Thief')} />
                            <SearchSubbutton active={selectedProfession} img={wikiBigProfessionIcons['Engineer']} text='Engineer' onClick={() => handleProfessionSelection('Engineer')} />
                            <SearchSubbutton active={selectedProfession} img={wikiBigProfessionIcons['Revenant']} text='Revenant' onClick={() => handleProfessionSelection('Revenant')} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default SearchMenu;
