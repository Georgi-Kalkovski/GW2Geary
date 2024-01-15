import React, { useState } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import YouTube from 'react-youtube';
import Video from './video.png';

function UserGuideVideo() {
    const [playVideo, setPlayVideo] = useState(false);

    const opts = {
        height: "400",
        playerVars: {
            autoplay: 1,
            controls: 1,
            origin: 'https://gw2geary.com/'
        },
    };

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
                    <li className='video-body' style={{ width: 'auto', listStyleType: 'none' }}>
                        <a className='flex align nav-a' onClick={handleClick}>
                            <span style={innerWidth < 900 ? { fontSize: '1.3em' } : { fontSize: '1.5em' }}>
                                Watch a User Guide video
                            </span>
                            <img className='video-icon' src={Video} style={{ paddingLeft: '10px', marginTop: '-2px', width: innerWidth < 900 ? "35px" : "50px", display: "flex" }} alt="" />
                            <iframe width="560" height="315" src="https://www.youtube.com/embed/L5Gq026_MIg?si=NoIHXr_c-NVmOVq3" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
                        </a>
                    </li>
                </Row>

                 {playVideo && (
                    <div onClick={handleClose} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999 }}>
                        <div style={{ position: 'relative', zIndex: 10000 }}>
                            <YouTube videoId='L5Gq026_MIg' opts={opts} />
                        </div>
                    </div>
                )}
            </Col>
        </Container>
    );
}

export default UserGuideVideo;
