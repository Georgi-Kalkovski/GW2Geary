import React, { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import Popup from 'reactjs-popup';
import fetchData from '../../fetchData';

function ItemBox({ item }) {
    const [id, setId] = useState(null);
    const [skin, setSkin] = useState(null);
    const [stats, setStats] = useState(null);
    const [lowerAttributes, setLowerAttributes] = useState(null);
    const [details, setDetails] = useState(null);
    const [rarity, setRarity] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!item || !item.id) {
            return;
        }
        (async () => {
            const idResult = await fetchData('items', item.id);
            setId(idResult);
            if (idResult) {
                setRarity(idResult.rarity.toLowerCase());
            }
            if (item.skin) {
                const skinResult = await fetchData('skins', item.skin);
                setSkin(skinResult);
            }
            if (item.stats) {
                setStats(item.stats);
            }
            if (id && id.details && id.details.infix_upgrade !== undefined && id.details.infix_upgrade.attributes !== undefined) {
                setLowerAttributes(id.details.infix_upgrade.attributes);
            }
            if (id && id.details) {
                setDetails(id.details);
            }
            setLoading(false);
        })();
    }, [item]);
    if (loading) {
        return <img className="item-box box-gray" alt="" />;
    }

    return (
        <>
            <div>
                <Popup
                    trigger=
                    {<img className={`item-box box-${rarity}`} src={skin?.icon || id.icon} alt={skin?.name || id.name} />}
                    arrow={false}
                    position="right center"
                    on="hover"
                    offsetX={10}
                    mouseLeaveDelay={0}
                >
                    <Container className='item-popup'>
                        <Row className={`name-${rarity}`}>
                            {skin
                                ? <span>{skin.name}</span>
                                : <span>{id.name}</span>
                            }
                        </Row>

                        <br />

                        {details && details.defense !== 0 && details.defense &&
                            <>
                                <Row key={'defense' + details.defense}> Defense: <span className='green'>{details.defense}</span></Row>
                                <br />
                            </>
                        }

                        {stats && stats.attributes && Object.keys(stats.attributes).map(key => (
                            <Row key={'stats' + stats.id + key}>
                                <span className='green'>+ {stats.attributes[key]} {key}</span>
                            </Row>
                        ))}

                        {lowerAttributes && lowerAttributes.map(key => (
                            <Row key={'lowerAttributes' + key.attribute + key.modifier}>
                                <span className='green'>+ {key.modifier} {key.attribute} </span>
                            </Row>
                        ))}
                    </Container>
                </Popup>
            </div >
        </>
    );
}

export default ItemBox;
