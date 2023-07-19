import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { usePopperTooltip } from 'react-popper-tooltip';

function ItemTooltip({ item, slider }) {
    // console.log('item ', item)

    const {
        getArrowProps,
        getTooltipProps,
        setTooltipRef,
        setTriggerRef,
        visible,
    } = usePopperTooltip({ placement: 'right' });

    return (
        <>

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

                        {/* STATS */}
                        {item.stats && item.itemstats?.find(is => is.id === item.stats?.id)?.name.split('\'')[0] + ':'}
                        {item.itemstats
                            && item.details
                            && item.details.infix_upgrade
                            && item.itemstats.find(is => is.id === item.details.infix_upgrade.id)?.name.split('\'')[0] &&
                            <span> {item.itemstats.find(is => is.id === item.details.infix_upgrade.id)?.name.split('\'')[0]}:</span>
                        }
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
                <div className='' ref={setTriggerRef}>
                    {/* ITEM ICON */}
                    {item.skin_icon && item.skin_name && slider
                        ? <img className={`item-box box-${item.rarity ? item.rarity.toLowerCase() : 'unknown'}`} src={item.skin_icon} alt={item.skin_icon} />
                        : <img className={`item-box box-${item.rarity ? item.rarity.toLowerCase() : 'unknown'}`} src={item.icon} alt={item.icon} />
                    }
                </div>
                : <img className="item-box box-gray" alt="" />
            }
        </>
    );
}

export default ItemTooltip;
