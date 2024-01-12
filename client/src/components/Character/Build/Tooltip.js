import React, { useState, useRef } from 'react';
import { usePopperTooltip } from 'react-popper-tooltip';
import { Container, Row, Col } from 'react-bootstrap';
import mouseClick from '.././mouse-click.svg'
import TooltipComponent from './TooltipComponent';

const Tooltip = ({ tooltip, prof, children, className }) => {
    const [tooltipIndex, setTooltipIndex] = useState(0);

    const handleClick = () => {
        if (tooltip && tooltip.skills && tooltip.skills.length > 1) {
            setTooltipIndex((tooltipIndex + 1) % tooltip.skills.length);
        }
    };

    let currentTooltip;
    if (tooltip && tooltip.skills) {
        currentTooltip = tooltip.skills[tooltipIndex];
    }

    const {
        getArrowProps,
        getTooltipProps,
        setTooltipRef,
        setTriggerRef,
        visible,
    } = usePopperTooltip(innerWidth < 900
        ? { placement: 'top' }
        : { followCursor: true, placement: 'top', offset: [10, 10] });

    const ability = tooltip?.description?.includes('<c=@abilitytype>')
        ? tooltip?.description.split(/(<c=@abilitytype>|<\/c>)/).filter(part => !part.includes('<c=@abilitytype>') && !part.includes('</c>')).map(part => part.replace('<br/>', ''))
        : [];
    const reminder = tooltip?.description?.includes('<c=@reminder>')
        ? tooltip?.description.split(/<c=@reminder>(.*?)<\/c>/).filter(part => !part.includes('<c=@reminder>') && !part.includes('</c>') && !part.includes('<c=@reminder>')).map(part => part.replace('<br>', ''))
        : [];
    const descript = !ability.length && !reminder.length ? tooltip?.description : [];
 
    return (
        <Container>
            <Row>
                <Col
                    ref={setTriggerRef}
                    onClick={handleClick}
                >
                    {children}
                </Col>

                {visible && (
                    <Col
                        ref={setTooltipRef}
                        {...getTooltipProps({ className: `tooltip-container ${className}` })}
                    >
                        {tooltip && tooltip.skills && tooltip.skills.length === 1 &&
                            <div>
                                <TooltipComponent tooltip={tooltip.skills[0]} descript={descript} ability={ability} reminder={reminder}/>
                                <br />
                            </div>
                        }


                        {tooltip && tooltip.skills && tooltip.skills.length > 1 &&
                            <div>
                                <TooltipComponent tooltip={currentTooltip} descript={descript} ability={ability} reminder={reminder}/>
                                {tooltip && tooltip.skills && tooltip.skills.length > 1 &&
                                    <div className='build-popup flex facts-div'>
                                        <span>{`(${tooltipIndex + 1}/${tooltip.skills.length}) `}</span><img className='mouse-click' src={mouseClick} alt="" /><span>{` Mouse Click for more`}</span>
                                    </div>
                                }
                                <br />
                            </div>
                        }
                        <div className={`${prof.toLowerCase()}-lightning-border`}>
                            <TooltipComponent tooltip={tooltip} descript={descript} ability={ability} reminder={reminder}/>
                        </div>

                        <div {...getArrowProps({ className: 'tooltip-arrow' })} />
                    </Col>
                )}
            </Row>
        </Container>
    );
};

export default Tooltip;
