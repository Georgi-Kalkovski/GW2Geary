import { Helmet } from "react-helmet";
import Dragon from '../dragon.svg';
import Cog from '../cog.svg';
import Googly from '../googly-eye.png';
import React from 'react';

function ErrorPage() {
    return (
        <div>
            <Helmet>
                <title>GW2Geary - Error</title>
            </Helmet>
            <div className="flex center">
                <div style={{ position: 'absolute', filter: 'drop-shadow(4px 2px 0px rgba(0, 0, 0, 1))', fontFamily: 'GW2Font', textAlign: 'center', fontSize: '60px' }}>
                    <div >404</div>
                    <div style={{  fontSize: '40px', color: '#aa0404'}}>Page not Found</div>
                </div>
            </div>
            <div className="flex center">
                <div className="logo-loading-div">
                    <img src={Googly} alt="" className="logo-loading-googly" />
                    <img src={Dragon} alt="" className="logo--loading-dragon" />
                    <img src={Cog} alt="" className="logo-loading-cog" />
                </div>
            </div>
        </div>
    );
}

export default ErrorPage;