import { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import Popup from 'reactjs-popup';
import fetchData from '../fetchData';
import './ItemBox.css';

function ItemBox({ item }) {
    const [id, setId] = useState(null);
    const [skin, setSkin] = useState(null);
    const [stats, setStats] = useState(null);
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function logItem() {
            const newItem = await item;
            if (newItem.id) {
                fetchData('items', newItem.id)
                    .then(setId)
                    .finally(() => setLoading(false));
            }
            if (newItem.skin) {
                fetchData('skins', newItem.skin)
                    .then(setSkin)
                    .finally(() => setLoading(false));
            }
            if (newItem.stats) {
                setStats(newItem.stats);
            }
            if (newItem.details) {
                setDetails(newItem.details);
            }
        }
        logItem();
    }, [item]);

    if (loading) {
        return <img className="item-box" alt="" />;
    }

    return (
        <>
            <div>
                <Popup
                    trigger=
                    {skin
                        ? <img className="item-box" src={skin.icon} alt="" />
                        : <img className="item-box" src={id.icon} alt="" />
                    }
                    arrow={false}
                    position="right center"
                    on={'hover'}
                >
                    <Container className='item-popup'>
                        <Row>
                            {skin
                                ? <span>{skin.name}</span>
                                : <span>{id.name}</span>
                            }
                        </Row>
                        <br />
                        {details && details.defence &&
                            <>
                                <Row>Defence: <span className='green'>{details.defence}</span></Row>
                                <br />
                            </>
                        }
                        {stats && Object.keys(stats.attributes).map(key => (
                            <Row key={key}>
                                <span className='green'>+{stats.attributes[key]} {key}</span>
                            </Row>
                        ))}
                    </Container>
                </Popup>
            </div>
        </>
    );
}

export default ItemBox;
