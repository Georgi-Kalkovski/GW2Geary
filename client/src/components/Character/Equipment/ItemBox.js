import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { usePopperTooltip } from 'react-popper-tooltip';

function ItemBox({ item }) {
    //console.log('item ', item)

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
                        <Row key={`name-${item.id}`} className={`name-${item.rarity.toLowerCase()}`}>
                            {item.skin_name
                                ? <span className='item-name'>{item.skin_name}</span>
                                : <span className='item-name'>{item.item_name}</span>
                            }
                        </Row>
                        <br />
                        {item.details.defense !== 0 && item.details.defense &&
                            <>
                                <Row key={`defense-${item.id}`}>
                                    Defense: <span className='green'>{item.details.defense}</span>
                                </Row>
                                <br />
                            </>
                        }
                        {item.details.min_power && item.details.max_power &&
                            <>
                                <Row key={`power-${item.details.min_power}${item.details.max_power}`}>
                                    Weapon Strength: <span className='green'>{item.details.min_power} - {item.details.max_power}</span>
                                </Row>
                                <br />
                            </>
                        }

                        {item.stats && Object.keys(item.stats.attributes).map((stat, index) => (
                            <Row key={`attributes-${item.id}-${index}`}>
                                <span className='green'>+ {item.stats.attributes[stat]} {stat}</span>
                            </Row>
                        ))}
                        <br />
                        {item.upgrades && item.upgrades.map((upgrade, index) => (
                            <Row key={`upgrade-${upgrade.id}-${index}`}>
                                <img src={upgrade.icon} width="20" alt={upgrade.icon} />
                                <span className='upgrade'> {upgrade.name}</span>
                                {
                                    upgrade.details &&
                                    upgrade.details.bonuses &&
                                    !upgrade.details.infix_upgrade &&
                                    upgrade.details.bonuses.map(bonus => (
                                        <Row key={`upgrade-bonus-${item.id}`}>
                                            <span className='upgrade'> {bonus}</span>
                                        </Row>
                                    ))}
                                {
                                    upgrade.details &&
                                    upgrade.details.infix_upgrade &&
                                    upgrade.details.infix_upgrade.buff &&
                                    upgrade.details.infix_upgrade.buff &&
                                    <Row key={`description-${item.id}`}>
                                        <span className='upgrade'> {upgrade.details.infix_upgrade.buff.description}</span>
                                    </Row>
                                }
                                {upgrade.details && upgrade.details.bonuses && upgrade.details.bonuses.map(bonus => (
                                    <Row key={`sigil-bonus-${item.id}-${bonus}`}>
                                        <span className='upgrade'> {bonus}</span>
                                    </Row>
                                ))}
                                <br />
                            </Row>
                        ))
                        }

                        <div className={`name-${item.rarity.toLowerCase()}`}>{item.rarity}</div>
                        <div>{item.details.weight_class}</div>
                        <div>{item.details.type}</div>
                        <div>Required level: {item.item_data.level}</div>
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
