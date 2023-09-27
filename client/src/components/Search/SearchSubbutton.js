import React, { useState } from 'react';

function SearchSubbutton({ active, img, text, onClick }) {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <button
            className={`${active === text ? 'active' : ''} basic-button-search`}
            onClick={onClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {isHovered && active === text
                ? <div style={{fontSize:'35px'}}>✖</div>
                : (
                    <div>
                        <div><img src={img} alt="" /></div>
                        <div>{text}</div>
                    </div>
                )}
        </button>
    );
}

export default SearchSubbutton;
