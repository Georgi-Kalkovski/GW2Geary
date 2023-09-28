import React from 'react';

function SearchSubbutton({ active, img, text, onClick }) {
    return (
        <button
            className={`${active === text ? 'active' : ''} basic-button-search`}
            onClick={onClick}
        >
            <div>
                <div><img src={img} alt="" /></div>
                <div>{text}</div>
            </div>
        </button>
    );
}

export default SearchSubbutton;
