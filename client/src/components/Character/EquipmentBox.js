import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ItemBox from './ItemBox';
import './EquipmentBox.css';


function findItem({ equip, slot }) {
    const item = equip.equipment.find(x => x.slot === slot);
    return item ? [item.id, item.skin] : null;
}

function EquipmentDropdown({ char, tab }) {
    const equipments = char.equipment_tabs;
    let equipment = equipments.find(x => x.is_active === true);
    if (tab) {
        equipment = equipments[tab - 1];
    } 
    return (
        <>
            {equipment && <>
                <Row>{equipment.name}</Row>
                <Container className="equipment-box">
                    <Row>
                        <Col><ItemBox itemInput={findItem({ equip: equipment, slot: 'Helm' })} /></Col>
                        <Col><ItemBox itemInput={findItem({ equip: equipment, slot: 'Shoulders' })} /></Col>
                        <Col><ItemBox itemInput={findItem({ equip: equipment, slot: 'Coat' })} /></Col>
                        <Col><ItemBox itemInput={findItem({ equip: equipment, slot: 'Gloves' })} /></Col>
                        <Col><ItemBox itemInput={findItem({ equip: equipment, slot: 'Leggings' })} /></Col>
                        <Col><ItemBox itemInput={findItem({ equip: equipment, slot: 'Boots' })} /></Col>
                        <br/>
                        <Col><ItemBox itemInput={findItem({ equip: equipment, slot: 'WeaponA1' })} /></Col>
                        <Col><ItemBox itemInput={findItem({ equip: equipment, slot: 'WeaponA2' })} /></Col>
                        <br/>
                        <Col><ItemBox itemInput={findItem({ equip: equipment, slot: 'WeaponB1' })} /></Col>
                        <Col><ItemBox itemInput={findItem({ equip: equipment, slot: 'WeaponB2' })} /></Col>
                    </Row>
                    <Col>
                        <Row className='equipment-trinkets'>
                            <ItemBox itemInput={findItem({ equip: equipment, slot: 'Backpack' })} />
                            <ItemBox itemInput={findItem({ equip: equipment, slot: 'Accessory1' })} />
                            <ItemBox itemInput={findItem({ equip: equipment, slot: 'Accessory2' })} />
                        </Row>
                        <Row className='equipment-trinkets'>
                            <ItemBox itemInput={findItem({ equip: equipment, slot: 'Amulet' })} />
                            <ItemBox itemInput={findItem({ equip: equipment, slot: 'Ring1' })} />
                            <ItemBox itemInput={findItem({ equip: equipment, slot: 'Ring2' })} />
                        </Row>
                        <br/>
                        <Row className='equipment-trinkets'>
                            <ItemBox itemInput={findItem({ equip: equipment, slot: 'HelmAquatic' })} />
                            <ItemBox itemInput={findItem({ equip: equipment, slot: 'WeaponAquaticA' })} />
                            <ItemBox itemInput={findItem({ equip: equipment, slot: 'WeaponAquaticB' })} />
                        </Row>
                    </Col>
                </Container>
            </>
            }
        </>
    );
}

export default EquipmentDropdown;
