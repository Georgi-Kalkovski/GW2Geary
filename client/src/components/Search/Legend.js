import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import EventBus from '../../common/EventBus';
import AuthService from '../../services/auth.service';
import './Legend.css'

import Cog from '../../cog.svg';
import Dragon from '../../dragon.svg';

function Legend() {
    const [currentUser, setCurrentUser] = useState(undefined);
    const [newUsername, setNewUsername] = useState("");

    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (user) {
            setCurrentUser(user);
        }

        EventBus.on("logout", () => {
            logOut();
        });

        EventBus.on("usernameChanged", (newUsername) => {
            setNewUsername(newUsername);
        });

        return () => {
            EventBus.remove("logout");
            EventBus.remove("usernameChanged");
        };
    }, []);

    const logOut = () => {
        AuthService.logout();
        setCurrentUser(undefined);
    };

    return (
        <>
            <div className='home-empty-legend-box'>
                <div style={{ fontSize: '1.4em' }}>Site Navigation:</div>
                <br />
                {/* Logo Legend */}
                <div className='flex' style={{ paddingLeft: '2%', flexWrap: 'wrap' }}>
                    {/* Logo */}
                    <Link to={"/search"} className="nav-a">
                        <div className="flex logo-spin">
                            <div style={{ fontFamily: 'GW2Font', fontSize: '30px', color: '#aa0404' }}>GW2</div>
                            <div className="logo-div">
                                <img src={Dragon} alt="" className="logo-dragon" />
                                <img src={Cog} alt="" className="logo-cog" />
                            </div>
                            <div style={{ fontFamily: 'GW2Font', fontSize: '30px' }}>Geary</div>
                        </div>
                    </Link>
                    {/* Text */}
                    <div style={{ color: '#d3d3d3' }}>
                        The <span className='yellow-highlight'>logo</span> directs to this page, the <span className='yellow-highlight'>Search</span> (Home page). </div>
                </div>

                <br />

                {/* Login Register Legend */}
                <div className='flex' style={{ alignItems: 'center', paddingLeft:'5.5%'}}>
                    {currentUser ? (
                        <div className="nav-profile-logout" style={{ paddingRight:'5.5%'}}>
                            <li>
                                <Link to={"/search"} className="nav-a">
                                    Login
                                </Link>
                            </li>
                            <li>
                                <Link to={"/search"} className="nav-a">
                                    Register
                                </Link>
                            </li>
                        </div>
                    ) : (
                        <div className="nav-profile-logout">
                            <li>
                                <Link to={"/login"} className="nav-a">
                                    Login
                                </Link>
                            </li>
                            <li>
                                <Link to={"/register"} className="nav-a">
                                    Register
                                </Link>
                            </li>
                        </div>
                    )}
                    {/* Text */}
                    <div style={{ color: '#d3d3d3' }}>
                        <span className='yellow-highlight'>Non logged </span>
                        in users are able to use
                        <span className='yellow-highlight'> Search</span>
                        ,  <span className='yellow-highlight'>Login </span>
                        and <span className='yellow-highlight'>Register</span>.
                    </div>
                </div>

                <br />

                {/* Profile Logout Legend */}
                <div className='flex' style={{ alignItems: 'center', flexWrap: 'nowrap' }}>

                    <div className="nav-profile-logout" style={{ width: '68%' }}>
                        {currentUser ? (
                            <>
                                <li style={{ paddingRight: '2%' }}>
                                    {`Welcome, `}
                                    <Link to={"/profile"} className="nav-a yellow-highlight">
                                        User
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li style={{ paddingRight: '2%' }}>
                                    {`Welcome, `}
                                    <Link to={"/search"} className="nav-a yellow-highlight">
                                        User
                                    </Link>
                                </li>
                            </>
                        )}
                    </div>
                    {/* Text */}
                    <div style={{ color: '#d3d3d3', textAlign: 'left' }}>
                        <span className='yellow-highlight'>Logged in</span> users can use the
                        <span className='yellow-highlight'> Search</span> and
                        <span className='yellow-highlight'> Profile</span> pages.
                        The <span className='yellow-highlight'> Profile</span> allows you to manipulate the
                        <span className='yellow-highlight'> User</span>'s information
                        (<span className='yellow-highlight'>username </span>
                        , <span className='yellow-highlight'>email</span>
                        , <span className='yellow-highlight'>password</span>
                        , <span style={{ color: '#aa0404' }}>delete</span> of user).
                        And also register multiple
                        <span className='yellow-highlight'> API keys</span>
                        , that can be hidden and deleted.</div>
                </div >
            </div>
        </>
    );
}

export default Legend;