import React, { useState } from 'react';
import Male from './imgSearch/male.png';
import Female from './imgSearch/female.png';
import Asura from './imgSearch/asura.png';
import Charr from './imgSearch/charr.png';
import Human from './imgSearch/human.png';
import Norn from './imgSearch/norn.png';
import Sylvari from './imgSearch/sylvari.png';
import { wikiBigProfessionIcons } from "../icons";

function SearchButton({ isOpen, selectedGenderUp, selectedRaceUp, selectedProfessionUp }) {
    const [isOpenGender, setIsOpenGender] = useState(false);
    const [isOpenRace, setIsOpenRace] = useState(false);
    const [isOpenClass, setIsOpenClass] = useState(false);

    const toggleMenuGender = () => {
        setIsOpenGender(!isOpenGender);
        if (isOpenRace) {
            setIsOpenRace(!isOpenRace);
        }
        if (isOpenClass) {
            setIsOpenClass(!isOpenClass);
        }
    }

    const toggleMenuRace = () => {
        setIsOpenRace(!isOpenRace);
        if (isOpenClass) {
            setIsOpenClass(!isOpenClass);
        }
        if (isOpenGender) {
            setIsOpenGender(!isOpenGender);
        }
    }

    const toggleMenuClass = () => {
        setIsOpenClass(!isOpenClass);
        if (isOpenRace) {
            setIsOpenRace(!isOpenRace);
        }
        if (isOpenGender) {
            setIsOpenGender(!isOpenGender);
        }
    }

    const handleGenderSelection = (gender) => {
        selectedGenderUp(gender);
    };

    const handleRaceSelection = (race) => {
        selectedRaceUp(race);

    };

    const handleProfessionSelection = (profession) => {
        selectedProfessionUp(profession);
    };

    return (
        <div className='' >

            {/* Dropdown menu */}
            <div className="dropdown">

                {isOpen && (
                    <div style={{ marginTop: '-10px' }}>
                        {/* <button className='basic-button-search' onClick={toggleMenuGender} >
                            Gender
                        </button> */}
                        <button className='basic-button-search' onClick={toggleMenuRace} >
                            Race
                        </button>
                        <button className='basic-button-search' onClick={toggleMenuClass} >
                            Profession
                        </button>
                        {isOpenGender && (
                            <div className='flex cursor search-menu-flex'>
                                <button
                                    className='basic-button-search'
                                    onClick={() => handleGenderSelection('Male')}
                                >
                                    <div><img src={Male} alt="" /></div>
                                    <div>Male</div>
                                </button>
                                <button
                                    className='basic-button-search'
                                    onClick={() => handleGenderSelection('Female')}
                                >
                                    <div><img src={Female} alt="" /></div>
                                    <div>Female</div>
                                </button>
                            </div>
                        )}
                        {isOpenRace && (
                            <div className='flex cursor search-menu-flex'>
                                <button
                                    className='basic-button-search'
                                    onClick={() => handleRaceSelection('Asura')}
                                >
                                    <div><img src={Asura} alt="" /></div>
                                    <div>Asura</div>
                                </button>
                                <button
                                    className='basic-button-search'
                                    onClick={() => handleRaceSelection('Sylvari')}
                                >
                                    <div><img src={Sylvari} alt="" /></div>
                                    <div>Sylvari</div>
                                </button>
                                <button
                                    className='basic-button-search'
                                    onClick={() => handleRaceSelection('Human')}
                                >
                                    <div><img src={Human} alt="" /></div>
                                    <div>Human</div>
                                </button>
                                <button
                                    className='basic-button-search'
                                    onClick={() => handleRaceSelection('Norn')}
                                >
                                    <div><img src={Norn} alt="" /></div>
                                    <div>Norn</div>
                                </button>
                                <button
                                    className='basic-button-search'
                                    onClick={() => handleRaceSelection('Charr')}
                                >
                                    <div><img src={Charr} alt="" /></div>
                                    <div>Charr</div>
                                </button>
                            </div>
                        )}
                        {isOpenClass && (
                            <div className='flex cursor search-menu-flex'>
                                <button
                                    className='basic-button-search'
                                    onClick={() => handleProfessionSelection('Mesmer')}
                                >
                                    <div><img src={wikiBigProfessionIcons['Mesmer']} alt="" /></div>
                                    <div>Mesmer</div>
                                </button>
                                <button
                                    className='basic-button-search'
                                    onClick={() => handleProfessionSelection('Guardian')}
                                >
                                    <div><img src={wikiBigProfessionIcons['Guardian']} alt="" /></div>
                                    <div>Guardian</div>
                                </button>
                                <button
                                    className='basic-button-search'
                                    onClick={() => handleProfessionSelection('Necromancer')}
                                >
                                    <div><img src={wikiBigProfessionIcons['Necromancer']} alt="" /></div>
                                    <div>Necromancer</div>
                                </button>
                                <button
                                    className='basic-button-search'
                                    onClick={() => handleProfessionSelection('Ranger')}
                                >
                                    <div><img src={wikiBigProfessionIcons['Ranger']} alt="" /></div>
                                    <div>Ranger</div>
                                </button>
                                <button
                                    className='basic-button-search'
                                    onClick={() => handleProfessionSelection('Elementalist')}
                                >
                                    <div><img src={wikiBigProfessionIcons['Elementalist']} alt="" /></div>
                                    <div>Elementalist</div>
                                </button>
                                <button
                                    className='basic-button-search'
                                    onClick={() => handleProfessionSelection('Warrior')}
                                >
                                    <div><img src={wikiBigProfessionIcons['Warrior']} alt="" /></div>
                                    <div>Warrior</div>
                                </button>
                                <button
                                    className='basic-button-search'
                                    onClick={() => handleProfessionSelection('Thief')}
                                >
                                    <div><img src={wikiBigProfessionIcons['Thief']} alt="" /></div>
                                    <div>Thief</div>
                                </button>
                                <button
                                    className='basic-button-search'
                                    onClick={() => handleProfessionSelection('Engineer')}
                                >
                                    <div><img src={wikiBigProfessionIcons['Engineer']} alt="" /></div>
                                    <div>Engineer</div>
                                </button>
                                <button
                                    className='basic-button-search'
                                    onClick={() => handleProfessionSelection('Revenant')}
                                >
                                    <div><img src={wikiBigProfessionIcons['Revenant']} alt="" /></div>
                                    <div>Revenant</div>
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default SearchButton;
