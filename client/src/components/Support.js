import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet';
import Image from './img/support.png';

function Support() {
    return (
        <div className="flex center">
            <Helmet>
                <title>GW2Geary - Support Us</title>
            </Helmet>
            <div className='flex center column'>
                <h2 style={{ textAlign: 'center' }}>Support Us</h2>
                <div className='support-box' style={{ justifyContent: 'right', marginBottom: '20px', paddingTop: '20px', overflow: 'auto' }}>
                    <img src="https://assets.revolut.com/assets/brand/Revolut-White.svg" alt="Revolut Logo" />
                    <a
                        className="nav-a box-hover"
                        style={{ color: 'white', paddingTop: '10px', fontSize: '25px' }}
                        href="https://revolut.me/terterbg"
                        target="_blank"
                        onMouseEnter={(e) => e.target.style.color = 'red'}
                        onMouseLeave={(e) => e.target.style.color = 'white'}
                    >
                        @terterbg
                    </a>
                    <a href="https://revolut.me/terterbg" target="_blank">
                        <img className="box-hover" style={{ width: '290px' }} src={Image} alt="" />
                    </a>
                    <span style={{ marginTop: '-20px', paddingBottom: '10px', zIndex:'10' }}>Thank you! ❤️</span>
                </div>

            </div>
        </div >
    );
}

export default Support;