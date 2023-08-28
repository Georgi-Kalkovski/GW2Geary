import React from 'react';

function WikiImage({ imageUrl }) {
    return (
        <div>
            {imageUrl && <img style={{ maxWidth: '140px', paddingRight: '15px' }} src={imageUrl} alt="Guild Wars 2" />}
        </div>
    );
}

export default WikiImage;