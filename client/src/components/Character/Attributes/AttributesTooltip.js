import React, { useState } from 'react';
import { usePopperTooltip } from 'react-popper-tooltip';
import { Col, Row } from 'react-bootstrap';

const AttributesTooltip = ({ name, icon, value, className }) => {
    const [isVisible, setIsVisible] = useState(false);

    const {
        getArrowProps,
        getTooltipProps,
        setTooltipRef,
        setTriggerRef,
        visible,
    } = usePopperTooltip({
        trigger: 'hover',
        placement: 'top-start',
        closeOnOutsideClick: false,
        visible: isVisible,
        onVisibleChange: setIsVisible,
    });

    return (
        <>
            <Col ref={setTriggerRef}>
                <Row className="flex cursor attribute" ><img src={icon} alt={name} style={{paddingRight: '5px', width:'20px'}}/> {value}</Row>
            </Col>
            {visible && (
                <div
                    ref={setTooltipRef}
                    {...getTooltipProps({ className: `tooltip-container ${className}` })}
                >
                    <div className='attribute-popup'>
                        <Row className='flex'><img src={icon} alt={name} /> {name}</Row>
                    </div>
                    <div {...getArrowProps({ className: 'tooltip-arrow' })} />
                </div>
            )}
        </>
    );
};

export default AttributesTooltip;
