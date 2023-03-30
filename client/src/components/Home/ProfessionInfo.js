import { useState } from 'react';
import { useFetchData } from '../useFetchData';

function ProfessionInfo({ professionName }) {
    const [profession, setProfession] = useState([]);
    useFetchData(`professions/${professionName}`, setProfession);
    return (
        <>
        <img src={profession.icon} alt={profession} />
        </>
    );
}

export default ProfessionInfo; 