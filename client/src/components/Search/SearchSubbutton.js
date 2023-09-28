import React from 'react';
import { wikiBigProfessionIcons } from "../icons";
import { wikiBigRacesColoredIcons } from "../icons";

function SearchSubbutton({ active, text, onClick }) {
    const Icon = wikiBigProfessionIcons[text] ? wikiBigProfessionIcons[text] : wikiBigRacesColoredIcons[text];
    return (
        <button
            className={`${active === text ? 'active' : ''} basic-button-search`}
            onClick={onClick}
        >
            <div>
                <div><img style={{ width: '30px' }} src={Icon} alt={text} /></div>
                <div>{text}</div>
            </div>
        </button>
    );
}

export default SearchSubbutton;
