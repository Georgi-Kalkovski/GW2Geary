import React from 'react';
import { useState } from "react";
import { usePopperTooltip } from 'react-popper-tooltip';
import mouseClick from '../mouse-click.svg'

function CharacterShareLink({ buildInput, shareLink }) {
    const [buttonColor, setButtonColor] = useState('');

    const copyText = () => {
        navigator?.clipboard?.writeText(shareLink.toString());
        setButtonColor('darkgreen');
        setTimeout(() => {
            setButtonColor('');
        }, 250);
    };

    const {
        getArrowProps,
        getTooltipProps,
        setTooltipRef,
        setTriggerRef,
        visible,
    } = usePopperTooltip({ placement: 'top' });

    return (<>
        {buildInput &&
            <div>
                <button
                    className={`${buildInput.toLowerCase()}-border template-button`}
                    onClick={copyText}
                    style={{ backgroundColor: buttonColor, transition: 'background-color 0.3s ease-out' }}
                    ref={setTriggerRef}>
                    Copy Link
                </button>

                {/* {visible && (
                    <div
                        ref={setTooltipRef}
                        {...getTooltipProps({ className: 'tooltip-container attribute-popup' })}
                    >
                        <div>
                            <img className='mouse-click' src={mouseClick} alt="" />
                            <span className='yellow-popup'>Click</span> to <span className='save'>Copy</span> Link
                        </div>
                        <div {...getArrowProps({ className: 'tooltip-arrow' })} />
                    </div>
                )} */}
            </div>
        }
    </>)
}

export default CharacterShareLink;