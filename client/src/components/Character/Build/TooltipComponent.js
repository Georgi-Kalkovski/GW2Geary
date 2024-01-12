function TooltipComponent({ tooltip, descript, ability, reminder }) {
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
                tooltip.facts
                    .filter((fact, index, self) => self.findIndex(f => f.text === fact.text) === index)
                    .map((fact, index) => (
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
                                                case 'Duration':
                                                    return `${fact.text}`;
                                                case 'ComboField':
                                                    return `${fact.text}: ${fact.field_type}`;
                                                case 'ComboFinisher':
                                                    return `${fact.text}: ${fact.finisher_type}`;
                                                case 'Damage':
                                                    return `${fact.text}: ${Math.floor((fact.dmg_multiplier * 1000) / 1.53)}`;
                                                case 'Unblockable':
                                                    return fact.text;
                                                case 'StunBreak':
                                                    return 'Breaks Stun';
                                                case 'Time':
                                                    return `${fact.text}: ${fact.duration}`;
                                                case 'Buff':
                                                    return `${fact.status}${fact.duration ? `(${fact.duration}s): ` : ''}${fact.description}`;
                                                case 'BuffConversion':
                                                    return `Gain ${fact.target} Power Based on a Percentage of ${fact.source}: ${fact.percent}%`;
                                                case 'Percent':
                                                    return `${fact.text}: ${fact.percent}%`;
                                                case 'AttributeAdjust':
                                                    return `${fact.text ? fact.text : fact.target}: ${fact.value}`;
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

export default TooltipComponent