import { useState } from 'react';
import { useFetchData } from '../useFetchData';

function World({ worldName }) {
    const [world, setWorld] = useState([]);
    useFetchData(`worlds/${worldName}`, setWorld);
    return (
        <div className='extra-space'>{world[0] ? world[0].name : <div className="loader"></div>}</div>
    );
}

export default World; 