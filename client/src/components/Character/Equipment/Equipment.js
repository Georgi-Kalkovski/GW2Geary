import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ItemTooltip from './ItemTooltip';
import './Equipment.css';
import Attributes from './Attributes';

function Equipment({ items, prof, slider }) {
    // console.log('items', items)
    return (<>
        <Container className="equipment-box">
            <Col className='equipment-col-1'>
                <br />
                <ItemTooltip item={items.find(x => x.slot === 'Helm')} slider={slider} />
                <ItemTooltip item={items.find(x => x.slot === 'Shoulders')} slider={slider} />
                <ItemTooltip item={items.find(x => x.slot === 'Coat')} slider={slider} />
                <ItemTooltip item={items.find(x => x.slot === 'Gloves')} slider={slider} />
                <ItemTooltip item={items.find(x => x.slot === 'Leggings')} slider={slider} />
                <ItemTooltip item={items.find(x => x.slot === 'Boots')} slider={slider} />
                <br />
                <Row className='flex'>
                    <Col >
                        <span>E1</span>
                        <ItemTooltip item={items.find(x => x.slot === 'WeaponA1')} slider={slider} />
                        <ItemTooltip item={items.find(x => x.slot === 'WeaponA2')} slider={slider} />
                    </Col>
                    <Col>
                        <span>E2</span>
                        <ItemTooltip item={items.find(x => x.slot === 'WeaponB1')} slider={slider} />
                        <ItemTooltip item={items.find(x => x.slot === 'WeaponB2')} slider={slider} />
                    </Col>
                </Row>
                <br />
            </Col>
            <Col className='equipment-col-2'>
                <br />
                <Row>Attributes</Row>
                <br />
                <Attributes items={items} prof={prof} />
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
        </Container>
    </>
    );
}

export default Equipment;
