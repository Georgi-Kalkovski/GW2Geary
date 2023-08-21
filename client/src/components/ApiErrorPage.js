import Dragon from '../dragon.svg';
import Cog from '../cog.svg';
import Googly from '../googly-eye.png';
import React from 'react';

function ApiErrorPage({ isErrorPage }) {
    return (
        <div style={isErrorPage ? { position: 'absolute', transform: 'translate(0%, -75%)', marginTop: '-50px', marginLeft: '25px' } : {}}>

            <div className="flex center">
                <div style={isErrorPage
                    ? { filter: 'drop-shadow(4px 2px 0px rgba(0, 0, 0, 1))', paddingTop: '50px', fontFamily: 'GW2Font', textAlign: 'center', fontSize: '60px', transform: 'translate(0%, 75%)' }
                    : { position: 'absolute', filter: 'drop-shadow(4px 2px 0px rgba(0, 0, 0, 1))', paddingTop: '-50px', fontFamily: 'GW2Font', textAlign: 'center', fontSize: '60px' }}>
                    <div >API</div>
                    <div style={isErrorPage ? { fontSize: '40px', color: '#aa0404' } : { fontSize: '50px', color: '#aa0404' }}>Not Working</div>
                </div>
            </div>
            <div className="flex center" style={isErrorPage ? { marginTop: '-40px' } : {}}>
                <div className="logo-loading-div">
                    <img src={Googly} alt="" className="logo-loading-googly" />
                    <img src={Dragon} alt="" className="logo--loading-dragon" />
                    <img src={Cog} alt="" className="logo-loading-cog" />
                </div>
            </div>
        </div >
    );
}

export default ApiErrorPage;