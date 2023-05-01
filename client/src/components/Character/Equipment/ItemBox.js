import React from 'react';
import { Container, Row } from 'react-bootstrap';
import Popup from 'reactjs-popup';

function ItemBox({ item }) {
    console.log('item ', item)

    return (
        <>
            {item
                ? <div>
                    <Popup
                        trigger={
                            item.skin_icon && item.skin_name
                                ? <img className={`item-box box-${item.rarity.toLowerCase()}`} src={item.skin_icon} alt={item.skin_icon} />
                                : <img className={`item-box box-${item.rarity.toLowerCase()}`} src={item.item_icon} alt={item.item_icon} />
                        }
                        arrow={false}
                        position="right center"
                        on="hover"
                        offsetX={10}
                        mouseLeaveDelay={0}
                    >
                        <Container className='item-popup'>
                            <Row className={`name-${item.rarity.toLowerCase()}`}>
                                {item.skin_name
                                    ? <span>{item.skin_name}</span>
                                    : <span>{item.item_name}</span>
                                }
                            </Row>
                            <br />
                            {item.details.defense !== 0 && item.details.defense &&
                                <>
                                    <Row key={`defense${item.details.defense}`}> Defense: <span className='green'>{item.details.defense}</span></Row>
                                    <br />
                                </>
                            }
                            {item.details.min_power && item.details.max_power &&
                                <>
                                    <Row key={`power-${item.details.min_power}${item.details.max_power}`}> Weapon Strength: <span className='green'>{item.details.min_power} - {item.details.max_power}</span></Row>
                                    <br />
                                </>
                            }

                            {item.stats && Object.keys(item.stats.attributes).map(key => (
                                <Row key={`stats-${item.id}${key}`}>
                                    <span className='green'>+ {item.stats.attributes[key]} {key}</span>
                                </Row>
                            ))}
                            <br />
                            {item.skin_name &&
                                <>
                                    <div>Transmuted</div>
                                    <div>{item.skin_name}</div>
                                </>
                            }
                            <br />
                            <div className={`name-${item.rarity.toLowerCase()}`}>{item.rarity}</div>
                        </Container>
                    </Popup>
                </div >
                : <img className="item-box box-gray" alt="" />
            }
        </>
    );
}

export default ItemBox;
