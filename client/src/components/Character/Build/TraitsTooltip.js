import React, { useRef, useState } from 'react';
import { usePopperTooltip } from 'react-popper-tooltip';

const TraitsTooltip = ({ trait, name, icon, children }) => {
    let ability = [];
    let reminder = [];
    let description = [];
    if (trait.description.includes('<c=@abilitytype>')) {
        let parts = trait.description.split(/(<c=@abilitytype>|<\/c>)/);
        for (let i = 0; i < parts.length; i++) {
            if (!parts[i].includes('<c=@abilitytype>') && !parts[i].includes('</c>')) {
                ability.push(parts[i].replace('<br/>', ''));
            }
        }
    } else if (trait.description.includes('<c=@reminder>')) {
        let parts = trait.description.split(/<c=@reminder>(.*?)<\/c>/);
        for (let i = 0; i < parts.length; i++) {
            if (!parts[i].includes('<c=@reminder>') && !parts[i].includes('</c>') && !parts[i].includes('<c=@reminder>')) {
                reminder.push(parts[i].replace('<br>', ''));
            }
        }
    } else {
        description = trait.description;
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
                        <div className='flex flex-centered'><img className="skill-box" src={icon} alt={name} /> <h3 className='spell-trait-name'>{name}</h3></div>
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
                        {description}
                    </div>
                    <br />
                    {trait.skills && trait.skills.length >= 1 && trait.skills && trait.skills.length >= 1 && trait.skills.map((item, index) => (
                        <div className='build-popup'>
                            <div className='flex flex-centered'> <h3 className='spell-trait-name'>{item.name}</h3></div>

                            <div key={index} className={index % 2 === 1 ? "upgrade-gray" : ""}>
                                {item.description}
                            </div>
                        </div>
                    ))}
                    <div {...getArrowProps({ className: 'tooltip-arrow' })} />
                </div>
            )}
        </>
    );
};

export default TraitsTooltip;