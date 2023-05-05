import React, { useState } from 'react';
import { usePopperTooltip } from 'react-popper-tooltip';
import { Col } from 'react-bootstrap';

const SkillsTooltip = ({ name, icon, tooltipText, className }) => {
    const [isVisible, setIsVisible] = useState(false);

    const {
        getArrowProps,
        getTooltipProps,
        setTooltipRef,
        setTriggerRef,
        visible,
    } = usePopperTooltip({
        trigger: 'hover',
        placement: 'right',
        closeOnOutsideClick: false,
        visible: isVisible,
        onVisibleChange: setIsVisible,
    });

    return (
        <>
            <Col ref={setTriggerRef}>
                <img className="skill-box cursor" src={icon} alt={name} />
            </Col>
            {visible && (
                <div
                    ref={setTooltipRef}
                    {...getTooltipProps({ className: `tooltip-container ${className}` })}
                >
                    <div className='build-popup'>
                        <div className='flex flex-centered'><img className="skill-box" src={icon} alt={name} /> <h3>{name}</h3></div>
                        <span>{tooltipText}</span>
                    </div>
                    <div {...getArrowProps({ className: 'tooltip-arrow' })} />
                </div>
            )}
        </>
    );
};

export default SkillsTooltip;
