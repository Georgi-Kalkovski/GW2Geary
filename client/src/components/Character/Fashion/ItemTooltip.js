import React, { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import { usePopperTooltip } from 'react-popper-tooltip';
import Link from '../link.svg';
import WikiImage from './WikiImage';
import axios from 'axios';
import { gearIcons } from '../../icons';

function ItemTooltip({ char, auraCounter, item, gear, embed }) {
    // console.log('item ', item)

    const [imageUrl, setImageUrl] = useState(null);
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

    const prefixes = [
        "Apostate's", "Apothecary's", "Assassin's", "Berserker's",
        "Bringer's", "Captain's", "Carrion", "Cavalier's",
        "Celestial", "Cleric's", "Dire", "Forsaken",
        "Giver's", "Knight's", "Magi's", "Nomad's",
        "Rabid", "Rampager's", "Sentinel's", "Settler's",
        "Shaman's", "Sinister", "Soldier's", "Valkyrie",
        "Zealot's", "Commander's", "Crusader", "Marauder",
        "Minstrel's", "Seraph", "Trailblazer's", "Vigilant",
        "Viper's", "Wanderer's", "Diviner's", "Grieving",
        "Harrier's", "Marshal's", "Plaguedoctor's", "Dragon's", "Ritualist's"
    ];

    weight = professionWeights[char?.profession.toLowerCase()] || '';
    const race = char?.race.toLowerCase();
    const gender = char?.gender.toLowerCase();
    useEffect(() => {
        const fetchWikiImage = async (title) => {
            if (title) {
                // Legendary Trinkets Check
                if (
                    title === 'Aurora' ||
                    title === 'Vision' ||
                    title === 'Coalescence' ||
                    title === "Prismatic Champion's Regalia" ||
                    title === 'Transcendence' ||
                    title === 'Conflux'
                ) {
                    if (auraCounter === 1) { setImageUrl('https://wiki.guildwars2.com/images/c/c0/One_legendary_trinket_drawn.jpg') }
                    if (auraCounter === 2) { setImageUrl('https://wiki.guildwars2.com/images/9/99/Two_legendary_trinkets_drawn.jpg') }
                    if (auraCounter === 3) { setImageUrl('https://wiki.guildwars2.com/images/2/28/Three_legendary_trinkets_drawn.jpg') }
                    if (title === "Prismatic Champion's Regalia") { setImageUrl('https://wiki.guildwars2.com/images/8/87/Prismatic_Champion%27s_Regalia.gif') }
                    if (title === "Transcendence") { setImageUrl('https://wiki.guildwars2.com/images/a/a1/Transcendence.gif') }
                    if (title === "Conflux") { setImageUrl('https://wiki.guildwars2.com/images/7/73/Conflux.jpg') }
                } else {
                    try {
                        // Armor Check
                        if (
                            gear === 'Helm' ||
                            gear === 'Shoulders' ||
                            gear === 'Coat' ||
                            gear === 'Gloves' ||
                            gear === 'Leggings' ||
                            gear === 'Boots'
                        ) {
                            const titleSkin = title + ' Skin';
                            const titleNoWeight = title.replace(/Heavy |Medium |Light /g, '');
                            const titleArmor = title.split(' ').length > 1 ? title.replace(/ [^ ]*$/, ' armor') : 'armor';
                            const removeFirstFromTitle = title.replace(/^(\S+\s+)/, "");
                            const removeFirstFromTitleArmor = removeFirstFromTitle.split(' ').length > 1 ? removeFirstFromTitle.replace(/ [^ ]*$/, ' armor') : 'armor';

                            const gearNames = [
                                `${removeFirstFromTitleArmor} (${weight}) ${race} ${gender} front in combat`,
                                `${removeFirstFromTitleArmor} (${weight}) ${race} ${gender} front`,
                                `${removeFirstFromTitle} (${weight}) ${race} ${gender} front in combat`,
                                `${removeFirstFromTitleArmor} ${race} ${gender} front`,
                                `${removeFirstFromTitleArmor}`,
                                `${removeFirstFromTitle} (${weight}) ${race} ${gender} front`,
                                `${titleArmor} (${weight}) ${race} ${gender} front in combat`,
                                `${titleArmor} (${weight}) ${race} ${gender} front`,
                                `${titleArmor} ${race} ${gender} front in combat`,
                                `${titleArmor} ${race} ${gender} front`,
                                `${titleArmor}`,
                                `${titleSkin} ${race} ${gender}`,
                                `${titleSkin}`,
                                `${title}`,
                                `${titleNoWeight}`
                            ];

                            for (let i = 0; i < prefixes.length; i++) {
                                gearNames.push(`${prefixes[i]} ${title}`);
                            }

                            // console.log(title, gearNames);

                            let itemFound = false;

                            for (const gearName of gearNames) {
                                if (itemFound) {
                                    break;
                                }

                                const jpgFound = await axios.get('https://wiki.guildwars2.com/api.php', {
                                    params: {
                                        action: 'query',
                                        format: 'json',
                                        prop: 'imageinfo',
                                        iiprop: 'url',
                                        titles: 'File:' + gearName + '.jpg',
                                        iiurlwidth: 200,
                                        origin: '*',
                                    },
                                });

                                const jpgPage = jpgFound.data.query.pages;

                                if (Object.keys(jpgPage)[0] !== '-1') {
                                    setImageUrl(Object.values(jpgPage)[0].imageinfo[0].url);
                                    itemFound = true;
                                }
                            } if (itemFound === false) {
                                const gearFound = await axios.get('https://wiki.guildwars2.com/api.php', {
                                    params: {
                                        action: 'query',
                                        format: 'json',
                                        prop: 'images',
                                        titles: title,
                                        pithumbsize: 300,
                                        imlimit: 5,
                                        origin: '*'
                                    }
                                });
                                const gearPage = gearFound.data.query.pages;
                                if (Object.keys(gearPage)[0] !== '-1') {
                                    const gearImages = Object.values(gearFound.data.query.pages)[0].images;
                                    console.log(gearImages[1]?.title.replace('.png', '.jpg'))
                                    const imagesNew = gearImages[1]?.title.replace('.png', '.jpg')
                                    const imageUrl = await axios.get('https://wiki.guildwars2.com/api.php', {
                                        params: {
                                            action: 'query',
                                            format: 'json',
                                            prop: 'imageinfo',
                                            iiprop: 'url',
                                            titles: imagesNew,
                                            pithumbsize: 300,
                                            origin: '*'
                                        }
                                    });
                                    setImageUrl(Object.values(imageUrl.data.query.pages)[0].imageinfo[0].url)
                                }
                            }
                        }
                        // Weapons/Backpack Check
                        else {
                            const gearFound = await axios.get('https://wiki.guildwars2.com/api.php', {
                                params: {
                                    action: 'query',
                                    format: 'json',
                                    prop: 'images',
                                    titles: title,
                                    pithumbsize: 300,
                                    imlimit: 150,
                                    origin: '*'
                                }
                            });
                            const gearPage = gearFound.data.query.pages;
                            if (Object.keys(gearPage)[0] !== '-1') {
                                const gearImages = Object.values(gearFound.data.query.pages)[0].images;
                                const imagesNew = gearImages.filter(i =>
                                    !i.title.includes('.png')
                                );
                                const filteredImageFile = imagesNew[0].title;
                                const imageUrl = await axios.get('https://wiki.guildwars2.com/api.php', {
                                    params: {
                                        action: 'query',
                                        format: 'json',
                                        prop: 'imageinfo',
                                        iiprop: 'url',
                                        titles: filteredImageFile,
                                        pithumbsize: 300,
                                        origin: '*'
                                    }
                                });
                                setImageUrl(Object.values(imageUrl.data.query.pages)[0].imageinfo[0].url)
                            }
                        }
                    } catch (error) {
                        console.log(error)
                    }
                }
            }
        };

        fetchWikiImage(item?.skin_name ? item?.skin_name : item?.name);
    }, [auraCounter, char, item?.skin_name, item?.name]);

    const {
        getArrowProps,
        getTooltipProps,
        setTooltipRef,
        setTriggerRef,
        visible,
    } = usePopperTooltip(window.innerWidth < 900 ? { placement: 'top' } : { placement: 'right' });

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
                    <Container className={`item-popup item-popup-fashion`} style={{ boxShadow: '0 0 7px 2px rgba(204, 204, 204, 0.3)' }}>
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
