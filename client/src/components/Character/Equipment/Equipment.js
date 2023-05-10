import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ItemTooltip from './ItemTooltip';
import './Equipment.css';
import Attributes from './Attributes';

function Equipment({ items, lvl, prof }) {
    // console.log('items', items)

    return (<>
        <Container className="equipment-box">
            <Col>
                <br />
                <ItemTooltip item={items.find(x => x.slot === 'Helm')} />
                <ItemTooltip item={items.find(x => x.slot === 'Shoulders')} />
                <ItemTooltip item={items.find(x => x.slot === 'Coat')} />
                <ItemTooltip item={items.find(x => x.slot === 'Gloves')} />
                <ItemTooltip item={items.find(x => x.slot === 'Leggings')} />
                <ItemTooltip item={items.find(x => x.slot === 'Boots')} />
                <br />
                <Row className='flex'>
                    <Col>
                        <span>E1</span>
                        <ItemTooltip item={items.find(x => x.slot === 'WeaponA1')} />
                        <ItemTooltip item={items.find(x => x.slot === 'WeaponA2')} />
                    </Col>
                    <Col>
                        <span>E2</span>
                        <ItemTooltip item={items.find(x => x.slot === 'WeaponB1')} />
                        <ItemTooltip item={items.find(x => x.slot === 'WeaponB2')} />
                    </Col>
                </Row>
                <br />
            </Col>
            <Col>
                <br />
                <Row>Attributes</Row>
                <br />
                <Attributes items={items} lvl={lvl} prof={prof} />
                <br />
                <Col className='flex'>
                    <ItemTooltip item={items.find(x => x.slot === 'Backpack')} />
                    <ItemTooltip item={items.find(x => x.slot === 'Accessory1')} />
                    <ItemTooltip item={items.find(x => x.slot === 'Accessory2')} />
                </Col>
                <Col className='flex'>
                    <ItemTooltip item={items.find(x => x.slot === 'Amulet')} />
                    <ItemTooltip item={items.find(x => x.slot === 'Ring1')} />
                    <ItemTooltip item={items.find(x => x.slot === 'Ring2')} />
                </Col>
                <br />
                <Col className='flex'>
                    <ItemTooltip item={items.find(x => x.slot === 'HelmAquatic')} />
                    <ItemTooltip item={items.find(x => x.slot === 'WeaponAquaticA')} />
                    <ItemTooltip item={items.find(x => x.slot === 'WeaponAquaticB')} />
                </Col>
            </Col>
        </Container>
    </>
    );
}

export default Equipment;
