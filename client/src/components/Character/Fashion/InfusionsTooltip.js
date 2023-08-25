import React, { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import { usePopperTooltip } from 'react-popper-tooltip';
import Link from '../link.svg';
import WikiImage from './WikiImage';

function ItemTooltip({ infusion, leng, embed }) {
    // console.log('item ', item)

    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        const fetchImageUrl = async () => {
            if (infusion) {
                try {
                    const proxyUrl = 'https://gw2geary/api/fetch-url';
                    const targetUrl = `https://wiki.guildwars2.com/wiki/${encodeURIComponent(infusion.skin_name ? infusion.skin_name : infusion.name)}`;

                    const response = await fetch(`${proxyUrl}?url=${encodeURIComponent(targetUrl)}`);
                    const html = await response.text();

                    const regex = /<a[^>]*class=["']image["'][^>]*>.*?<img[^>]*src=["'](.*?)["'][^>]*>.*?<\/a>/ig;
                    const matches = [...html.matchAll(regex)];

                    if (matches.length >= 2) {
                        const secondMatch = matches[1];
                        const imgSrc = secondMatch[1];
                        setImageUrl(`https://wiki.guildwars2.com` + imgSrc);
                    }
                } catch (error) {
                    console.error('Error fetching HTML:', error);
                }
            }
        };

        fetchImageUrl();
    }, [infusion]);


    const {
        getArrowProps,
        getTooltipProps,
        setTooltipRef,
        setTriggerRef,
        visible,
    } = usePopperTooltip({ placement: 'right' });

    const [showWikiButton, setShowWikiButton] = useState(false);

    const handleButtonClick = (event) => {
        event.preventDefault();

        window.open(`https://wiki.guildwars2.com/wiki/${infusion.name}`, '_blank');
    };

    const handleButtonSkinClick = (event) => {
        event.preventDefault();

        window.open(`https://wiki.guildwars2.com/wiki/${infusion.skin_name}`, '_blank');
    };

    const handleLeftClick = (event) => {
        setShowWikiButton(true);
    };

    return (
        <React.Fragment key={infusion?.id}>
            {visible && (
                <div
                    ref={setTooltipRef}
                    {...getTooltipProps({ className: 'tooltip-container pointer' })}
                >
                    <Container className={`item-popup`} style={{ boxShadow: '0 0 7px 2px rgba(204, 204, 204, 0.3)' }}>
                        {/* NAME */}
                        <Row key={`name-${infusion.id}`}>
                            {infusion.skin_name
                                ? <span className='item-name'>{infusion.skin_name}</span>
                                : <span className='item-name'>{infusion.name ? infusion.name : 'Unknown'}</span>
                            }
                        </Row>

                        {embed !== true &&
                            <WikiImage imageUrl={imageUrl} />
                        }

                    </Container>

                    <div {...getArrowProps({ className: 'tooltip-arrow' })} />
                </div>
            )}
            {infusion
                ?
                <div ref={setTriggerRef}
                    onClick={handleLeftClick}
                    onMouseLeave={() => setShowWikiButton(false)}>
                    {showWikiButton && embed !== true &&
                        <div className='flex column' style={{ marginLeft: '2px' }}>
                            {!infusion.skin_name &&
                                <button className='wiki-button basic-button' onClick={handleButtonClick}>Wiki<img src={Link} alt="" /></button>

                            }
                            {infusion.skin_name &&
                                <div>
                                    <button className='wiki-button basic-button' style={{ marginTop: '20px' }} onClick={handleButtonSkinClick}>Wiki<img src={Link} alt="" /></button>
                                </div>
                            }
                        </div>
                    }
                    {/* ITEM ICON */}
                    {leng > 7
                        ? (infusion.skin_icon && infusion.skin_name
                            ? <img className={`infusion-box box-infusion`} src={infusion.skin_icon} alt={infusion.skin_icon}
                                style={{ cursor: 'pointer' }} />
                            : <img className={`infusion-box box-infusion`} src={infusion.icon} alt={infusion.icon}
                                style={{ cursor: 'pointer' }} />
                        ) : (infusion.skin_icon && infusion.skin_name
                            ? <img className={`infusion-box-big box-infusion`} src={infusion.skin_icon} alt={infusion.skin_icon}
                                style={{ cursor: 'pointer' }} />
                            : <img className={`infusion-box-big box-infusion`} src={infusion.icon} alt={infusion.icon}
                                style={{ cursor: 'pointer' }} />)
                    }
                </div>
                : ''
            }
        </React.Fragment>
    );
}

export default ItemTooltip;
