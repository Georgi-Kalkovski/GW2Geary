import React, { useState } from "react";
import { Container } from "react-bootstrap";

function ChatLinks({ items, prof, fashion, relic, powerCore }) {
    const [buttonColor1, setButtonColor1] = useState('');
    const [buttonColor2, setButtonColor2] = useState('');

    function createWardrobeLinks(ids) {
        let links = [];
        for (let id of ids) {
            // Convert the ID to a 3-byte little-endian integer
            let idBuffer = new ArrayBuffer(4);
            let idView = new DataView(idBuffer);
            idView.setUint32(0, id, true);

            // Create a buffer for the link data
            let linkBuffer = new ArrayBuffer(5);
            let linkView = new DataView(linkBuffer);

            // Set the header to 0x0A for a wardrobe link
            linkView.setUint8(0, 0x0A);

            // Set the ID
            linkView.setUint8(1, idView.getUint8(0));
            linkView.setUint8(2, idView.getUint8(1));
            linkView.setUint8(3, idView.getUint8(2));

            // Set the unused byte to zero
            linkView.setUint8(4, 0);

            // Encode the link data as a Base64 string
            let base64 = btoa(String.fromCharCode(...new Uint8Array(linkBuffer)));

            // Add the chat link to the array of links
            links.push("[&" + base64 + "]");
        }
        return links;
    }

    const slotOrder = ['Helm', 'Shoulders', 'Coat', 'Gloves', 'Leggings', 'Boots', 'WeaponA1', 'WeaponA2', 'WeaponB1', 'WeaponB2', 'Backpack', 'Accessory1', 'Accessory2', 'Amulet', 'Ring1', 'Ring2', 'HelmAquatic', 'WeaponAquaticA', 'WeaponAquaticB'];

    const orderedItems = items
        .filter(x => slotOrder.includes(x.slot))
        .sort((a, b) => slotOrder.indexOf(a.slot) - slotOrder.indexOf(b.slot));

    const copyItems = () => {
        navigator.clipboard.writeText(orderedItems
            .filter(x =>
                !['HelmAquatic', 'WeaponAquaticA', 'WeaponAquaticB']
                    .includes(x.slot)
            )
            .concat([relic, powerCore])
            .map(x => x.chat_link)
            .join(''))
            .then(() => {
                setButtonColor1('darkgreen');
                setTimeout(() => {
                    setButtonColor1('');
                }, 250);
            })
            .catch(err => {
                console.error('Copying failed:', err);
            });
    };

    const copySkins = () => {
        navigator.clipboard.writeText(createWardrobeLinks(orderedItems
            .filter(x =>
                !['HelmAquatic', 'WeaponAquaticA', 'WeaponAquaticB', 'Accessory1', 'Accessory2', 'Ring1', 'Ring2', 'Amulet']
                    .includes(x.slot)
            )
            .map(x => x.skin))
            .join(', '))
            .then(() => {
                setButtonColor2('darkgreen');
                setTimeout(() => {
                    setButtonColor2('');
                }, 250);
            })
            .catch(err => {
                console.error('Copying failed:', err);
            });
    };

    return (<>
        {!fashion
            ? (<Container>
                <div className='template-container'>
                    <button
                        className={`class-hover ${prof.toLowerCase()}-border template-button`}
                        onClick={copyItems}
                        style={{ backgroundColor: buttonColor1, transition: 'background-color 0.3s ease-out', marginRight: '7px' }}
                    >
                        Copy Items
                    </button>
                    <button
                        className={`class-hover ${prof.toLowerCase()}-border template-button`}
                        onClick={copySkins}
                        style={{ backgroundColor: buttonColor2, transition: 'background-color 0.3s ease-out' }}
                    >
                        Copy Fashion
                    </button>
                </div>
            </Container>
            ) : (
                <Container>
                    <div className='template-container' style={window.innerWidth >= 900 ? { marginTop: '50px' } : {}}>
                        <button
                            className={`class-hover ${prof.toLowerCase()}-border template-button`}
                            onClick={copySkins}
                            style={{ backgroundColor: buttonColor2, transition: 'background-color 0.3s ease-out' }}
                        >
                            Copy Fashion
                        </button>
                    </div>
                </Container>
            )

        }
    </>);
}

export default ChatLinks;