import React, { useState } from 'react';
import Male from './imgSearch/male.png';
import Female from './imgSearch/female.png';
import Asura from './imgSearch/asura.png';
import Charr from './imgSearch/charr.png';
import Human from './imgSearch/human.png';
import Norn from './imgSearch/norn.png';
import Sylvari from './imgSearch/sylvari.png';
import { wikiBigProfessionIcons } from "../icons";
import SearchSubbutton from './SearchSubbutton';

function SearchMenu({ isOpen, selectedGenderUp, selectedRaceUp, selectedProfessionUp, selectedGender, selectedRace, selectedProfession }) {
    const [isOpenGender, setIsOpenGender] = useState(false);
    const [isOpenRace, setIsOpenRace] = useState(false);
    const [isOpenProfession, setIsOpenProfession] = useState(true);
    const [isOpenGenderActive, setIsOpenGenderActive] = useState(selectedGender);
    const [isOpenRaceActive, setIsOpenRaceActive] = useState(selectedRace);
    const [isOpenProfessionActive, setIsOpenProfessionActive] = useState(selectedProfession);
    const toggleMenuGender = () => {
        setIsOpenGender(!isOpenGender);
        if (isOpenRace) {
            setIsOpenRace(!isOpenRace);
        }
        if (isOpenProfession) {
            setIsOpenProfession(!isOpenProfession);
        }
    }

    const toggleMenuRace = () => {
        setIsOpenRace(!isOpenRace);
        if (isOpenProfession) {
            setIsOpenProfession(!isOpenProfession);
        }
        if (isOpenGender) {
            setIsOpenGender(!isOpenGender);
        }
    }

    const toggleMenuProfession = () => {
        setIsOpenProfession(!isOpenProfession);
        if (isOpenRace) {
            setIsOpenRace(!isOpenRace);
        }
        if (isOpenGender) {
            setIsOpenGender(!isOpenGender);
        }
    }

    const handleGenderSelection = (gender) => {
        selectedGenderUp(gender);
        setIsOpenGenderActive(gender);
    };

    const handleRaceSelection = (race) => {
        if (isOpenRaceActive === race) {
            selectedRaceUp('');
            setIsOpenRaceActive('');

        } else {
            setIsOpenRaceActive(race);
            selectedRaceUp(race);
        }

    };

    const handleProfessionSelection = (profession) => {
        if (isOpenProfessionActive === profession) {
            setIsOpenProfessionActive('');
            selectedProfessionUp('');

        } else {
            setIsOpenProfessionActive(profession);
            selectedProfessionUp(profession);

        }
    };

    return (
        <div>

            {/* Dropdown menu */}
            <div className="dropdown">

                {isOpen && (
                    <div style={{ marginTop: '-10px' }}>
                        {/* <button className={`${isOpenGender ? 'active' : ''} basic-button-search`} onClick={toggleMenuGender} >
                            Gender
                        </button> */}
                        <button className={`${isOpenRace ? 'active' : ''} basic-button-search`} onClick={toggleMenuRace} >
                            Race
                        </button>
                        <button className={`${isOpenProfession ? 'active' : ''} basic-button-search`} onClick={toggleMenuProfession} >
                            Profession
                        </button>
                        {isOpenGender && (
                            <div className='flex cursor search-menu-flex'>
                                <SearchSubbutton active={isOpenGenderActive} img={Male} text='Male' onClick={() => handleRaceSelection('Male')} />
                                <SearchSubbutton active={isOpenGenderActive} img={Female} text='Female' onClick={() => handleRaceSelection('Female')} />
                            </div>
                        )}
                        {isOpenRace && (
                            <div className='flex cursor search-menu-flex'>
                                <SearchSubbutton active={isOpenRaceActive} img={Asura} text='Asura' onClick={() => handleRaceSelection('Asura')} />
                                <SearchSubbutton active={isOpenRaceActive} img={Sylvari} text='Sylvari' onClick={() => handleRaceSelection('Sylvari')} />
                                <SearchSubbutton active={isOpenRaceActive} img={Human} text='Human' onClick={() => handleRaceSelection('Human')} />
                                <SearchSubbutton active={isOpenRaceActive} img={Norn} text='Norn' onClick={() => handleRaceSelection('Norn')} />
                                <SearchSubbutton active={isOpenRaceActive} img={Charr} text='Charr' onClick={() => handleRaceSelection('Charr')} />
                            </div>
                        )}
                        {isOpenProfession && (
                            <div className='flex cursor search-menu-flex'>
                                <SearchSubbutton active={isOpenProfessionActive} img={wikiBigProfessionIcons['Mesmer']} text='Mesmer' onClick={() => handleProfessionSelection('Mesmer')} />
                                <SearchSubbutton active={isOpenProfessionActive} img={wikiBigProfessionIcons['Guardian']} text='Guardian' onClick={() => handleProfessionSelection('Guardian')} />
                                <SearchSubbutton active={isOpenProfessionActive} img={wikiBigProfessionIcons['Necromancer']} text='Necromancer' onClick={() => handleProfessionSelection('Necromancer')} />
                                <SearchSubbutton active={isOpenProfessionActive} img={wikiBigProfessionIcons['Ranger']} text='Ranger' onClick={() => handleProfessionSelection('Ranger')} />
                                <SearchSubbutton active={isOpenProfessionActive} img={wikiBigProfessionIcons['Elementalist']} text='Elementalist' onClick={() => handleProfessionSelection('Elementalist')} />
                                <SearchSubbutton active={isOpenProfessionActive} img={wikiBigProfessionIcons['Warrior']} text='Warrior' onClick={() => handleProfessionSelection('Warrior')} />
                                <SearchSubbutton active={isOpenProfessionActive} img={wikiBigProfessionIcons['Thief']} text='Thief' onClick={() => handleProfessionSelection('Thief')} />
                                <SearchSubbutton active={isOpenProfessionActive} img={wikiBigProfessionIcons['Engineer']} text='Engineer' onClick={() => handleProfessionSelection('Engineer')} />
                                <SearchSubbutton active={isOpenProfessionActive} img={wikiBigProfessionIcons['Revenant']} text='Revenant' onClick={() => handleProfessionSelection('Revenant')} />
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default SearchMenu;
