import React from 'react';
import { wikiBigProfessionIcons, wikiBigRacesColoredIcons, genderIcons } from "../icons";

function SearchSubbutton({ active, text, onClick }) {
    const Icon = wikiBigProfessionIcons[text] || wikiBigRacesColoredIcons[text] ? (wikiBigProfessionIcons[text] ? wikiBigProfessionIcons[text] : wikiBigRacesColoredIcons[text]) : genderIcons[text];
    return (
        <button
            className={`${active === text ? 'active' : ''} basic-button-search accounts-hover`}
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
