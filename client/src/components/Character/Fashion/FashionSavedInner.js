import React from 'react';
import { Container, Col } from 'react-bootstrap';
import ItemTooltip from './ItemTooltip';
import Dyes from './Dyes';
import InfusionsTooltip from './InfusionsTooltip';
import '../Equipment/Equipment.css';
import ChatLinks from '../Equipment/ChatLinks';

function FashionSavedInner({ items, embed, char, slider }) {
    const infusions = [];
    let auraCounter = 0;

    for (const item of items) {
        if (item.name === 'Aurora') { auraCounter++ }
        if (item.name === 'Vision') { auraCounter++ }
        if (item.name === 'Coalescence') { auraCounter++ }
        if (item.infusions?.length > 0) {
            infusions.push(...item.infusions)
        }
    }

    return (
        <Container>
            <div style={{ position: 'relative' }}>
                <Container className="equipment-box" style={embed ? { marginTop: '15px' } : { marginTop: '40px' }}>
                    <Col>
                        <Col className='flex column' style={{ marginRight: '5px' }}>
                            <ItemTooltip char={char} item={items.find(x => x.slot === 'Helm')} gear='Helm' slider={slider} embed={embed} />
                            <ItemTooltip char={char} item={items.find(x => x.slot === 'Shoulders')} gear='Shoulders' slider={slider} embed={embed} />
                            <ItemTooltip char={char} item={items.find(x => x.slot === 'Coat')} gear='Coat' slider={slider} embed={embed} />
                            <ItemTooltip char={char} item={items.find(x => x.slot === 'Gloves')} gear='Gloves' slider={slider} embed={embed} />
                            <ItemTooltip char={char} item={items.find(x => x.slot === 'Leggings')} gear='Leggings' slider={slider} embed={embed} />
                            <ItemTooltip char={char} item={items.find(x => x.slot === 'Boots')} gear='Boots' slider={slider} embed={embed} />
                        </Col>
                    </Col>
                    <Col>
                        <Col className='flex column' style={embed || window.innerWidth < 900 ? { marginRight: '20px' } : { marginRight: '65px' }}>
                            <Dyes item={items.find(x => x.slot === 'Helm')} slider={slider} embed={embed} />
                            <Dyes item={items.find(x => x.slot === 'Shoulders')} slider={slider} embed={embed} />
                            <Dyes item={items.find(x => x.slot === 'Coat')} slider={slider} embed={embed} />
                            <Dyes item={items.find(x => x.slot === 'Gloves')} slider={slider} embed={embed} />
                            <Dyes item={items.find(x => x.slot === 'Leggings')} slider={slider} embed={embed} />
                            <Dyes item={items.find(x => x.slot === 'Boots')} slider={slider} embed={embed} />
                        </Col>
                    </Col>
                    <Col>
                        <Col className='flex column' style={{ marginRight: '5px' }}>
                            <ItemTooltip item={items.find(x => x.slot === 'Backpack')} gear='Backpack' slider={slider} embed={embed} />
                            <ItemTooltip item={items.find(x => x.slot === 'WeaponA1')} gear='Weapon1' slider={slider} embed={embed} />
                            <ItemTooltip item={items.find(x => x.slot === 'WeaponA2')} gear='Weapon2' slider={slider} embed={embed} />
                            <ItemTooltip item={items.find(x => x.slot === 'WeaponB1')} gear='Weapon1' slider={slider} embed={embed} />
                            <ItemTooltip item={items.find(x => x.slot === 'WeaponB2')} gear='Weapon2' slider={slider} embed={embed} />
                        </Col>
                    </Col>
                    <Col>
                        <Col className='flex column'>
                            <Dyes item={items.find(x => x.slot === 'Backpack')} />
                            <ItemTooltip
                                item={items.find(x =>
                                    x.slot === 'Accessory1' && x.name === 'Aurora' || x.name === 'Vision')
                                }
                                auraCounter={auraCounter}
                                slider={slider} embed={embed} />
                            <ItemTooltip
                                item={items.find(x =>
                                    (x.slot === 'Accessory2' && (x.name === 'Aurora' || x.name === 'Vision')) ||
                                    (x.slot === 'Accessory1' && items.filter(y => y.slot === 'Accessory1').length === 2))}
                                auraCounter={auraCounter}
                                slider={slider} embed={embed}
                            />
                            <ItemTooltip item={items.find(x => x.slot === 'Amulet' && x.name === `Prismatic Champion's Regalia` || x.name === 'Transcendence')} slider={slider} embed={embed} />
                            <ItemTooltip
                                item={items.find(x =>
                                    x.slot === 'Ring1' && x.name === 'Coalescence' || x.name === 'Conflux')
                                }
                                auraCounter={auraCounter}
                                slider={slider} embed={embed}
                            />
                            <ItemTooltip
                                item={items.find(x =>
                                    (x.slot === 'Ring2' && (x.name === 'Coalescence' || x.name === 'Conflux')) ||
                                    (x.slot === 'Ring1' && items.filter(y => y.slot === 'Ring1').length === 2))}
                                auraCounter={auraCounter}
                                slider={slider} embed={embed}
                            />
                        </Col>
                    </Col>
                </Container>
                <Container
                    className="equipment-box"
                    style={
                        embed || window.innerWidth < 900
                            ? {
                                marginTop: '0px',
                                marginLeft: '35px',
                                marginRight: '35px',
                                justifyContent: 'flex-start'
                            } : {
                                marginTop: '0px',
                                marginLeft: '15px',
                                marginRight: '15px',
                                justifyContent: 'flex-start'
                            }
                    }>
                    <Col className='flex' style={{ flexWrap: 'wrap' }}>
                        {infusions && infusions.length > 0 && infusions.map(infusion => (
                            <InfusionsTooltip key={infusion.id} infusion={infusion} leng={infusions.length} slider={slider} embed={embed} />
                        ))}
                    </Col>
                </Container>
                {
                    !embed && items && char &&
                    <div style={window.innerWidth > 900 ? { marginTop: '-30px' } : {}}><ChatLinks items={items} prof={char?.profession} fashion={true} /></div>
                }
            </div>
        </Container >
    );
}

export default FashionSavedInner;
