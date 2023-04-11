import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ItemBox from './ItemBox';
import './EquipmentBox.css';


async function findItem({ equip, slot, char }) {
    // console.log(equip.equipment.find(x => x.slot === slot))
    return await equip.equipment.find(x => x.slot === slot);
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
                <Container className="equipment-box">
                    <Row>
                        <Col><ItemBox char={char} item={findItem({ equip: equipment, slot: 'Helm' })} /></Col>
                        <Col><ItemBox char={char} item={findItem({ equip: equipment, slot: 'Shoulders' })} /></Col>
                        <Col><ItemBox char={char} item={findItem({ equip: equipment, slot: 'Coat' })} /></Col>
                        <Col><ItemBox char={char} item={findItem({ equip: equipment, slot: 'Gloves' })} /></Col>
                        <Col><ItemBox char={char} item={findItem({ equip: equipment, slot: 'Leggings' })} /></Col>
                        <Col><ItemBox char={char} item={findItem({ equip: equipment, slot: 'Boots' })} /></Col>
                        <br />
                        <Col><ItemBox char={char} item={findItem({ equip: equipment, slot: 'WeaponA1' })} /></Col>
                        <Col><ItemBox char={char} item={findItem({ equip: equipment, slot: 'WeaponA2' })} /></Col>
                        <br />
                        <Col><ItemBox char={char} item={findItem({ equip: equipment, slot: 'WeaponB1' })} /></Col>
                        <Col><ItemBox char={char} item={findItem({ equip: equipment, slot: 'WeaponB2' })} /></Col>
                    </Row>
                    <Col>
                        <Row className='equipment-trinkets'>
                            <ItemBox char={char} item={findItem({ equip: equipment, slot: 'Backpack' })} />
                            <ItemBox char={char} item={findItem({ equip: equipment, slot: 'Accessory1' })} />
                            <ItemBox char={char} item={findItem({ equip: equipment, slot: 'Accessory2' })} />
                        </Row>
                        <Row className='equipment-trinkets'>
                            <ItemBox char={char} item={findItem({ equip: equipment, slot: 'Amulet' })} />
                            <ItemBox char={char} item={findItem({ equip: equipment, slot: 'Ring1' })} />
                            <ItemBox char={char} item={findItem({ equip: equipment, slot: 'Ring2' })} />
                        </Row>
                        <br />
                        <Row className='equipment-trinkets'>
                            <ItemBox char={char} item={findItem({ equip: equipment, slot: 'HelmAquatic' })} />
                            <ItemBox char={char} item={findItem({ equip: equipment, slot: 'WeaponAquaticA' })} />
                            <ItemBox char={char} item={findItem({ equip: equipment, slot: 'WeaponAquaticB' })} />
                        </Row>
                    </Col>
                </Container>
            </>
            }
        </>
    );
}

export default EquipmentDropdown;
