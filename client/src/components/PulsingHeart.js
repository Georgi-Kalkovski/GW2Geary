// PulsingHeart.js
import React from 'react';
import './PulsingHeart.css';

const PulsingHeart = () => {
    return (
        <div className="heart-message">
            <span>Thank you!</span>
            <span className="pulsing-heart" style={{ marginLeft: '5px', display: 'inline-block' }}>
                {/* ❤ */}
                ❤️
            </span>
        </div>
    );
};

export default PulsingHeart;
