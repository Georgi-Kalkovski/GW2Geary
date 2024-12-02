import React, { useState, useEffect } from "react";
import { Helmet } from 'react-helmet';
import Image from './img/support.png';
import PulsingHeart from "./PulsingHeart";

function Support() {
    const [isLightTheme, setIsLightTheme] = useState(null);

    const handleThemeChange = () => {
        const isLight = document.body.classList.contains('light-theme');
        setIsLightTheme(isLight);
    };

    useEffect(() => {
        handleThemeChange();

        document.body.addEventListener('click', handleThemeChange);

        return () => {
            document.body.removeEventListener('click', handleThemeChange);
        };
    }, []);

    return (
        <div className="flex center">
            <Helmet>
                <title>GW2Geary - Support Us</title>
            </Helmet>
            <div className='flex center column'>
                <h2 style={{ textAlign: 'center' }}>Support Us</h2>

                {/* Revolut Support Window */}
                <div
                    className={`box-hover ${window.innerWidth < 900 ? 'mobile-rainbow-box' : 'rainbow-box'}`}
                    style={{ marginBottom: '20px', padding: '5px', transform: 'scale(1)' }}
                >
                    <div className='support-box box-hover' style={{ paddingTop: '20px', filter: 'brightness(1)', transform: 'scale(1)' }}>

                        <a href="https://revolut.me/terterbg" target="_blank" style={{ textDecoration: 'none' }}>
                            <div>
                                {isLightTheme === false
                                    ? <img src="https://assets.revolut.com/assets/brand/Revolut-White.svg" alt="Revolut Logo" />
                                    : <img src="https://assets.revolut.com/assets/brand/Revolut-Black.svg" alt="Revolut Logo" />
                                }
                            </div>
                            <div
                                className="nav-a"
                                style={{ paddingTop: '10px', margin: '0px' }}
                            >
                                <span style={{ fontSize: '25px' }}>
                                    revolut.me/terterbg
                                </span>
                                {isLightTheme === false
                                    ? <img style={{ width: '290px', filter: 'invert(0)' }} src={Image} alt="" />
                                    : <img style={{ width: '290px', filter: 'invert(1) brightness(1.2)' }} src={Image} alt="" />
                                }
                                <div style={{ marginTop: '-10px', paddingBottom: '10px', zIndex: '10' }}><PulsingHeart /></div>
                            </div>
                        </a>
                    </div>
                </div>

                {/* Ko-fi Support Window */}
                <div
                    className={`box-hover ${window.innerWidth < 900 ? 'mobile-rainbow-box' : 'rainbow-box'}`}
                    style={{ marginBottom: '20px', padding: '5px', transform: 'scale(1)' }}
                >
                    <div className='support-box box-hover' style={{ paddingTop: '20px', filter: 'brightness(1)', transform: 'scale(1)' }}>

                        <a href="https://ko-fi.com/terterbg" target="_blank" style={{ textDecoration: 'none' }}>
                            <div>
                                <img src="https://storage.ko-fi.com/cdn/logomarkLogo.png" alt="Ko-fi Logo" />
                            </div>
                            <div
                                className="nav-a"
                                style={{ paddingTop: '10px', margin: '0px' }}
                            >
                                <span style={{ fontSize: '25px' }}>
                                    Ko-fi.com/terterbg
                                </span>
                                <br />
                                <br />
                                <div style={{ marginTop: '-10px', paddingBottom: '10px', zIndex: '10' }}><PulsingHeart /></div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Support;
