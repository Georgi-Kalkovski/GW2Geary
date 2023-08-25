import React, { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import { usePopperTooltip } from 'react-popper-tooltip';
import Link from '../link.svg';
import WikiImage from './WikiImage';
import axios from 'axios';

function ItemTooltip({ item, embed }) {
    // console.log('item ', item)

    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        const fetchImageUrl = async () => {
            try {
                const proxyUrl = 'https://gw2geary.com/api/fetch-url';
                const targetUrl = `https://wiki.guildwars2.com/wiki/${encodeURIComponent(item.skin_name ? item.skin_name : item.name)}`;

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
        };

        fetchImageUrl();
    }, [item]);

    const {
        getArrowProps,
        getTooltipProps,
        setTooltipRef,
        setTriggerRef,
        visible,
    } = usePopperTooltip({ placement: 'top' });

    const [showWikiButton, setShowWikiButton] = useState(false);

    const handleButtonClick = (event) => {
        event.preventDefault();

        window.open(`https://wiki.guildwars2.com/wiki/${item.name}`, '_blank');
    };

    const handleButtonSkinClick = (event) => {
        event.preventDefault();

        window.open(`https://wiki.guildwars2.com/wiki/${item.skin_name}`, '_blank');
    };

    const handleLeftClick = (event) => {
        setShowWikiButton(true);
    };

    return (
        <React.Fragment key={item?.id}>
            {visible && (
                <div
                    ref={setTooltipRef}
                    {...getTooltipProps({ className: 'tooltip-container pointer' })
                    }
                >
                    <Container className={`item-popup`} style={{ boxShadow: '0 0 7px 2px rgba(204, 204, 204, 0.3)' }}>
                        {/* NAME */}
                        <Row key={`name-${item.id}`}>
                            {item.skin_name
                                ? <span className='item-name'>{item.skin_name}</span>
                                : <span className='item-name'>{item.name ? item.name : 'Unknown'}</span>
                            }
                        </Row>

                        <br />

                        {/* WikiImage HERE */}
                        {embed !== true &&
                            <WikiImage imageUrl={imageUrl} />
                        }

                        {/* WEIGHT & TYPE */}
                        <div>{item.details ? item.details.weight_class : ''} {item.details ? (item.details.type ? item.details.type : item.slot) : ''}</div>

                    </Container>

                    <div {...getArrowProps({ className: 'tooltip-arrow' })} />
                </div>
            )}
            {item
                ?
                <div ref={setTriggerRef}
                    onClick={handleLeftClick}
                    onMouseLeave={() => setShowWikiButton(false)}>
                    {showWikiButton && embed !== true &&
                        <div className='flex column' style={{ marginLeft: '2px' }}>
                            {!item.skin_name &&
                                <button className='wiki-button basic-button' style={{ marginTop: '20px' }} onClick={handleButtonClick}>Wiki<img src={Link} alt="" /></button>

                            }
                            {item.skin_name &&
                                <div>
                                    <button className='wiki-button basic-button' style={{ marginTop: '20px' }} onClick={handleButtonSkinClick}>Wiki<img src={Link} alt="" /></button>
                                </div>
                            }
                        </div>
                    }
                    {/* ITEM ICON */}
                    {item.skin_icon && item.skin_name
                        ? <img className={`item-box box-gray`} src={item.skin_icon} alt={item.skin_icon}
                            style={{ cursor: 'pointer' }} />
                        : <img className={`item-box box-gray`} src={item.icon} alt={item.icon}
                            style={{ cursor: 'pointer' }} />
                    }
                </div>
                : ''
            }
        </React.Fragment>
    );
}

export default ItemTooltip;
