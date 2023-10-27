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
    const gendersFemaleRef = useRef(null);
    const gendersMaleRef = useRef(null);

    const racesAsuraRef = useRef(null);
    const racesCharrRef = useRef(null);
    const racesHumanRef = useRef(null);
    const racesNornRef = useRef(null);
    const racesSylvariRef = useRef(null);

    const professionsElementalistRef = useRef(null);
    const professionsEngineerRef = useRef(null);
    const professionsGuardianRef = useRef(null);
    const professionsMesmerRef = useRef(null);
    const professionsNecromancerRef = useRef(null);
    const professionsRangerRef = useRef(null);
    const professionsRevenantRef = useRef(null);
    const professionsThiefRef = useRef(null);
    const professionsWarriorRef = useRef(null);

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
                gendersFemaleRef.current &&
                !gendersFemaleRef.current.contains(event.target) &&
                gendersMaleRef.current &&
                !gendersMaleRef.current.contains(event.target) &&
                racesAsuraRef.current &&
                !racesAsuraRef.current.contains(event.target) &&
                racesCharrRef.current &&
                !racesCharrRef.current.contains(event.target) &&
                racesHumanRef.current &&
                !racesHumanRef.current.contains(event.target) &&
                racesNornRef.current &&
                !racesNornRef.current.contains(event.target) &&
                racesSylvariRef.current &&
                !racesSylvariRef.current.contains(event.target) &&
                professionsElementalistRef.current &&
                !professionsElementalistRef.current.contains(event.target) &&
                professionsEngineerRef.current &&
                !professionsEngineerRef.current.contains(event.target) &&
                professionsGuardianRef.current &&
                !professionsGuardianRef.current.contains(event.target) &&
                professionsMesmerRef.current &&
                !professionsMesmerRef.current.contains(event.target) &&
                professionsNecromancerRef.current &&
                !professionsNecromancerRef.current.contains(event.target) &&
                professionsRangerRef.current &&
                !professionsRangerRef.current.contains(event.target) &&
                professionsRevenantRef.current &&
                !professionsRevenantRef.current.contains(event.target) &&
                professionsThiefRef.current &&
                !professionsThiefRef.current.contains(event.target) &&
                professionsWarriorRef.current &&
                !professionsWarriorRef.current.contains(event.target)
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
                        <div ref={gendersFemaleRef} ><SearchSubbutton active={selectedGender} text='Female' onClick={() => handleGenderSelection('Female')} /></div>
                        <div ref={gendersMaleRef} ><SearchSubbutton active={selectedGender} text='Male' onClick={() => handleGenderSelection('Male')} /></div>
                        {window.innerWidth > 900
                            ? <span className="thin-hr-vertical"></span>
                            : <span className="thin-hr"></span>
                        }
                        <div className='flex cursor search-menu-flex'>
                            <div ref={racesAsuraRef} ><SearchSubbutton active={selectedRace} text='Asura' onClick={() => handleRaceSelection('Asura')} /></div>
                            <div ref={racesCharrRef} ><SearchSubbutton active={selectedRace} text='Charr' onClick={() => handleRaceSelection('Charr')} /></div>
                            <div ref={racesHumanRef}><SearchSubbutton active={selectedRace} text='Human' onClick={() => handleRaceSelection('Human')} /></div>
                            <div ref={racesNornRef}><SearchSubbutton active={selectedRace} text='Norn' onClick={() => handleRaceSelection('Norn')} /></div>
                            <div ref={racesSylvariRef} ><SearchSubbutton active={selectedRace} text='Sylvari' onClick={() => handleRaceSelection('Sylvari')} /></div>
                        </div>
                        <div className="thin-hr"></div>
                    </div>
                    <div className='flex cursor search-menu-flex'>
                        <div ref={professionsElementalistRef} ><SearchSubbutton active={selectedProfession} text='Elementalist' onClick={() => handleProfessionSelection('Elementalist')} /></div>
                        <div ref={professionsEngineerRef} ><SearchSubbutton active={selectedProfession} text='Engineer' onClick={() => handleProfessionSelection('Engineer')} /></div>
                        <div ref={professionsGuardianRef} ><SearchSubbutton active={selectedProfession} text='Guardian' onClick={() => handleProfessionSelection('Guardian')} /></div>
                        <div ref={professionsMesmerRef} ><SearchSubbutton active={selectedProfession} text='Mesmer' onClick={() => handleProfessionSelection('Mesmer')} /></div>
                        <div ref={professionsNecromancerRef} ><SearchSubbutton active={selectedProfession} text='Necromancer' onClick={() => handleProfessionSelection('Necromancer')} /></div>
                        <div ref={professionsRangerRef} ><SearchSubbutton active={selectedProfession} text='Ranger' onClick={() => handleProfessionSelection('Ranger')} /></div>
                        <div ref={professionsRevenantRef} ><SearchSubbutton active={selectedProfession} text='Revenant' onClick={() => handleProfessionSelection('Revenant')} /></div>
                        <div ref={professionsThiefRef} ><SearchSubbutton active={selectedProfession} text='Thief' onClick={() => handleProfessionSelection('Thief')} /></div>
                        <div ref={professionsWarriorRef} ><SearchSubbutton active={selectedProfession} text='Warrior' onClick={() => handleProfessionSelection('Warrior')} /></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchMenu;