import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { usePopperTooltip } from 'react-popper-tooltip';
import Link from '../link.svg';
import { gearIcons } from '../../icons';

function ItemTooltipSaved({ item, gear, slider }) {
    console.log('item ', item)
    if (item.itemstats && item.stats) {
        console.log('stat ', item.stats)
        const stats = item.itemstats?.find(st => st.id === item.stats?.[0])
        console.log('stats', stats)
    }
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

        window.open(`https://wiki.guildwars2.com/wiki/${item.name}`, '_blank');
    };

    const handleButtonSkinClick = (event) => {
        event.preventDefault();

        window.open(`https://wiki.guildwars2.com/wiki/${item.skin_name}`, '_blank');
    };

    const handleLeftClick = (event) => {
        if (showWikiButton) {
            setShowWikiButton(false);
        } else {
            setShowWikiButton(true);
        }
    };

    return (
        <React.Fragment key={item?.id}>
            {visible && (
                <div
                    ref={setTooltipRef}
                    {...getTooltipProps({ className: 'tooltip-container pointer' })}
                >
                    <Container className={`item-popup border-${item.rarity ? item.rarity.toLowerCase() : 'unknown'}`}>
                        {/* NAME */}
                        <Row key={`name-${item.id}`} className={`name-${item.rarity ? item.rarity.toLowerCase() : 'unknown'}`}>
                            {item.skin_name && slider
                                ? <span className='item-name'>{item.skin_name}</span>
                                : <span className='item-name'>{item.name ? item.name : 'Unknown'}</span>
                            }
                        </Row>

                        <br />
                        {/* RELIC & POWER CORE &  */}
                        {['Relic', 'PowerCore'].includes(item.type) &&
                            <div>
                                {(() => {
                                    const bonus = item.description
                                        .replace('</c>', '')
                                        .replace('</br>', '')
                                        .replace('<br>', '')
                                        .split('<c=@reminder>')
                                        .slice(0, 2);
                                    return (
                                        <>
                                            <span className='upgrade-blue'>{bonus[0]}</span>
                                            <br />
                                            <span className='upgrade-gray'>{bonus[1]}</span>
                                        </>
                                    );
                                })()}
                            </div>
                        }

                        {/* DEFENSE */}
                        {item.details && item.details.defense !== 0 && item.details.defense &&
                            <>
                                <Row key={`defense-${item.id}`}>
                                    Defense: <span className='green'>{item.details.defense}</span>
                                </Row>
                                <br />
                            </>
                        }

                        {/* POWER */}
                        {item.details && item.details.min_power && item.details.max_power &&
                            <>
                                <Row key={`power-${item.details.min_power}${item.details.max_power}`}>
                                    Weapon Strength: <span className='green'>{item.details.min_power} - {item.details.max_power}</span>
                                </Row>
                                <br />
                            </>
                        }

                        <Container className='flex'>
                            {/* STATS */}
                            <Col style={{ width: '110px' }}>
                                {/* {item.stats && item.itemstats?.find(is => is.id === item.stats?.id)?.name.split('\'')[0] + ':'}
                                {item.itemstats
                                    && item.details
                                    && item.details.infix_upgrade
                                    && item.itemstats.find(is => is.id === item.details.infix_upgrade.id)?.name.split('\'')[0] &&
                                    <span>
                                        {item.itemstats?.find(is => is.id === item.details?.infix_upgrade?.id)?.name.split('\'')[0]}:</span>
                                } */}
                                {item.stats && Object.keys(item.stats.attributes).map((stat, index) => (
                                    <Row key={`attributes-${item.id}-${index}`}>
                                        <span className='green'>
                                            + {item.stats.attributes[stat]}
                                            {(() => {
                                                if (stat === 'CritDamage') { stat = 'Ferocity' }
                                                if (stat === 'ConditionDamage') { stat = 'Condition Damage' }
                                                if (stat === 'ConditionDuration') { stat = 'Expertise' }
                                                if (stat === 'BoonDuration') { stat = 'Concentration' }
                                            })()}
                                            <span> {stat}</span>
                                        </span>
                                    </Row>
                                ))}
                                {item.details && item.details.infix_upgrade && item.details.infix_upgrade.attributes &&
                                    Object.keys(item.details.infix_upgrade.attributes).map((index) => {
                                        let modifier = item.details.infix_upgrade.attributes[index].modifier;
                                        let attribute = item.details.infix_upgrade.attributes[index].attribute;
                                        return (
                                            <Row key={`attributes-${item.id}-${index}`}>
                                                <span className='green'>
                                                    {attribute && `+ ${modifier}`}
                                                    {(() => {
                                                        if (attribute === 'CritDamage') { attribute = 'Ferocity' }
                                                        if (attribute === 'ConditionDamage') { attribute = 'Condition Damage' }
                                                        if (attribute === 'ConditionDuration') { attribute = 'Expertise' }
                                                        if (attribute === 'BoonDuration') { attribute = 'Concentration' }
                                                    })()}
                                                    {attribute && <span> {attribute}</span>}
                                                </span>
                                            </Row>
                                        );
                                    })}
                            </Col>

                            {/* Dyes */}
                            {item.dyes && (
                                <Col >
                                    {item.dyes.map((dye, index) => (
                                        <Row key={index} >
                                            {dye != null
                                                ? <div className='flex'>
                                                    <div style={{
                                                        margin: '1px 5px 1px 15px',
                                                        height: '15px',
                                                        width: '15px',
                                                        border: '0.2px solid gray',
                                                        backgroundColor: `rgb(${dye.cloth.rgb[0]}, ${dye.cloth.rgb[1]}, ${dye.cloth.rgb[2]})`
                                                    }}>
                                                    </div>
                                                    <span>{dye.name}</span>
                                                </div>
                                                : ''
                                            }</Row>
                                    ))}
                                </Col>
                            )}
                        </Container>
                        <br />

                        {/* UPGRADES */}
                        {item.upgrades && item.upgrades.map((upgrade, index) => (
                            <Row key={`upgrade-${upgrade.id}-${index}`}>
                                <img src={upgrade.icon} width="20" alt={upgrade.icon} />
                                <span className='upgrade-blue'> {upgrade.name}</span>

                                {/* Runes */}
                                {
                                    upgrade.details &&
                                    upgrade.details.bonuses &&
                                    upgrade.details.bonuses.map((bonus, index) => {
                                        const bonusSpans = [];
                                        if (item.slot == "HelmAquatic") {
                                            upgrade.counter += 1;
                                        }
                                        if (index < upgrade.counter) {
                                            if (bonus.includes('. <c=@reminder>')) {
                                                bonus = bonus.replace('</c>', '').split('. <c=@reminder>').slice(0, 2);
                                                bonusSpans.push(<span key={`bonus-span-${index}-blue`} className='upgrade-blue'>{`(${index + 1}): `}{bonus[0]}</span>);
                                                bonusSpans.push(<br />);
                                                bonusSpans.push(<span key={`bonus-span-${index}-gray`} className='upgrade-gray'>{bonus[1]}</span>);
                                            } else {
                                                bonusSpans.push(<span key={`bonus-span-${index}`} className='upgrade-blue'>{`(${index + 1}): `}{bonus}</span>);
                                            }
                                        } else {
                                            bonusSpans.push(<span key={`bonus-span-${index}-gray`} className='upgrade-gray'>{`(${index + 1}): `}{bonus}</span>);
                                            <br />
                                        }

                                        return (
                                            <Row key={`sigil-bonus-${item.id}-${bonus}`}>
                                                {bonusSpans}
                                            </Row>
                                        );
                                    })
                                }

                                {/* Sigils & Infusions */}
                                {
                                    upgrade.details &&
                                    upgrade.details.infix_upgrade &&
                                    upgrade.details.infix_upgrade.buff &&
                                    upgrade.details.infix_upgrade.buff.description &&
                                    <Row key={`description-${item.id}`}>
                                        {(() => {
                                            const bonus = upgrade.details.infix_upgrade.buff.description
                                                .replace('</c>', '')
                                                .replace('</br>', '')
                                                .replace('<br>', '')
                                                .split('<c=@reminder>')
                                                .slice(0, 2);
                                            return (
                                                <>
                                                    <span className='upgrade-blue'>{bonus[0]}</span>
                                                    <br />
                                                    <span className='upgrade-gray'>{bonus[1]}</span>
                                                </>
                                            );
                                        })()}
                                    </Row>
                                }

                                <br />
                            </Row>
                        ))
                        }
                        {/* RARITY */}
                        <div className={`name-${item.rarity ? item.rarity.toLowerCase() : 'unknown'}`}>{item.rarity ? item.rarity : 'Unknown rarity'}</div>
                        {/* WEIGHT */}
                        <div>{item.details ? item.details.weight_class : ''}</div>
                        {/* TYPE */}
                        <div>{item.details ? (item.details.type ? item.details.type : item.slot) : ''}</div>
                        {/* LEVEL */}
                        <div>{item.level ? `Required level: ${item.level}` : 'Required level: Unknown'}</div>
                        {/* TRANSMUTED */}
                        {item.skin_name &&
                            (slider
                                ? (item.name &&
                                    <>
                                        <br />
                                        <div>Original Skin</div>
                                        <div>{item.name}</div>
                                    </>
                                )
                                : <>
                                    <br />
                                    <div>Transmuted Skin</div>
                                    <div>{item.skin_name}</div>
                                </>)
                        }
                    </Container>

                    <div {...getArrowProps({ className: 'tooltip-arrow' })} />
                </div>
            )}

            {item
                ?
                <div ref={setTriggerRef}
                    onClick={handleLeftClick}
                    onMouseLeave={() => setShowWikiButton(false)}
                    style={{ width: '62px' }}>
                    {showWikiButton &&
                        <div className='flex column'>
                            {!item.skin_name &&
                                <button className='wiki-button' style={{ marginTop: '60px', marginLeft: '-30px' }} onClick={handleButtonClick}>Wiki Item<img src={Link} alt="" /></button>

                            }
                            {item.skin_name &&
                                <div>
                                    <button className='wiki-button' style={{ marginTop: '60px', marginLeft: '-30px' }} onClick={handleButtonClick}>Wiki Item<img src={Link} alt="" /></button>
                                    <button className='wiki-button' style={{ marginTop: '85px', marginLeft: '-30px' }} onClick={handleButtonSkinClick}>Wiki Skin<img src={Link} alt="" /></button>

                                </div>
                            }
                        </div>
                    }
                    {/* ITEM ICON */}
                    {item.skin_icon && item.skin_name && slider
                        ? <img className={`item-box box-${item.rarity ? item.rarity.toLowerCase() : 'unknown'}`} src={item.skin_icon} alt={item.skin_icon}
                            style={{ cursor: 'pointer' }} />
                        : <img className={`item-box box-${item.rarity ? item.rarity.toLowerCase() : 'unknown'}`} src={item.icon} alt={item.icon}
                            style={{ cursor: 'pointer' }} />
                    }
                </div>
                : <img className="item-box box-gray" style={{ width: '50px', height: '50px', transform: 'none', filter: 'none' }} src={gearIcons[gear]} alt={gear} />
            }
        </React.Fragment>
    );
}

export default ItemTooltipSaved;
