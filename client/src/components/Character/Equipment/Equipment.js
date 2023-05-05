import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ItemBox from './ItemBox';
import './Equipment.css';
import Attributes from './Attributes';

function Equipment({ items, upgrades, lvl, prof }) {
      console.log('items', items)

    return (<>
        <Container className="equipment-box">
            <Col>
                <br />
                <ItemBox item={items.find(x => x.slot === 'Helm')} upgrades={upgrades} />
                <ItemBox item={items.find(x => x.slot === 'Shoulders')} upgrades={upgrades} />
                <ItemBox item={items.find(x => x.slot === 'Coat')} upgrades={upgrades} />
                <ItemBox item={items.find(x => x.slot === 'Gloves')} upgrades={upgrades} />
                <ItemBox item={items.find(x => x.slot === 'Leggings')} upgrades={upgrades} />
                <ItemBox item={items.find(x => x.slot === 'Boots')} upgrades={upgrades} />
                <br />
                <Row className='flex'>
                    <Col>
                        <span>E1</span>
                        <ItemBox item={items.find(x => x.slot === 'WeaponA1')} upgrades={upgrades} />
                        <ItemBox item={items.find(x => x.slot === 'WeaponA2')} upgrades={upgrades} />
                    </Col>
                    <Col>
                        <span>E2</span>
                        <ItemBox item={items.find(x => x.slot === 'WeaponB1')} upgrades={upgrades} />
                        <ItemBox item={items.find(x => x.slot === 'WeaponB2')} upgrades={upgrades} />
                    </Col>
                </Row>
                <br />
            </Col>
            <Col>
                <br />
                <Row>Attributes</Row>
                <br />
                <Attributes items={items} upgrades={upgrades} lvl={lvl} prof={prof}/>
                <br />
                <Col className='flex'>
                    <ItemBox item={items.find(x => x.slot === 'Backpack')} upgrades={upgrades} />
                    <ItemBox item={items.find(x => x.slot === 'Accessory1')} upgrades={upgrades} />
                    <ItemBox item={items.find(x => x.slot === 'Accessory2')} upgrades={upgrades} />
                </Col>
                <Col className='flex'>
                    <ItemBox item={items.find(x => x.slot === 'Amulet')} upgrades={upgrades} />
                    <ItemBox item={items.find(x => x.slot === 'Ring1')} upgrades={upgrades} />
                    <ItemBox item={items.find(x => x.slot === 'Ring2')} upgrades={upgrades} />
                </Col>
                <br />
                <Col className='flex'>
                    <ItemBox item={items.find(x => x.slot === 'HelmAquatic')} upgrades={upgrades} />
                    <ItemBox item={items.find(x => x.slot === 'WeaponAquaticA')} upgrades={upgrades} />
                    <ItemBox item={items.find(x => x.slot === 'WeaponAquaticB')} upgrades={upgrades} />
                </Col>
            </Col>
        </Container>
    </>
    );
}

export default Equipment;
