import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ItemBox from './ItemBox';
import './Equipment.css';
import Attributes from './Attributes';

function Equipment({ items, lvl, prof }) {
    // console.log('items', items)

    return (<>
        <Container className="equipment-box">
            <Col>
                <br />
                <ItemBox item={items.find(x => x.slot === 'Helm')} />
                <ItemBox item={items.find(x => x.slot === 'Shoulders')} />
                <ItemBox item={items.find(x => x.slot === 'Coat')} />
                <ItemBox item={items.find(x => x.slot === 'Gloves')} />
                <ItemBox item={items.find(x => x.slot === 'Leggings')} />
                <ItemBox item={items.find(x => x.slot === 'Boots')} />
                <br />
                <Row className='flex'>
                    <Col>
                        <span>E1</span>
                        <ItemBox item={items.find(x => x.slot === 'WeaponA1')} />
                        <ItemBox item={items.find(x => x.slot === 'WeaponA2')} />
                    </Col>
                    <Col>
                        <span>E2</span>
                        <ItemBox item={items.find(x => x.slot === 'WeaponB1')} />
                        <ItemBox item={items.find(x => x.slot === 'WeaponB2')} />
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
                    <ItemBox item={items.find(x => x.slot === 'Backpack')} />
                    <ItemBox item={items.find(x => x.slot === 'Accessory1')} />
                    <ItemBox item={items.find(x => x.slot === 'Accessory2')} />
                </Col>
                <Col className='flex'>
                    <ItemBox item={items.find(x => x.slot === 'Amulet')} />
                    <ItemBox item={items.find(x => x.slot === 'Ring1')} />
                    <ItemBox item={items.find(x => x.slot === 'Ring2')} />
                </Col>
                <br />
                <Col className='flex'>
                    <ItemBox item={items.find(x => x.slot === 'HelmAquatic')} />
                    <ItemBox item={items.find(x => x.slot === 'WeaponAquaticA')} />
                    <ItemBox item={items.find(x => x.slot === 'WeaponAquaticB')} />
                </Col>
            </Col>
        </Container>
    </>
    );
}

export default Equipment;
