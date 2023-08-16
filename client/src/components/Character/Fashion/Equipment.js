import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ItemTooltip from './ItemTooltip';
import '../Equipment/Equipment.css';
import Cog from '../../../cog.svg';
import Dragon from '../../../dragon.svg';

function Equipment({ items, prof }) {
    // console.log('items', items)
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, [items]);

    return (
        <Container className="equipment-box" style={{marginTop: '15px'}}>
            <Col>
                <Col className='flex column' style={{ marginRight: '20px' }}>
                    <ItemTooltip item={items.find(x => x.slot === 'Helm')} />
                    <ItemTooltip item={items.find(x => x.slot === 'Shoulders')} />
                    <ItemTooltip item={items.find(x => x.slot === 'Coat')} />
                    <ItemTooltip item={items.find(x => x.slot === 'Gloves')} />
                    <ItemTooltip item={items.find(x => x.slot === 'Leggings')} />
                    <ItemTooltip item={items.find(x => x.slot === 'Boots')} />

                </Col>
            </Col>
            <Col>
                <Col className='flex column'>
                    <ItemTooltip item={items.find(x => x.slot === 'Backpack')} />
                    <ItemTooltip item={items.find(x => x.slot === 'WeaponA1')} />
                    <ItemTooltip item={items.find(x => x.slot === 'WeaponA2')} />
                    <ItemTooltip item={items.find(x => x.slot === 'WeaponB1')} />
                    <ItemTooltip item={items.find(x => x.slot === 'WeaponB2')} />
                </Col>
            </Col>
        </Container>
    );
}

export default Equipment;
