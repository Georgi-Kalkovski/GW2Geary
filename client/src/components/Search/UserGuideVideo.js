import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import Video from './video.png';
import VideoLight from './video2.png';

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
        <Container className="flex center">
            <Col className="home-empty-search-box" style={{ paddingTop: '5px', paddingBottom: '5px' }}>
                <Row className='flex center'>
                    <li style={{ width: 'auto', listStyleType: 'none' }}>
                        <a className='flex align nav-a' onClick={handleClick} style={{ marginLeft: '20px', cursor: 'pointer' }}>
                            <span style={{ fontSize: '1.3em' }}>
                                Watch a User Guide video
                            </span>
                            {isLightTheme === false
                                ? <img src={Video} style={{ paddingLeft: '10px', marginTop: '-2px', width: innerWidth < 900 ? "35px" : "45px", display: "flex" }} alt="" />
                                : <img src={VideoLight} style={{ paddingLeft: '10px', marginTop: '-2px', width: innerWidth < 900 ? "35px" : "45px", display: "flex" }} alt="" />
                            }
                        </a>
                    </li>
                </Row>

                {playVideo && (
                    <div onClick={handleClose} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999 }}>
                        <div style={{ position: 'relative', zIndex: 10000 }}>
                            {innerWidth < 900
                                ? <iframe style={{ display: 'block', border: 'none' }} width="340" height="169.6" src="https://www.youtube.com/embed/L5Gq026_MIg?si=NoIHXr_c-NVmOVq3" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
                                : <iframe style={{ display: 'block', border: 'none' }} width="840" height="472.5" src="https://www.youtube.com/embed/L5Gq026_MIg?si=NoIHXr_c-NVmOVq3" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
                            }
                        </div>
                    </div>
                )}
            </Col>
        </Container>
    );
}

export default UserGuideVideo;
