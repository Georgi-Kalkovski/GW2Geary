import React, { useState } from 'react';
import { usePopperTooltip } from 'react-popper-tooltip';
import { Col, Row } from 'react-bootstrap';

const DyesTooltip = ({ dye, box, className }) => {
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
            <Col ref={setTriggerRef} >
                <Row className={`${box} dye-hover`}
                    style={{
                        backgroundColor: `rgb(${dye.cloth.rgb[0]}, ${dye.cloth.rgb[1]}, ${dye.cloth.rgb[2]})`
                    }}>
                </Row>
            </Col>
            {visible && (
                <div
                    ref={setTooltipRef}
                    {...getTooltipProps({ className: `tooltip-container ${className}` })}
                >
                    <div className='attribute-popup' style={{ boxShadow: '0 0 7px 2px rgba(204, 204, 204, 0.3)' }}>
                        <Row className='flex'>{dye.name}</Row>
                    </div>
                    <div {...getArrowProps({ className: 'tooltip-arrow' })} />
                </div>
            )}
        </>
    );
};

export default DyesTooltip;
