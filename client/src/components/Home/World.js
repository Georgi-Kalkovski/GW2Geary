import { useState } from 'react';
import { useFetchData } from '../useFetchData';

function World({ worldName }) {
    const [world, setWorld] = useState([]);
    useFetchData(`http://localhost:3001/api/worlds/${worldName}`, setWorld);
    return (
        <div className='extra-space'>{world[0] ? world[0].name : <div className="loader"></div>}</div>
    );
}

export default World; 