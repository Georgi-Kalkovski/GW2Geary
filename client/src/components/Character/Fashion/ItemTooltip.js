import React, { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import { usePopperTooltip } from 'react-popper-tooltip';
import Link from '../link.svg';
import WikiImage from './WikiImage';
import axios from 'axios';
import { gearIcons } from '../../icons';

function ItemTooltip({ item, gear, embed }) {
    // console.log('item ', item)

    const [imageUrl, setImageUrl] = useState('');

    const prof = localStorage.getItem('prof').toLowerCase();
    const race = localStorage.getItem('race').toLowerCase();
    const gender = localStorage.getItem('gender').toLowerCase();

    let weight = '';

    const professionWeights = {
        'warrior': 'heavy',
        'guardian': 'heavy',
        'revenant': 'heavy',
        'ranger': 'medium',
        'thief': 'medium',
        'engineer': 'medium',
        'elementalist': 'light',
        'necromancer': 'light',
        'mesmer': 'light',
    };

    weight = professionWeights[prof] || '';

    useEffect(() => {
        const fetchWikiImage = async (title) => {
            try {
                const response = await axios.get('https://wiki.guildwars2.com/api.php', {
                    params: {
                        action: 'query',
                        format: 'json',
                        prop: 'revisions',
                        titles: title,
                        prop: 'pageimages',
                        pithumbsize: 300,
                        origin: '*'
                    }
                });
                const pageData = response.data.query.pages;
                const pageId = Object.keys(pageData)[0];
                const thumbnail = pageData[pageId].thumbnail;
                if (thumbnail.source) {
                    setImageUrl(thumbnail.source);
                }
            } catch (error) {
                // Handle errors here
            }
        };

        const fetchItemImage = async (title) => {

            try {
                const response = await axios.get('https://wiki.guildwars2.com/api.php', {
                    params: {
                        action: 'query',
                        format: 'json',
                        prop: 'revisions',
                        titles: title,
                        prop: 'images',
                        pithumbsize: 300,
                        origin: '*'
                    }
                });
                const pageData = response.data.query.pages;
                const image = Object.values(pageData)[0].images?.find(x => x.title.includes('armor') || x.title.includes('weapon')).title;
                if (image) {
                    await fetchWikiImage(image);
                }
            } catch (error) {
                // Handle errors here
            }
        };

        const fetchItemImages = async () => {
            if (item) {
                const original = item.skin_name || item.name;
                const skin = `${original} Skin`;
                const weigthItem = `${original} (${weight})`;
                const armor = `${original.split(' ').slice(0, -1).join(' ')} armor`;
                const armorWeigth = `${original.split(' ').slice(0, -1).join(' ')} armor (${weight})`;
                const raceGender = `${original} (${weight}) ${race} ${gender} front`;
                const armorRaceGender = `${original.split(' ').slice(0, -1).join(' ')} armor (${weight}) ${race} ${gender} front`;

                await fetchWikiImage(armorRaceGender);
                await fetchWikiImage(raceGender);
                await fetchWikiImage(armorWeigth);
                await fetchWikiImage(armor);
                await fetchWikiImage(weigthItem);
                await fetchWikiImage(skin);
                await fetchWikiImage(original);

                await fetchItemImage(skin);
                await fetchItemImage(original);
            }
        };

        fetchItemImages();
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
                                <button className='wiki-button' style={{ marginTop: '20px' }} onClick={handleButtonClick}>Wiki<img src={Link} alt="" /></button>

                            }
                            {item.skin_name &&
                                <div>
                                    <button className='wiki-button' style={{ marginTop: '20px' }} onClick={handleButtonSkinClick}>Wiki<img src={Link} alt="" /></button>
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
                : (gearIcons[gear]
                    ? <img className="item-box box-gray" style={{ width: '50px', height: '50px' }} src={gearIcons[gear]} alt={gear} />
                    : ''
                )
            }
        </React.Fragment>
    );
}

export default ItemTooltip;
