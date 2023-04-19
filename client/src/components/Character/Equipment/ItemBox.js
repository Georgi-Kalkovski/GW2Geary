import { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import Popup from 'reactjs-popup';
import fetchData from '../../fetchData';
import './ItemBox.css';

function ItemBox({ char, item }) {
    const [id, setId] = useState(null);
    const [skin, setSkin] = useState(null);
    const [stats, setStats] = useState(null);
    const [attributes, setAttributes] = useState(null);
    const [lowerAttributes, setLowerAttributes] = useState(null);
    const [details, setDetails] = useState(null);
    const [rarity, setRarity] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function logItem() {
            const newItem = await item;
            if (newItem && newItem.id) {
                const idResult = await fetchData('items', newItem.id);
                setId(idResult);
                if (idResult) {
                    setRarity(idResult.rarity.toLowerCase());
                }
                if (newItem.skin) {
                    const skinResult = await fetchData('skins', newItem.skin);
                    setSkin(skinResult);
                }
                if (newItem.stats) {
                    setStats(newItem.stats);
                } else {
                    for (const equip of char.equipment) {
                        if (newItem.id === equip.id) {
                            setAttributes(equip.stats)
                        }
                    }
                }
                if (id && id.details && id.details.infix_upgrade !== undefined && id.details.infix_upgrade.attributes !== undefined) {
                    setLowerAttributes(id.details.infix_upgrade.attributes);
                }
                if (id && id.details) {
                    setDetails(id.details);
                }
                setLoading(false);
            }
        }

        logItem();
    }, [item]);

    if (loading) {
        return <img className="item-box box-gray" alt="" />;
    }

    return (
        <>
            <div>
                <Popup
                    trigger=
                    {skin
                        ? <img className={'item-box box-' + rarity} src={skin.icon} alt={skin.name} />
                        : <img className={'item-box box-' + rarity} src={id.icon} alt={id.name} />
                    }
                    arrow={false}
                    position="right center"
                    on={'hover'}
                >
                    <Container className='item-popup'>
                        <Row className={'name-' + rarity}>
                            {skin
                                ? <span>{skin.name}</span>
                                : <span>{id.name}</span>
                            }
                        </Row>
                        <br />
                        {details && details.defense !== 0 && details.defense &&
                            <>
                                <Row> Defense: <span className='green'>{details.defense}</span></Row>
                                <br />
                            </>
                        }
                        {stats && stats.attributes && Object.keys(stats.attributes).map(key => (
                            <Row key={key}>
                                <span className='green'>+{stats.attributes[key]} {key}</span>
                            </Row>
                        ))}
                        {attributes && attributes.attributes && Object.keys(attributes.attributes).map(key => (
                            <Row key={key}>
                                <span className='green'>+{attributes.attributes[key]} {key}</span>
                            </Row>
                        ))}
                        {lowerAttributes && lowerAttributes.map(key => (
                            <Row key={key.attribute}>
                                <span className='green'>+{key.attribute} {key.modifier}</span>
                            </Row>
                        ))}
                    </Container>
                </Popup>
            </div >
        </>
    );
}

export default ItemBox;
