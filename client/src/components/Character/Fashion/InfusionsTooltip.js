import React, { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import { usePopperTooltip } from 'react-popper-tooltip';
import Link from '../link.svg';
import WikiImage from './WikiImage';
import axios from 'axios';
import Cog from '../../../cog.svg';
import Dragon from '../../../dragon.svg';

function InfusionTooltip({ infusion, leng, embed }) {
    // console.log('item ', item)

    const [imageUrl, setImageUrl] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWikiContent = async () => {
            try {
                setLoading(true);
                if (infusion) {
                    const response = await axios.get('https://wiki.guildwars2.com/api.php', {
                        params: {
                            action: 'query',
                            format: 'json',
                            prop: 'revisions',
                            titles: infusion.skin_name ? infusion.skin_name : infusion.name,
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
                        setLoading(false);
                    }
                }
            } catch (error) {
                console.error('Error fetching wiki content:', error);
            }
        };

        fetchWikiContent();
    }, [infusion?.skin_name, infusion?.name]);


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
                    <Container className={`item-popup item-popup-fashion`} style={{ boxShadow: '0 0 7px 2px rgba(204, 204, 204, 0.3)' }}>
                        {/* NAME */}
                        <Row key={`name-${infusion.id}`}>
                            {infusion.skin_name
                                ? <span className='item-name'>{infusion.skin_name}</span>
                                : <span className='item-name'>{infusion.name ? infusion.name : 'Unknown'}</span>
                            }
                        </Row>

                        {/* Check if loading */}
                        {loading ? (
                            <div style={{ height: '-50px' }}>
                                <div className="flex logo-spin logo-spin-loading">
                                    <div className="logo-div">
                                        <img src={Dragon} alt="" className="logo-dragon logo-dragon-loading" style={{ marginTop: '23px' }} />
                                        <img src={Cog} alt="" className="logo-cog logo-cog-loading" />
                                    </div>
                                </div>
                                Loading...</div>
                        ) : (
                            /* WikiImage HERE */
                            (embed !== true && <WikiImage imageUrl={imageUrl} />)
                        )}

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
                                <button className='wiki-button' onClick={handleButtonClick}>Wiki<img src={Link} alt="" /></button>

                            }
                            {infusion.skin_name &&
                                <div>
                                    <button className='wiki-button' style={{ marginTop: '20px' }} onClick={handleButtonSkinClick}>Wiki<img src={Link} alt="" /></button>
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

export default InfusionTooltip;
