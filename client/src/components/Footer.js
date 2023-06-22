import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
    const year = new Date().getFullYear();

    return (
        <>
            <footer className='footer'>
                <p className='footer-middle'>
                    <li>
                        <Link className='nav-a' to='/news'>News</Link>
                    </li>
                    <li>
                        <Link className='nav-a' to='/about'>Legal & About</Link>
                    </li>
                    <li>
                        <Link className='nav-a' to='/contacts'>Contacts</Link>
                    </li>
                    {/* <li>
                        <Link className='nav-a' to='/support'>Support Us</Link>
                    </li> */}
                </p>
                <div className='footer-left'>
                    <span>{`© GW2Geary ${year}`}</span>
                </div>
            </footer>

        </>
    );
}

export default Footer;
