import { useState, useEffect } from 'react';
import fetchData from '../fetchData';
import './ItemBox.css';

function ItemBox({ itemInput }) {
    const [item, setItem] = useState([]);
    useEffect(() => {
        const fetchCharacter = async () => {
            // use 'skins' or 'items'
            if (itemInput) {
                if (itemInput[1]) {
                    const item = await fetchData('skins', itemInput[1]);
                    setItem(item);
                } else {
                    const item = await fetchData('items', itemInput[0]);
                    setItem(item);
                }
            }
        };
        fetchCharacter();
    }, []);
    return (
        <>
            {<div><img className="item-box" src={item.icon} alt="" /></div>}
        </>
    );
}

export default ItemBox;

