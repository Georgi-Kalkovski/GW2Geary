import React from 'react';

function PowerCore({ powerCore }) {
    return (<>
        <div className="itemstat">
            <span className="yellow-highlight">Power Core</span>:
            {powerCore
                ? <span className="itemname"> {powerCore.name}</span>
                : <span span className="itemname" style={{ color: '#ff1e1e' }}>Missing power core</span>
            }
        </div>
    </>)
}

export default PowerCore;