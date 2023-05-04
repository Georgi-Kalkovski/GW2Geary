import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ItemBox from './ItemBox';
import './Equipment.css';
import Attributes from './Attributes';

function Equipment({ items, upgrades }) {
    // console.log('items', items)

    return (<>
        <Container className="equipment-box">
            <Row>
                <Col><ItemBox item={items.find(x => x.slot === 'Helm')} upgrades={upgrades} /></Col>
                <Col><ItemBox item={items.find(x => x.slot === 'Shoulders')} upgrades={upgrades} /></Col>
                <Col><ItemBox item={items.find(x => x.slot === 'Coat')} upgrades={upgrades} /></Col>
                <Col><ItemBox item={items.find(x => x.slot === 'Gloves')} upgrades={upgrades} /></Col>
                <Col><ItemBox item={items.find(x => x.slot === 'Leggings')} upgrades={upgrades} /></Col>
                <Col><ItemBox item={items.find(x => x.slot === 'Boots')} upgrades={upgrades} /></Col>
                <br />
                <Row className='custom-row'>
                    <Col>
                        <span>E1</span>
                        <Col><ItemBox item={items.find(x => x.slot === 'WeaponA1')} upgrades={upgrades} /></Col>
                        <Col><ItemBox item={items.find(x => x.slot === 'WeaponA2')} upgrades={upgrades} /></Col>
                    </Col>
                    <Col>
                        <span>E2</span>
                        <Col><ItemBox item={items.find(x => x.slot === 'WeaponB1')} upgrades={upgrades} /></Col>
                        <Col><ItemBox item={items.find(x => x.slot === 'WeaponB2')} upgrades={upgrades} /></Col>
                    </Col>
                </Row>
                <br />
            </Row>
            <Col>
                Attributes
                <Attributes items={items} upgrades={upgrades}/>
                <Row className='custom-row'>
                    <Col><ItemBox item={items.find(x => x.slot === 'Backpack')} upgrades={upgrades} /></Col>
                    <Col><ItemBox item={items.find(x => x.slot === 'Accessory1')} upgrades={upgrades} /></Col>
                    <Col><ItemBox item={items.find(x => x.slot === 'Accessory2')} upgrades={upgrades} /></Col>
                </Row>
                <Row className='custom-row'>
                    <Col><ItemBox item={items.find(x => x.slot === 'Amulet')} upgrades={upgrades} /></Col>
                    <Col><ItemBox item={items.find(x => x.slot === 'Ring1')} upgrades={upgrades} /></Col>
                    <Col><ItemBox item={items.find(x => x.slot === 'Ring2')} upgrades={upgrades} /></Col>
                </Row>
                <br />
                <Row className='custom-row'>
                    <Col><ItemBox item={items.find(x => x.slot === 'HelmAquatic')} upgrades={upgrades} /></Col>
                    <Col><ItemBox item={items.find(x => x.slot === 'WeaponAquaticA')} upgrades={upgrades} /></Col>
                    <Col><ItemBox item={items.find(x => x.slot === 'WeaponAquaticB')} upgrades={upgrades} /></Col>
                </Row>
            </Col>
        </Container>
    </>
    );
}

export default Equipment;
