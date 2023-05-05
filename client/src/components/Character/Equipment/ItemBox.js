import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { usePopperTooltip } from 'react-popper-tooltip';

function ItemBox({ item, upgrades }) {
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
                    {...getTooltipProps({ className: 'tooltip-container' })}
                >
                    <Container className='item-popup'>
                        {/* NAME */}
                        <Row key={`name-${item.id}`} className={`name-${item.rarity.toLowerCase()}`}>
                            {item.skin_name
                                ? <span className='item-name'>{item.skin_name}</span>
                                : <span className='item-name'>{item.item_name}</span>
                            }
                        </Row>
                        <br />
                        {/* DEFENSE */}
                        {item.details.defense !== 0 && item.details.defense &&
                            <>
                                <Row key={`defense-${item.id}`}>
                                    Defense: <span className='green'>{item.details.defense}</span>
                                </Row>
                                <br />
                            </>
                        }
                        {/* POWER */}
                        {item.details.min_power && item.details.max_power &&
                            <>
                                <Row key={`power-${item.details.min_power}${item.details.max_power}`}>
                                    Weapon Strength: <span className='green'>{item.details.min_power} - {item.details.max_power}</span>
                                </Row>
                                <br />
                            </>
                        }

                        {/* STATS */}
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
                                        const matchingRune = upgrades && upgrades.find((rune) => rune.name === upgrade.name);
                                        const bonusCount = matchingRune ? matchingRune.count : 0;
                                        const bonusSpans = [];
                                        if (index < bonusCount) {
                                            bonusSpans.push(<span key={`bonus-span-${index}`} className='upgrade-blue'>{`(${index + 1}): `}{bonus}</span>);
                                        } else {
                                            bonusSpans.push(<span key={`bonus-gray-${index}`} className='upgrade-gray'>{`(${index + 1}): `}{bonus}</span>);
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
                                    upgrade.details.infix_upgrade.buff &&
                                    <Row key={`description-${item.id}`}>
                                        {(() => {
                                            const [blueText, grayText] = upgrade.details.infix_upgrade.buff.description
                                                .split('<br><c=@reminder>')
                                                .slice(0, 2);
                                            let sanitizedGrayText = ''
                                            if (upgrade.details.infix_upgrade.buff.description.includes('</c>')) {
                                                sanitizedGrayText = grayText.replace('</c>', '');
                                            }
                                            return (
                                                <>
                                                    <span className='upgrade-blue'>{blueText}</span>
                                                    <span className='upgrade-gray'>{sanitizedGrayText}</span>
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
                        <div className={`name-${item.rarity.toLowerCase()}`}>{item.rarity}</div>
                        {/* WEIGHT */}
                        <div>{item.details.weight_class}</div>
                        {/* TYPE */}
                        <div>{item.details.type}</div>
                        {/* LEVEL */}
                        <div>Required level: {item.item_data.level}</div>
                        {/* TRANSMUTED */}
                        {item.skin_name &&
                            <>
                                <br />
                                <div>Transmuted</div>
                                <div>{item.skin_name}</div>
                            </>
                        }
                    </Container>

                    <div {...getArrowProps({ className: 'tooltip-arrow' })} />
                </div>
            )}
            {item
                ?
                <div className='' ref={setTriggerRef}>
                    {/* ITEM ICON */}
                    {item.skin_icon && item.skin_name
                        ? <img className={`item-box box-${item.rarity.toLowerCase()}`} src={item.skin_icon} alt={item.skin_icon} />
                        : <img className={`item-box box-${item.rarity.toLowerCase()}`} src={item.item_icon} alt={item.item_icon} />
                    }
                </div>
                : <img className="item-box box-gray" alt="" />
            }
        </>
    );
}

export default ItemBox;
