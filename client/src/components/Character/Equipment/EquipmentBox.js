import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ItemBox from './ItemBox';


async function findItem({ equip, slot }) {
    return await equip.equipment.find(x => x.slot === slot);
}

function EquipmentBox({ char, tab }) {
    const equipments = char.equipment_tabs;
    let equipment = equipments.find(x => x.is_active === true);
    if (tab) {
        equipment = equipments[tab - 1];
    }

    function printItemBox(slot) {
        return <ItemBox equip={char.equipment} item={findItem({ equip: equipment, slot: slot })} />
    }

    return (
        <>
            {equipment && <>
                <Container className="equipment-box">
                    <Row>
                        <Col>{printItemBox('Helm')}</Col>
                        <Col>{printItemBox('Shoulders')}</Col>
                        <Col>{printItemBox('Coat')}</Col>
                        <Col>{printItemBox('Gloves')}</Col>
                        <Col>{printItemBox('Leggings')}</Col>
                        <Col>{printItemBox('Boots')}</Col>
                        <br />
                        <Row className='custom-row'>
                            <Col>
                                <span>E1</span>
                                {printItemBox('WeaponA1')}
                                {printItemBox('WeaponA2')}
                            </Col>
                            <Col>
                                <span>E2</span>
                                {printItemBox('WeaponB1')}
                                {printItemBox('WeaponB2')}
                            </Col>
                        </Row>
                        <br />
                    </Row>
                    <Col>
                        Attributes
                        <Row className='custom-row'>
                            {printItemBox('Backpack')}
                            {printItemBox('Accessory1')}
                            {printItemBox('Accessory2')}
                        </Row>
                        <Row className='custom-row'>
                            {printItemBox('Amulet')}
                            {printItemBox('Ring1')}
                            {printItemBox('Ring2')}
                        </Row>
                        <br />
                        <Row className='custom-row'>
                            {printItemBox('HelmAquatic')}
                            {printItemBox('WeaponAquaticA')}
                            {printItemBox('WeaponAquaticB')}
                        </Row>
                    </Col>
                </Container>
            </>
            }
        </>
    );
}

export default EquipmentBox;
