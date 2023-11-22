import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ItemTooltip from './ItemTooltip';
import Attributes from '../Attributes/Attributes';
import './Equipment.css';
import Cog from '../../../cog.svg'
import Dragon from '../../../dragon.svg'
import EquipmentStats from './EquipmentStats';
import EquipmentFashion from '../Fashion/Equipment';
import ChatLinks from './ChatLinks';
import EquipmentSaveButton from './EquipmentSaveButton';
import AuthService from '../../../services/auth.service';

function Equipment({ char, items, prof, build, slider, prefixSlider, fashionSlider, powerCore, relic, selectedEqTab }) {
    // console.log('items', items)
    const currentUser = AuthService.getCurrentUser();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, [items]);

    return (<>
        {isLoading
            ? (
                <div className='logo-equipment-width'>
                    <div className="flex center">
                        <div className="logo-loading-div">
                            <img src={Dragon} alt="" className="logo--loading-dragon" />
                            <img src={Cog} alt="" className="logo-loading-cog" />
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    {prefixSlider || fashionSlider
                        ? (
                            <>
                                {prefixSlider && (
                                    <EquipmentStats items={items} prof={prof} relic={relic ? relic[0] : ''} powerCore={powerCore ? powerCore[0] : ''} />
                                )}
                                {fashionSlider && (
                                    <EquipmentFashion key={selectedEqTab?.tab + selectedEqTab?.name} items={items} char={char} slider={slider} />
                                )}
                            </>
                        ) : (
                            <>
                                <div style={{ position: 'relative' }}>
                                    {currentUser?.apiKeys?.find(key => key.accountName === localStorage.getItem('acc')) &&
                                        <div
                                            className='flex column'
                                            style={window.innerWidth < 900
                                                ? { position: 'absolute', right: '10px', top: '-125px' }
                                                : { position: 'absolute', right: '30px', top: '-125px' }
                                            }>
                                            <div>
                                                <EquipmentSaveButton items={items} char={char} slider={slider} currentUser={currentUser} relic={relic} powerCore={powerCore}/>
                                            </div>
                                        </div>
                                    }
                                    <Container className="equipment-box">
                                        <>
                                            <Col>
                                                <Col className='flex column equipment-col-1'>
                                                    <ItemTooltip item={items.find(x => x.slot === 'Helm')} gear='Helm' slider={slider} />
                                                    <ItemTooltip item={items.find(x => x.slot === 'Shoulders')} gear='Shoulders' slider={slider} />
                                                    <ItemTooltip item={items.find(x => x.slot === 'Coat')} gear='Coat' slider={slider} />
                                                    <ItemTooltip item={items.find(x => x.slot === 'Gloves')} gear='Gloves' slider={slider} />
                                                    <ItemTooltip item={items.find(x => x.slot === 'Leggings')} gear='Leggings' slider={slider} />
                                                    <ItemTooltip item={items.find(x => x.slot === 'Boots')} gear='Boots' slider={slider} />

                                                </Col>
                                                <Row className='flex' style={{ marginTop: '10px' }}>
                                                    <Col className={`flex column ${prof ? prof.toLowerCase() : ''}-lightning-border`}
                                                        style={{
                                                            borderWidth: '2px',
                                                            boxShadow: 'none',
                                                            borderLeft: 'none',
                                                            borderTop: 'none',
                                                            borderBottom: 'none',
                                                            paddingRight: '5px',
                                                            marginRight: '5px'
                                                        }}>
                                                        <ItemTooltip item={items.find(x => x.slot === 'WeaponA1')} gear='Weapon1' slider={slider} />
                                                        <ItemTooltip item={items.find(x => x.slot === 'WeaponA2')} gear='Weapon2' slider={slider} />
                                                    </Col>
                                                    <Col className='flex column'>
                                                        <ItemTooltip item={items.find(x => x.slot === 'WeaponB1')} gear='Weapon1' slider={slider} />
                                                        <ItemTooltip item={items.find(x => x.slot === 'WeaponB2')} gear='Weapon2' slider={slider} />
                                                    </Col>
                                                </Row>
                                            </Col>

                                            <Col className='equipment-col-2'>
                                                <Attributes items={items} build={build} prof={prof} relic={relic ? relic[0] : ''} powerCore={powerCore ? powerCore[0] : ''} />
                                                <Col className='flex' style={{ marginTop: '-58px', justifyContent: 'center' }}>
                                                    <ItemTooltip item={powerCore ? powerCore[0] : ''} gear='JadeCore' slider={slider} />
                                                    <ItemTooltip item={relic ? relic[0] : ''} gear='Relic' slider={slider} />
                                                </Col>
                                                <Col className='flex'>
                                                    <ItemTooltip item={items.find(x => x.slot === 'Backpack')} gear='Backpack' slider={slider} />
                                                    <ItemTooltip item={items.find(x => x.slot === 'Accessory1')} gear='Accessory1' slider={slider} />
                                                    <ItemTooltip item={items.filter(x => x.slot === 'Accessory1').length == 2 ? items.find(x => x.slot === 'Accessory1') : items.find(x => x.slot === 'Accessory2')} gear='Accessory2' slider={slider} />
                                                </Col>
                                                <Col className='flex' style={{ marginBottom: '12px' }}>
                                                    <ItemTooltip item={items.find(x => x.slot === 'Amulet')} gear='Amulet' slider={slider} />
                                                    <ItemTooltip item={items.find(x => x.slot === 'Ring1')} gear='Ring1' slider={slider} />
                                                    <ItemTooltip item={items.filter(x => x.slot === 'Ring1').length == 2 ? items.find(x => x.slot === 'Ring1') : items.find(x => x.slot === 'Ring2')} gear='Ring2' slider={slider} />
                                                </Col>
                                                <Col className='flex' >
                                                    <ItemTooltip item={items.find(x => x.slot === 'HelmAquatic')} gear='HelmAquatic' slider={slider} />
                                                    <ItemTooltip item={items.find(x => x.slot === 'WeaponAquaticA')} gear='WeaponAquatic' slider={slider} />
                                                    <ItemTooltip item={items.find(x => x.slot === 'WeaponAquaticB')} gear='WeaponAquatic' slider={slider} />
                                                </Col>
                                            </Col>
                                        </>
                                    </Container>
                                </div>
                                <ChatLinks items={items} relic={relic ? relic[0] : ''} powerCore={powerCore ? powerCore[0] : ''} prof={prof} fashion={false} slider={slider} />
                            </>
                        )}
                </>
            )
        }
    </>
    );
}

export default Equipment;
