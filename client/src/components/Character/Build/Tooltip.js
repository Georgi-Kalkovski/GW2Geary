import React, { useState, useRef } from 'react';
import { usePopperTooltip } from 'react-popper-tooltip';
import { Container, Row, Col } from 'react-bootstrap';
import mouseClick from './img/mouse-click.svg'
const Tooltip = ({ tooltip, children, className }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [tooltipIndex, setTooltipIndex] = useState(0);

    // Handle click event to cycle through tooltips
    const handleClick = () => {
        setTooltipIndex((tooltipIndex + 1) % tooltip.skills.length);
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
    } = usePopperTooltip({
        placement: 'top-start',
        offset: [50],
        visible: isVisible,
        onVisibleChange: setIsVisible,
    });

    const ref = useRef(null);
    const ability = tooltip?.description.includes('<c=@abilitytype>')
        ? tooltip?.description.split(/(<c=@abilitytype>|<\/c>)/).filter(part => !part.includes('<c=@abilitytype>') && !part.includes('</c>')).map(part => part.replace('<br/>', ''))
        : [];
    const reminder = tooltip?.description.includes('<c=@reminder>')
        ? tooltip?.description.split(/<c=@reminder>(.*?)<\/c>/).filter(part => !part.includes('<c=@reminder>') && !part.includes('</c>') && !part.includes('<c=@reminder>')).map(part => part.replace('<br>', ''))
        : [];
    const descript = !ability.length && !reminder.length ? tooltip?.description : [];


    function TooltipComponent({ tooltip }) {
        return (

            <div className='build-popup'>
                {/* Trait Header */}
                <div className='flex spell-trait-name'>
                    {/* Name */}
                    {tooltip?.name}
                    {/* Recharge */}
                    {tooltip && tooltip.facts && tooltip.facts[0].type === 'Recharge' &&
                        <div className='flex recharge-div'>
                            <div className='upgrade-gray recharge-value'>
                                {tooltip.facts[0].value + ' '}
                            </div>
                            <img className='recharge-img' src={tooltip.facts[0].icon} alt={tooltip.facts.icon} />
                        </div>
                    }
                </div>

                {/* Body Description */}
                {/* adding yellow words to the description */}
                {ability &&
                    ability.map((item, index) => (
                        <span key={index} className={index % 2 === 1 ? 'yellow-highlight' : ''}>
                            {item}
                        </span>
                    ))}
                {/* adding gray words to the description */}
                {reminder &&
                    reminder.map((item, index) => (
                        <div key={index} className={index % 2 === 1 ? 'upgrade-gray' : ''}>
                            {item}
                        </div>
                    ))}
                {/* normal description without colored text */}
                {descript}

                {/* Body Effects */}
                {tooltip && tooltip.facts &&
                    tooltip.facts.map((fact, index) => (
                        <div key={index} className='upgrade-gray fact-font-size'>

                            {fact.type !== 'Recharge' &&
                                <div className='flex facts-div'>
                                    <div>
                                        <img src={fact.icon} alt={index} /><span> </span>
                                    </div>
                                    <div>
                                        {(() => {
                                            switch (fact.type) {
                                                case 'Distance':
                                                    return `${fact.text}: ${fact.distance}`;
                                                case 'Damage':
                                                    return `${fact.text}: [[[${fact.dmg_multiplier * 1000}]]]`;
                                                case 'Unblockable':
                                                    return fact.text;
                                                case 'Time':
                                                    return `${fact.text}: ${fact.duration}`;
                                                case 'Buff':
                                                    return `${fact.status}${fact.duration ? `(${fact.duration}s): ` : ''}${fact.description}`;
                                                case 'BuffConversion':
                                                    return `Gain ${fact.target} Power Based on a Percentage of ${fact.source}: ${fact.percent}%`;
                                                case 'Percent':
                                                    return `${fact.text}: ${fact.percent}%`;
                                                case 'AttributeAdjust':
                                                    return `${fact.target}: ${fact.value}`;
                                                case 'Number':
                                                    return `${fact.text}: ${fact.value}`;
                                                case 'PrefixedBuff':
                                                    return `${fact.status}${fact.duration ? `(${fact.duration}s): ` : ''}${fact.description}`;
                                                case 'Range':
                                                    return `${fact.text}: ${fact.value}`;
                                                case 'NoData':
                                                    return fact.text;
                                                default:
                                                    return '';
                                            }
                                        })()}
                                    </div>
                                </div>
                            }
                        </div>
                    ))}
            </div>
        );
    }
    return (
        <Container>
            <Row>
                <Col
                    ref={(triggerRef) => {
                        ref.current = triggerRef;
                        setTriggerRef(triggerRef);
                    }}
                    onClick={handleClick}
                >
                    {children}
                </Col>

                {visible && (
                    <Col
                        ref={(tooltipRef) => {
                            ref.current = tooltipRef;
                            setTooltipRef(tooltipRef);
                        }}
                        {...getTooltipProps({ className: `tooltip-container ${className}` })}
                    >
                        {tooltip && tooltip.skills && tooltip.skills.length === 1 &&
                            <div>
                                <TooltipComponent tooltip={tooltip.skills[0]} />
                                <br />
                            </div>
                        }


                        {tooltip && tooltip.skills && tooltip.skills.length > 1 &&
                            <div>
                                <TooltipComponent tooltip={currentTooltip} />
                                {tooltip && tooltip.skills && tooltip.skills.length > 1 &&
                                    <div className='build-popup flex facts-div'>
                                        <span>{`(${tooltipIndex + 1}/${tooltip.skills.length}) `}</span><img className='mouse-click' src={mouseClick} alt="" /><span>{` Mouse Click for more`}</span>
                                    </div>
                                }
                                <br />
                            </div>
                        }
                        <div className='lightning-border'>
                            {console.log(tooltip)}
                            <TooltipComponent tooltip={tooltip} />
                        </div>

                        <div {...getArrowProps({ className: 'tooltip-arrow' })} />
                    </Col>
                )}
            </Row>
        </Container>
    );

};

export default Tooltip;