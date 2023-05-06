import React, { useRef } from 'react';
import { usePopperTooltip } from 'react-popper-tooltip';

const TraitsTooltip = ({ description, skills, facts, name, children }) => {
    let ability = [];
    let reminder = [];
    let descript = []
    if (description.includes('<c=@abilitytype>')) {
        let parts = description.split(/(<c=@abilitytype>|<\/c>)/);
        for (let i = 0; i < parts.length; i++) {
            if (!parts[i].includes('<c=@abilitytype>') && !parts[i].includes('</c>')) {
                ability.push(parts[i].replace('<br/>', ''));
            }
        }
    } else if (description.includes('<c=@reminder>')) {
        let parts = description.split(/<c=@reminder>(.*?)<\/c>/);
        for (let i = 0; i < parts.length; i++) {
            if (!parts[i].includes('<c=@reminder>') && !parts[i].includes('</c>') && !parts[i].includes('<c=@reminder>')) {
                reminder.push(parts[i].replace('<br>', ''));
            }
        }
    } else {
        descript = description;
    }

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
    });

    const ref = useRef(null);
    return (
        <>
            <div ref={triggerRef => {
                ref.current = triggerRef;
                setTriggerRef(triggerRef);
            }}>{children}</div>
            {visible && (
                <div
                    ref={tooltipRef => {
                        ref.current = tooltipRef;
                        setTooltipRef(tooltipRef);
                    }}
                    {...getTooltipProps({ className: 'tooltip-container' })}
                >
                    <div className='build-popup'>
                        <div className='flex flex-centered spell-trait-name'>
                            {name}
                            {facts && facts.map((fact, index) => (
                                <div key={index} className="upgrade-gray fact-class">
                                    {fact.type === 'Recharge' &&
                                        <div className='flex'>
                                            <div>{fact.value}<img src={fact.icon} alt={index} /></div>
                                        </div>
                                    }
                                </div>
                            ))}
                        </div>

                        {ability && ability.map((item, index) => (
                            <span key={index} className={index % 2 === 1 ? "yellow-highlight" : ""}>
                                {item}
                            </span>
                        ))}
                        {reminder && reminder.map((item, index) => (
                            <div key={index} className={index % 2 === 1 ? "upgrade-gray" : ""}>
                                {item}
                            </div>
                        ))}
                        {descript}
                        {facts && facts.map((fact, index) => (
                            <div key={index} className="upgrade-gray fact-class">
                                {fact.type !== 'Recharge' &&
                                    (fact.type
                                        ?
                                        <div className='flex'>
                                            <div className='recharge-class'>
                                                <img src={fact.icon} alt={index} />
                                            </div>
                                            <div>
                                                {fact.status}{fact.duration ? '(' + fact.duration + 's): ' : ''}{fact.description}
                                            </div>
                                        </div>
                                        :
                                        <div>
                                            <img src={fact.icon} alt={index} /> {fact.text}
                                        </div>)
                                }
                            </div>
                        ))}
                    </div>
                    <br />
                    {skills && skills.length >= 1 && skills.map((item, index) => (
                        <div className='build-popup'>
                            <div className='flex spell-trait-name'>
                                {item.name}
                                {item.facts && item.facts.map((fact, index) => (
                                    <div key={index} className="upgrade-gray fact-class">
                                        {fact.type === 'Recharge' &&
                                            <div className='flex recharge-class'>
                                                {fact.value}<img src={fact.icon} alt={index} />
                                            </div>
                                        }
                                    </div>
                                ))}
                            </div>
                            <div key={index} className={index % 2 === 1 ? "upgrade-gray" : ""}>
                                {item.description}
                            </div>
                            {item.facts && item.facts.map((fact, index) => (
                                <div key={index} className="upgrade-gray fact-class">
                                    <img src={fact.icon} alt={index} /> {fact.text}
                                </div>
                            ))}
                        </div>
                    ))}
                    <div {...getArrowProps({ className: 'tooltip-arrow' })} />
                </div>
            )}
        </>
    );
};

export default TraitsTooltip;