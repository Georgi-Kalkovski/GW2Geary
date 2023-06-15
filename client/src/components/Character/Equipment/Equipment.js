import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ItemTooltip from './ItemTooltip';
import Attributes from '../Attributes/Attributes';
import './Equipment.css';
import Cog from '../../../cog.svg'
import Dragon from '../../../dragon.svg'

function Equipment({ items, prof, slider, build }) {
    // console.log('items', items)
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, [items]);

    return (<>
        <Container className="equipment-box">
            {isLoading
                ? (
                    <div className='logo-equipment-width'>
                        <div className="flex center">
                            <div className="logo-loading-div">
                                <img src={Dragon} alt="" className="logo--loading-dragon" />
                                <img src={Cog} alt="" className="logo-loading-cog" />
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        <Col>
                            <br />
                            <Col className='equipment-col-1'>
                                <ItemTooltip item={items.find(x => x.slot === 'Helm')} slider={slider} />
                                <ItemTooltip item={items.find(x => x.slot === 'Shoulders')} slider={slider} />
                                <ItemTooltip item={items.find(x => x.slot === 'Coat')} slider={slider} />
                                <ItemTooltip item={items.find(x => x.slot === 'Gloves')} slider={slider} />
                                <ItemTooltip item={items.find(x => x.slot === 'Leggings')} slider={slider} />
                                <ItemTooltip item={items.find(x => x.slot === 'Boots')} slider={slider} />

                            </Col>
                            <br />
                            <Row className='flex'>
                                <Col>
                                    <ItemTooltip item={items.find(x => x.slot === 'WeaponA1')} slider={slider} />
                                    <ItemTooltip item={items.find(x => x.slot === 'WeaponA2')} slider={slider} />
                                </Col>
                                <Col style={{ marginLeft: '15px' }}>
                                    <ItemTooltip item={items.find(x => x.slot === 'WeaponB1')} slider={slider} />
                                    <ItemTooltip item={items.find(x => x.slot === 'WeaponB2')} slider={slider} />
                                </Col>
                            </Row>
                        </Col>

                        <Col className='equipment-col-2'>
                            <br />
                            <Row>Attributes</Row>
                            <br />
                            <Attributes items={items} build={build} prof={prof} />
                            <br />
                            <Col className='flex'>
                                <ItemTooltip item={items.find(x => x.slot === 'Backpack')} slider={slider} />
                                <ItemTooltip item={items.find(x => x.slot === 'Accessory1')} slider={slider} />
                                <ItemTooltip item={items.filter(x => x.slot === 'Accessory1').length == 2 ? items.find(x => x.slot === 'Accessory1') : items.find(x => x.slot === 'Accessory2')} slider={slider} />
                            </Col>
                            <Col className='flex'>
                                <ItemTooltip item={items.find(x => x.slot === 'Amulet')} slider={slider} />
                                <ItemTooltip item={items.find(x => x.slot === 'Ring1')} slider={slider} />
                                <ItemTooltip item={items.filter(x => x.slot === 'Ring1').length == 2 ? items.find(x => x.slot === 'Ring1') : items.find(x => x.slot === 'Ring2')} slider={slider} />
                            </Col>
                            <br />
                            <Col className='flex'>
                                <ItemTooltip item={items.find(x => x.slot === 'HelmAquatic')} slider={slider} />
                                <ItemTooltip item={items.find(x => x.slot === 'WeaponAquaticA')} slider={slider} />
                                <ItemTooltip item={items.find(x => x.slot === 'WeaponAquaticB')} slider={slider} />
                            </Col>
                        </Col>
                    </>
                )
            }
        </Container>
    </>
    );
}

export default Equipment;
