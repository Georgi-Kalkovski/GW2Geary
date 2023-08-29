import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import axios from 'axios';

function ChatLinks({ items, prof }) {

    const [buttonColor, setButtonColor] = useState('');

    const copyText = () => {
        navigator.clipboard.writeText(items
            .filter(x =>
                !['HelmAquatic', 'WeaponAquaticA', 'WeaponAquaticB', 'Accessory1', 'Accessory2', 'Ring1', 'Ring2', 'Amulet']
                    .includes(x.slot)
            )
            .map(x => x.chat_link)
            .join('|'))
            .then(() => {
                setButtonColor('darkgreen');
                setTimeout(() => {
                    setButtonColor('');
                }, 250);
            })
            .catch(err => {
                console.error('Copying failed:', err);
            });
    };
    const result = ('4').toString();
    console.log(result)
    const binaryWithPadding = result;
    const hexFromBinary = binaryWithPadding.toString(16); // Convert binary to hex
    console.log(hexFromBinary)

    const base64Encoded = btoa(hexFromBinary).padEnd(10, 'A'); // Encode to base64
    console.log(base64Encoded)
    return (<>
        <Container>
            <div className='template-container'>
                <input
                    className={`${prof.toLowerCase()}-lightning-border template-text`}
                    type='text'
                    value={items.filter(x => !['HelmAquatic', 'WeaponAquaticA', 'WeaponAquaticB', 'Accessory1', 'Accessory2', 'Ring1', 'Ring2', 'Amulet'].includes(x.slot)).map(x => x.chat_link).join('|')}
                    readOnly
                /> <button
                    className={`${prof.toLowerCase()}-border template-button`}
                    onClick={copyText}
                    style={{ backgroundColor: buttonColor, transition: 'background-color 0.3s ease-out' }}
                >
                    Copy
                </button>
            </div>
        </Container>
    </>);
}

export default ChatLinks;