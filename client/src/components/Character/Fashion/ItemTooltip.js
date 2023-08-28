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
        const fetchWikiContent = async () => {
            try {
                if (item) {
                    const response = await axios.get('https://wiki.guildwars2.com/api.php', {
                        params: {
                            action: 'query',
                            format: 'json',
                            prop: 'revisions',
                            titles: item.skin_name ? item.skin_name : item.name,
                            'prop': 'pageimages',
                            'pithumbsize': 300,
                            origin: '*'
                        }
                    });
                    const pageData = response.data.query.pages;
                    const pageId = Object.keys(pageData)[0];
                    const thumbnail = pageData[pageId].thumbnail;
                    const image = thumbnail.source;
                    if (image) {
                        setImageUrl(image);
                    }
                }
            } catch (error) {
                console.error('Error fetching wiki content:', error);
                try {
                    const response = await axios.get('https://wiki.guildwars2.com/api.php', {
                        params: {
                            action: 'query',
                            format: 'json',
                            prop: 'revisions',
                            titles: item.skin_name ? item.skin_name : item.name,
                            'prop': 'pageimages',
                            'pithumbsize': 300,
                            origin: '*'
                        }
                    });
                    const pageData = response.data.query.pages;
                    const pageId = Object.keys(pageData)[0];
                    const thumbnail = pageData[pageId].thumbnail;
                    const image = thumbnail.source;
                    if (image) {
                        setImageUrl(image);
                    }
                } catch (error) {
                    console.error('Error fetching wiki content:', error);
                    try {
                        const response = await axios.get('https://wiki.guildwars2.com/api.php', {
                            params: {
                                action: 'query',
                                format: 'json',
                                prop: 'revisions',
                                titles: (item.skin_name ? item.skin_name : item.name) + '_Skin',
                                'prop': 'pageimages',
                                'pithumbsize': 300,
                                origin: '*'
                            }
                        });
                        const pageData = response.data.query.pages;
                        const pageId = Object.keys(pageData)[0];
                        const thumbnail = pageData[pageId].thumbnail;
                        const image = thumbnail.source;
                        if (image) {
                            setImageUrl(image);
                        }
                    } catch (error) {
                        console.error('Error fetching wiki content:', error);
                    }
                }
            }
        };

        fetchWikiContent();
    }, [item?.skin_name, item?.name]);

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
