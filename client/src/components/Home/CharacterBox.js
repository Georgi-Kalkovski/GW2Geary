import { useState } from 'react';
import { useFetchData } from '../useFetchData';
import ProfessionInfo from './ProfessionInfo';
import EqupmentTabs from './EquipmentTabs';

function CharacterBox({ character }) {
    const [characterData, setCharacterData] = useState([]);

    useFetchData(`characters/${character}`, setCharacterData);

    // TODO: Play with the reading of the build tabs
    // console.log(characterData.build_tabs)

    return (
        <div className='character-box'>
            <p>{characterData.name}</p>
            <div className='home-box'>
                <p>{characterData.race}</p>
                <span className='inner-flex'>
                    <div className='inside-box-left'>
                        <p>{characterData.level}</p>
                        {<ProfessionInfo professionName={characterData.profession} />}
                    </div>
                    <div className='inside-box-right'>
                        {<EqupmentTabs character={character} />}
                    </div>
                </span>
            </div>
        </div >
    );
}

export default CharacterBox;
