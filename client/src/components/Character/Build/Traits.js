import { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import Popup from 'reactjs-popup';
import fetchData from '../../fetchData';

function Traits({ trait }) {
    const [traits, setTraits] = useState(null);

    useEffect(() => {
        const fetchTraits = async () => {
            const fetchedTraits = await Promise.all(
                trait.map((t) => fetchData('traits', t))
            );
            setTraits(fetchedTraits);
        };
        fetchTraits();
    }, []);
    console.log(traits)
    return (
        <>
            {traits && traits.map((trait) => (
                <>
                    <img className='minor-trait-icon' src={trait.icon} alt={trait.name} />
                </>
            ))}
        </>
    );
}
export default Traits;