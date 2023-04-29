import React, { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import Popup from 'reactjs-popup';
import fetchData from '../../fetchData';

function ItemBox({ item }) {
    const [fetchedItemId, setFetchedItemId] = useState(null);
    const [skin, setSkin] = useState(null);
    const [stats, setStats] = useState(null);
    const [details, setDetails] = useState(null);
    const [rarity, setRarity] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!item || !item.id) {
            return;
        }

        (async () => {
            const fetchedItemId = await fetchData('items', item.id);
            setFetchedItemId(fetchedItemId);

            if (fetchedItemId) {
                setRarity(fetchedItemId.rarity.toLowerCase());
            }

            if (item.skin) {
                const skinResult = await fetchData('skins', item.skin);
                setSkin(skinResult);
            }

            if (item.stats) {
                setStats(item.stats);
            } else {
                const obj = fetchedItemId.details.infix_upgrade.attributes.reduce((acc, cur) => {
                    acc[cur.attribute] = cur.modifier;
                    return acc;
                }, {});
                const result = { id: fetchedItemId.id, attributes: obj };
                setStats(result)
            }

            if (fetchedItemId && fetchedItemId.details) {
                setDetails(fetchedItemId.details);
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
                    {
                        skin
                            ? <img className={`item-box box-${rarity}`} src={skin.icon} alt={skin.name} />
                            : fetchedItemId
                                ? <img className={`item-box box-${rarity}`} src={fetchedItemId.icon} alt={fetchedItemId.id} />
                                : <img className="item-box box-gray" alt="" />
                    }
                    
                    arrow={false}
                    position="right center"
                    on="hover"
                    offsetX={10}
                    mouseLeaveDelay={0}
                >
                    <Container className='item-popup'>
                        <Row className={`name-${rarity}`}>
                            {skin
                                ? <span>{skin?.name}</span>
                                : <span>{fetchedItemId?.name}</span>
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
                            <Row key={'stats' + fetchedItemId.id + key}>
                                <span className='green'>+ {stats.attributes[key]} {key}</span>
                            </Row>
                        ))}
                    </Container>
                </Popup>
            </div >
        </>
    );
}

export default ItemBox;
