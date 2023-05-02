import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ItemBox from './ItemBox';
import './Equipment.css';

function Equipment({ items }) {
    console.log('items', items)

    return (<>
        <Container className="equipment-box">
            <Row>
                <Col><ItemBox item={items.find(x => x.slot === 'Helm')} /></Col>
                <Col><ItemBox item={items.find(x => x.slot === 'Shoulders')} /></Col>
                <Col><ItemBox item={items.find(x => x.slot === 'Coat')} /></Col>
                <Col><ItemBox item={items.find(x => x.slot === 'Gloves')} /></Col>
                <Col><ItemBox item={items.find(x => x.slot === 'Leggings')} /></Col>
                <Col><ItemBox item={items.find(x => x.slot === 'Boots')} /></Col>
                <br />
                <Row className='custom-row'>
                    <Col>
                        <span>E1</span>
                        <Col><ItemBox item={items.find(x => x.slot === 'WeaponA1')} /></Col>
                        <Col><ItemBox item={items.find(x => x.slot === 'WeaponA2')} /></Col>
                    </Col>
                    <Col>
                        <span>E2</span>
                        <Col><ItemBox item={items.find(x => x.slot === 'WeaponB1')} /></Col>
                        <Col><ItemBox item={items.find(x => x.slot === 'WeaponB2')} /></Col>
                    </Col>
                </Row>
                <br />
            </Row>
            <Col>
                Attributes
                <Row className='custom-row'>
                    <Col><ItemBox item={items.find(x => x.slot === 'Backpack')} /></Col>
                    <Col><ItemBox item={items.find(x => x.slot === 'Accessory1')} /></Col>
                    <Col><ItemBox item={items.find(x => x.slot === 'Accessory2')} /></Col>
                </Row>
                <Row className='custom-row'>
                    <Col><ItemBox item={items.find(x => x.slot === 'Amulet')} /></Col>
                    <Col><ItemBox item={items.find(x => x.slot === 'Ring1')} /></Col>
                    <Col><ItemBox item={items.find(x => x.slot === 'Ring2')} /></Col>
                </Row>
                <br />
                <Row className='custom-row'>
                    <Col><ItemBox item={items.find(x => x.slot === 'HelmAquatic')} /></Col>
                    <Col><ItemBox item={items.find(x => x.slot === 'WeaponAquaticA')} /></Col>
                    <Col><ItemBox item={items.find(x => x.slot === 'WeaponAquaticB')} /></Col>
                </Row>
            </Col>
        </Container>
    </>
    );
}

export default Equipment;
