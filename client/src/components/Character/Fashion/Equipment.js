import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ItemTooltip from './ItemTooltip';
import Dyes from './Dyes';
import InfusionsTooltip from './InfusionsTooltip';
import '../Equipment/Equipment.css';

function Equipment({ items }) {
    const infusions = [];
    for (const item of items) {
        if (item.infusions.length > 0) {
            infusions.push(...item.infusions)
        }
    }

    return (
        <Container>
            <Container className="equipment-box" style={{ marginTop: '15px' }}>
                <Col>
                    <Col className='flex column' style={{ marginRight: '5px' }}>
                        <ItemTooltip item={items.find(x => x.slot === 'Helm')} />
                        <ItemTooltip item={items.find(x => x.slot === 'Shoulders')} />
                        <ItemTooltip item={items.find(x => x.slot === 'Coat')} />
                        <ItemTooltip item={items.find(x => x.slot === 'Gloves')} />
                        <ItemTooltip item={items.find(x => x.slot === 'Leggings')} />
                        <ItemTooltip item={items.find(x => x.slot === 'Boots')} />
                    </Col>
                </Col>
                <Col>
                    <Col className='flex column' style={{ marginRight: '20px' }}>
                        <Dyes item={items.find(x => x.slot === 'Helm')} />
                        <Dyes item={items.find(x => x.slot === 'Shoulders')} />
                        <Dyes item={items.find(x => x.slot === 'Coat')} />
                        <Dyes item={items.find(x => x.slot === 'Gloves')} />
                        <Dyes item={items.find(x => x.slot === 'Leggings')} />
                        <Dyes item={items.find(x => x.slot === 'Boots')} />
                    </Col>
                </Col>
                <Col>
                    <Col className='flex column' style={{ marginRight: '5px' }}>
                        <ItemTooltip item={items.find(x => x.slot === 'Backpack')} />
                        <ItemTooltip item={items.find(x => x.slot === 'WeaponA1')} />
                        <ItemTooltip item={items.find(x => x.slot === 'WeaponA2')} />
                        <ItemTooltip item={items.find(x => x.slot === 'WeaponB1')} />
                        <ItemTooltip item={items.find(x => x.slot === 'WeaponB2')} />
                    </Col>
                </Col>
                <Col>
                    <Col className='flex column'>
                        <Dyes item={items.find(x => x.slot === 'Backpack')} />
                        <ItemTooltip item={items.find(x => x.slot === 'Accessory1' && x.name === 'Aurora' || x.name === 'Vision')} />
                        <ItemTooltip item={items.find(x => x.slot === 'Accessory2' && x.name === 'Aurora' || x.name === 'Vision')} />
                        <ItemTooltip item={items.find(x => x.slot === 'Amulet' && x.name === `Prismatic Champion's Regalia` || x.name === 'Transcendence')} />
                        <ItemTooltip item={items.find(x => x.slot === 'Ring1' && x.name === 'Coalescence' || x.name === 'Conflux')} />
                        <ItemTooltip item={items.find(x => x.slot === 'Ring2' && x.name === 'Coalescence' || x.name === 'Conflux')} />
                    </Col>
                </Col>
            </Container>
            <Container className="equipment-box" style={{
                marginTop: '0px',
                marginLeft: '39px',
                marginRight: '9px',
                justifyContent: 'flex-start'
            }}>
                <Col className='flex' style={{ flexWrap: 'wrap' }}>
                    {infusions && infusions.length > 0 && infusions.map(infusion => (
                        <InfusionsTooltip key={infusion.id} infusion={infusion} leng={infusions.length} />
                    ))}
                </Col>
            </Container>
        </Container>
    );
}

export default Equipment;
