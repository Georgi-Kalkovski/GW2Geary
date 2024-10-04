import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import Video from './video.png';
import VideoLight from './video2.png';
import Builds from './builds.svg';
import Fashion from './fashion.svg';

function UserGuideVideo() {
    const [playVideo, setPlayVideo] = useState(false);
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

    const handleClick = () => {
        setPlayVideo(true);
    };

    const handleClose = () => {
        setPlayVideo(false);
    };

    return (
        <>
            {playVideo && (
                <div onClick={handleClose} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999 }}>
                    <div style={{ position: 'relative', boxShadow: '0 0 7px 2px rgba(204, 204, 204, 0.5)', zIndex: 10000 }}>
                        {innerWidth < 900
                            ? <iframe style={{ display: 'block', border: 'none' }} width="340" height="169.6" src="https://www.youtube.com/embed/L5Gq026_MIg?si=NoIHXr_c-NVmOVq3" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"></iframe>
                            : <iframe style={{ display: 'block', border: 'none' }} width="840" height="472.5" src="https://www.youtube.com/embed/L5Gq026_MIg?si=NoIHXr_c-NVmOVq3" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"></iframe>
                        }
                    </div>
                </div>
            )}
            {innerWidth < 900 ? (
                <Row className='flex center'>
                    <Col className="home-empty-search-box" style={{ paddingTop: '5px', paddingBottom: '5px' }}>
                        <li style={{ width: 'auto', listStyleType: 'none' }}>
                            <a className='flex align nav-a center' onClick={handleClick} style={{ cursor: 'pointer' }}>
                                <span style={{ fontSize: '1.3em' }}>
                                    User Guide video
                                </span>
                                {isLightTheme === false
                                    ? <img src={Video} style={{ paddingLeft: '10px', marginTop: '-2px', width: "35px", display: "flex" }} alt="" />
                                    : <img src={VideoLight} style={{ paddingLeft: '10px', marginTop: '-2px', width: "35px", display: "flex" }} alt="" />
                                }
                            </a>
                        </li>
                    </Col>
                </Row>
            ) : ('')
            }
            <Container className="flex center">
                {innerWidth < 900 ?
                    ('') : (
                        // <Col className="home-empty-search-box" style={{ paddingTop: '5px', paddingBottom: '5px', width: '15em', marginRight: '0px' }}>
                        <Col className="home-empty-search-box" style={{ paddingTop: '5px', paddingBottom: '5px', maxWidth: '20.9em' }}>
                            <Row className='flex center'>
                                <li style={{ width: 'auto', listStyleType: 'none' }}>
                                    <a className='flex align nav-a' onClick={handleClick} style={{ marginLeft: '20px', cursor: 'pointer' }}>
                                        <span style={{ fontSize: '1.3em' }}>
                                            User Guide video
                                        </span>
                                        {isLightTheme === false
                                            ? <img src={Video} style={{ paddingLeft: '10px', width: "35px", display: "flex" }} alt="" />
                                            : <img src={VideoLight} style={{ paddingLeft: '10px', width: "35px", display: "flex" }} alt="" />
                                        }
                                    </a>
                                </li>
                            </Row>
                        </Col>
                    )}
                {/* <Col className="home-empty-search-box" style={{ paddingTop: '5px', paddingBottom: '5px', width: '12.8em', marginRight: '0px' }}>
                    <Row className='flex center'>
                        <li style={{ width: 'auto', listStyleType: 'none' }}>
                            <a className='flex align nav-a' href='https://guildjen.com/builds/' target="_blank" style={{ marginLeft: '20px', cursor: 'pointer' }}>
                                <span style={{ fontSize: '1.3em' }}>
                                    Builds
                                </span>
                                <img src={Builds} style={{ paddingLeft: '10px', marginTop: '-2px', width: innerWidth < 900 ? "28px" : "30px", display: "flex" }} alt="" />
                            </a>
                        </li>
                    </Row>
                </Col>
                <Col className="home-empty-search-box" style={{ paddingTop: '5px', paddingBottom: '5px', width: '12.8em' }}>
                    <Row className='flex center'>
                        <li style={{ width: 'auto', listStyleType: 'none' }}>
                            <a className='flex align nav-a' href='https://guildjen.com/fashion/' target="_blank" style={{ marginLeft: '20px', cursor: 'pointer' }}>
                                <span style={{ fontSize: '1.3em' }}>
                                    Fashion
                                </span>
                                <img src={Fashion} style={{ paddingLeft: '10px', marginTop: '-2px', width: innerWidth < 900 ? "33px" : "35px", display: "flex" }} alt="" />
                            </a>
                        </li>
                    </Row>
                </Col> */}
            </Container>
        </>
    );
}

export default UserGuideVideo;
