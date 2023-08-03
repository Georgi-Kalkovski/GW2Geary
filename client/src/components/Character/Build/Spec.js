import { useState } from 'react';
import { specIcons } from './specIcons';
import { usePopperTooltip } from 'react-popper-tooltip';

function Spec({ spec, prof }) {
    const [isVisible, setIsVisible] = useState(false);

    const {
        getArrowProps,
        getTooltipProps,
        setTooltipRef,
        setTriggerRef,
        visible,
    } = usePopperTooltip({
        trigger: 'hover',
        placement: 'top',
        closeOnOutsideClick: false,
        visible: isVisible,
        onVisibleChange: setIsVisible,
    });

    return (<>
        <div className='flex' style={{ width: '45px', height: '45px', marginRight: '-50px', cursor: 'pointer' }} ref={setTriggerRef}>
            <img
                src={spec !== null && specIcons.hasOwnProperty(spec.toLowerCase())
                    ? specIcons[spec.toLowerCase()]
                    : specIcons[prof.toLowerCase()]
                }
                alt="" />
        </div>
        {visible && (
            <div
                ref={setTooltipRef}
                {...getTooltipProps({ className: `tooltip-container` })}
            >
                <div className='attribute-popup'>
                    <div className='flex'>
                        {spec !== null && specIcons.hasOwnProperty(spec.toLowerCase()) ? spec : prof}
                    </div>

                </div>
                <div {...getArrowProps({ className: 'tooltip-arrow' })} />
            </div>
        )}

    </>)
}

export default Spec;