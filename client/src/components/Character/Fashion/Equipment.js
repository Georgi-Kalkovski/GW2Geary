import React, { useState, useEffect } from 'react';
import { Container, Col } from 'react-bootstrap';
import ItemTooltip from './ItemTooltip';
import Dyes from './Dyes';
import InfusionsTooltip from './InfusionsTooltip';
import '../Equipment/Equipment.css';
import Cog from '../../../cog.svg';
import Dragon from '../../../dragon.svg';
import ChatLinks from '../Equipment/ChatLinks';
import axios from 'axios';

function Equipment({ items, embed, char }) {
    const infusions = [];
    let auraCounter = 0;
    for (const item of items) {
        if (item.name === 'Aurora') { auraCounter++ }
        if (item.name === 'Vision') { auraCounter++ }
        if (item.name === 'Coalescence') { auraCounter++ }
        if (item.infusions.length > 0) {
            infusions.push(...item.infusions)
        }
    }
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, [items]);

    const [armors, setArmors] = useState([]);
    useEffect(() => {
        async function fetchData() {
            try {
                const armorsApi = await axios.get('https://wiki.guildwars2.com/api.php', {
                    params: {
                        action: 'query',
                        format: 'json',
                        prop: 'revisions',
                        titles: 'Armor_set',
                        rvprop: 'content',
                        origin: '*'
                    }
                });
                setArmors(Object.values(armorsApi.data.query.pages)[0].revisions[0]['*'])
            } catch (error) {
            }
        }
        fetchData();
    }, []);
    localStorage.setItem('armors', armors);

    return (<>
        {isLoading && embed !== true
            ? (
                <div className='logo-equipment-width'>
                    <div className="flex center">
                        <div className="logo-loading-div" style={window.innerWidth > 900 ? { top: '210px', left: '-65px' } : { top: '210px' }}>
                            <img src={Dragon} alt="" className="logo--loading-dragon" />
                            <img src={Cog} alt="" className="logo-loading-cog" />
                        </div>
                    </div>
                </div>
            ) : (
                <Container>
                    <Container className="equipment-box" style={{ marginTop: '15px' }}>
                        <Col>
                            <Col className='flex column' style={{ marginRight: '5px' }}>
                                <ItemTooltip char={char} item={items.find(x => x.slot === 'Helm')} gear='Helm' embed={embed} />
                                <ItemTooltip char={char} item={items.find(x => x.slot === 'Shoulders')} gear='Shoulders' embed={embed} />
                                <ItemTooltip char={char} item={items.find(x => x.slot === 'Coat')} gear='Coat' embed={embed} />
                                <ItemTooltip char={char} item={items.find(x => x.slot === 'Gloves')} gear='Gloves' embed={embed} />
                                <ItemTooltip char={char} item={items.find(x => x.slot === 'Leggings')} gear='Leggings' embed={embed} />
                                <ItemTooltip char={char} item={items.find(x => x.slot === 'Boots')} gear='Boots' embed={embed} />
                            </Col>
                        </Col>
                        <Col>
                            <Col className='flex column' style={{ marginRight: '20px' }}>
                                <Dyes item={items.find(x => x.slot === 'Helm')} embed={embed} />
                                <Dyes item={items.find(x => x.slot === 'Shoulders')} embed={embed} />
                                <Dyes item={items.find(x => x.slot === 'Coat')} embed={embed} />
                                <Dyes item={items.find(x => x.slot === 'Gloves')} embed={embed} />
                                <Dyes item={items.find(x => x.slot === 'Leggings')} embed={embed} />
                                <Dyes item={items.find(x => x.slot === 'Boots')} embed={embed} />
                            </Col>
                        </Col>
                        <Col>
                            <Col className='flex column' style={{ marginRight: '5px' }}>
                                <ItemTooltip item={items.find(x => x.slot === 'Backpack')} gear='Backpack' embed={embed} />
                                <ItemTooltip item={items.find(x => x.slot === 'WeaponA1')} gear='Weapon1' embed={embed} />
                                <ItemTooltip item={items.find(x => x.slot === 'WeaponA2')} gear='Weapon2' embed={embed} />
                                <ItemTooltip item={items.find(x => x.slot === 'WeaponB1')} gear='Weapon1' embed={embed} />
                                <ItemTooltip item={items.find(x => x.slot === 'WeaponB2')} gear='Weapon2' embed={embed} />
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
                                    embed={embed} />
                                <ItemTooltip
                                    item={items.find(x =>
                                        (x.slot === 'Accessory2' && (x.name === 'Aurora' || x.name === 'Vision')) ||
                                        (x.slot === 'Accessory1' && items.filter(y => y.slot === 'Accessory1').length === 2))}
                                    auraCounter={auraCounter}
                                    embed={embed}
                                />
                                <ItemTooltip item={items.find(x => x.slot === 'Amulet' && x.name === `Prismatic Champion's Regalia` || x.name === 'Transcendence')} embed={embed} />
                                <ItemTooltip
                                    item={items.find(x =>
                                        x.slot === 'Ring1' && x.name === 'Coalescence' || x.name === 'Conflux')
                                    }
                                    auraCounter={auraCounter}
                                    embed={embed}
                                />
                                <ItemTooltip
                                    item={items.find(x =>
                                        (x.slot === 'Ring2' && (x.name === 'Coalescence' || x.name === 'Conflux')) ||
                                        (x.slot === 'Ring1' && items.filter(y => y.slot === 'Ring1').length === 2))}
                                    auraCounter={auraCounter}
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
                    {!embed &&
                        <ChatLinks items={items} prof={char.profession} fashion={true} />
                    }
                </Container>
            )
        }
    </>
    );
}

export default Equipment;
