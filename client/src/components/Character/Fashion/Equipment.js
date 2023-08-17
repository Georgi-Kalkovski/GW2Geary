import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ItemTooltip from './ItemTooltip';
import Dyes from './Dyes';
import InfusionsTooltip from './InfusionsTooltip';
import '../Equipment/Equipment.css';

function Equipment({ items, embed }) {
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
                        <ItemTooltip item={items.find(x => x.slot === 'Helm')} embed={embed} />
                        <ItemTooltip item={items.find(x => x.slot === 'Shoulders')} embed={embed} />
                        <ItemTooltip item={items.find(x => x.slot === 'Coat')} embed={embed} />
                        <ItemTooltip item={items.find(x => x.slot === 'Gloves')} embed={embed}/>
                        <ItemTooltip item={items.find(x => x.slot === 'Leggings')} embed={embed}/>
                        <ItemTooltip item={items.find(x => x.slot === 'Boots')} embed={embed}/>
                    </Col>
                </Col>
                <Col>
                    <Col className='flex column' style={{ marginRight: '20px' }}>
                        <Dyes item={items.find(x => x.slot === 'Helm')} embed={embed}/>
                        <Dyes item={items.find(x => x.slot === 'Shoulders')} embed={embed}/>
                        <Dyes item={items.find(x => x.slot === 'Coat')} embed={embed}/>
                        <Dyes item={items.find(x => x.slot === 'Gloves')} embed={embed}/>
                        <Dyes item={items.find(x => x.slot === 'Leggings')} embed={embed}/>
                        <Dyes item={items.find(x => x.slot === 'Boots')} embed={embed}/>
                    </Col>
                </Col>
                <Col>
                    <Col className='flex column' style={{ marginRight: '5px' }}>
                        <ItemTooltip item={items.find(x => x.slot === 'Backpack')} embed={embed}/>
                        <ItemTooltip item={items.find(x => x.slot === 'WeaponA1')} embed={embed}/>
                        <ItemTooltip item={items.find(x => x.slot === 'WeaponA2')} embed={embed}/>
                        <ItemTooltip item={items.find(x => x.slot === 'WeaponB1')} embed={embed}/>
                        <ItemTooltip item={items.find(x => x.slot === 'WeaponB2')} embed={embed}/>
                    </Col>
                </Col>
                <Col>
                    <Col className='flex column'>
                        <Dyes item={items.find(x => x.slot === 'Backpack')} />
                        <ItemTooltip item={items.find(x => x.slot === 'Accessory1' && x.name === 'Aurora' || x.name === 'Vision')} embed={embed}/>
                        <ItemTooltip item={items.find(x =>
                            (x.slot === 'Accessory2' && (x.name === 'Aurora' || x.name === 'Vision')) ||
                            (x.slot === 'Accessory1' && items.filter(y => y.slot === 'Accessory1').length === 2))}
                            embed={embed}
                        />
                        <ItemTooltip item={items.find(x => x.slot === 'Amulet' && x.name === `Prismatic Champion's Regalia` || x.name === 'Transcendence')} embed={embed} />
                        <ItemTooltip item={items.find(x => x.slot === 'Ring1' && x.name === 'Coalescence' || x.name === 'Conflux')} embed={embed} />
                        <ItemTooltip item={items.find(x =>
                            (x.slot === 'Ring2' && (x.name === 'Coalescence' || x.name === 'Conflux')) ||
                            (x.slot === 'Ring1' && items.filter(y => y.slot === 'Ring1').length === 2))}
                            embed={embed}
                        />
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
                        <InfusionsTooltip key={infusion.id} infusion={infusion} leng={infusions.length} embed={embed} />
                    ))}
                </Col>
            </Container>
        </Container>
    );
}

export default Equipment;
