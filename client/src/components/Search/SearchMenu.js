import React, { useEffect, useRef } from 'react';
import SearchSubbutton from './SearchSubbutton';

function SearchMenu({
    isOpen,
    setIsOpen,
    selectedGenderUp,
    selectedRaceUp,
    selectedProfessionUp,
    selectedGender,
    selectedRace,
    selectedProfession
}) {
    const gendersRef = useRef(null);
    const racesRef = useRef(null);
    const professionsRef = useRef(null);

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

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                gendersRef.current &&
                !gendersRef.current.contains(event.target) &&
                racesRef.current &&
                !racesRef.current.contains(event.target) &&
                professionsRef.current &&
                !professionsRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, setIsOpen]);

    return (
        <div className={`transition-hover-search ${isOpen ? 'open' : ''}`}>
            {/* Dropdown menu */}
            <div className="dropdown">
                <div className='hr-container'>
                    <div className='flex cursor search-menu-flex' >
                        <div ref={gendersRef}>
                            <div>
                                <SearchSubbutton active={selectedGender} text='Female' onClick={() => handleGenderSelection('Female')} />
                                <SearchSubbutton active={selectedGender} text='Male' onClick={() => handleGenderSelection('Male')} />
                            </div>
                        </div>
                        {window.innerWidth > 900
                            ? <span className="thin-hr-vertical"></span>
                            : <span className="thin-hr"></span>
                        }
                        <div ref={racesRef}>
                            <SearchSubbutton active={selectedRace} text='Asura' onClick={() => handleRaceSelection('Asura')} />
                            <SearchSubbutton active={selectedRace} text='Charr' onClick={() => handleRaceSelection('Charr')} />
                            <SearchSubbutton active={selectedRace} text='Human' onClick={() => handleRaceSelection('Human')} />
                            <SearchSubbutton active={selectedRace} text='Norn' onClick={() => handleRaceSelection('Norn')} />
                            <SearchSubbutton active={selectedRace} text='Sylvari' onClick={() => handleRaceSelection('Sylvari')} />
                        </div>
                        <div className="thin-hr"></div>
                    </div>
                    <div className='flex cursor search-menu-flex'>
                        <div ref={professionsRef}>
                            <SearchSubbutton active={selectedProfession} text='Elementalist' onClick={() => handleProfessionSelection('Elementalist')} />
                            <SearchSubbutton active={selectedProfession} text='Engineer' onClick={() => handleProfessionSelection('Engineer')} />
                            <SearchSubbutton active={selectedProfession} text='Guardian' onClick={() => handleProfessionSelection('Guardian')} />
                            <SearchSubbutton active={selectedProfession} text='Mesmer' onClick={() => handleProfessionSelection('Mesmer')} />
                            <SearchSubbutton active={selectedProfession} text='Necromancer' onClick={() => handleProfessionSelection('Necromancer')} />
                            <SearchSubbutton active={selectedProfession} text='Ranger' onClick={() => handleProfessionSelection('Ranger')} />
                            <SearchSubbutton active={selectedProfession} text='Revenant' onClick={() => handleProfessionSelection('Revenant')} />
                            <SearchSubbutton active={selectedProfession} text='Thief' onClick={() => handleProfessionSelection('Thief')} />
                            <SearchSubbutton active={selectedProfession} text='Warrior' onClick={() => handleProfessionSelection('Warrior')} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchMenu;