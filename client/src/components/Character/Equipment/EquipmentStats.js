import React from "react";

function EquipmentStats({ prof, items }) {
    const stats = [];
    const upgrades = [];
    const finishedItemstats = [];
    const infusions = [];
    const emptyPrefixes = [];
    const emptyRunes = [];
    const emptySigils = [];
    const emptyInfusions = [];

    let itemstats = items[0]?.itemstats;

    if (items) {
        for (const item of items) {
            if (
                item.slot != "HelmAquatic" &&
                item.slot != "WeaponAquaticA" &&
                item.slot != "WeaponAquaticB"
            ) {
                // Check if empty

                // Empty Prefixes
                if (!item.details.infix_upgrade && !item.stats) {
                    emptyPrefixes.push(item.details.type)
                }
                //console.log(item)
                // Empty Runes
                const nonRuneCount = item.upgrades.filter(x => x.details.type !== 'Rune').length;
                if (item.details.defense
                    && item.details.defense > 0
                    && item.upgrades.length - nonRuneCount < item.details.infusion_slots.length) {
                    emptyRunes.push({
                        type: item.details.type,
                        amount: item.details.infusion_slots.length - item.upgrades.length
                    });
                }
                // Empty Sigils
                const nonSigilCount = item.upgrades.filter(x => x.details.type !== 'Sigil').length;
                if (item.details.min_power
                    && item.details.max_power
                    && item.upgrades.length - nonSigilCount < item.details.infusion_slots.length) {
                    emptySigils.push({
                        type: item.details.type,
                        amount: item.details.infusion_slots.length - item.upgrades.length
                    });
                }

                // Empty Infusions
                const nonInfusionCount = item.upgrades.filter(x => x.details.type !== 'Default').length;
                if (item.upgrades.length - nonInfusionCount < item.details.infusion_slots.length) {
                    emptyInfusions.push({
                        type: item.details.type || item.slot,
                        amount: item.details.infusion_slots.length - item.upgrades.length
                    });
                }


                // Upgrades Logic
                for (const upgrade of item.upgrades) {
                    const existingUpgrade = upgrades.find((u) => u.name === upgrade.name);

                    if (existingUpgrade) {
                        existingUpgrade.items.push({
                            name: item.name,
                            type: item.details.type || item.slot,
                        });
                    } else {
                        upgrades.push({
                            name: upgrade.name,
                            items: [
                                { name: item.name, type: item.details.type },
                            ],
                            type: upgrade.details.type || item.slot,
                        });
                    }
                }

                // Stats Logic
                if (item.stats) {
                    const statsObject = {
                        id: item.stats.id,
                        name: item.name,
                        attributes: item.stats.attributes,
                        type: item.details.type || item.slot,
                    };
                    stats.push(statsObject);
                }
                if (item.details && item.details.infix_upgrade) {
                    const infixObject = {
                        name: item.name,
                        id: item.details.infix_upgrade.id,
                        attributes: item.details.infix_upgrade.attributes,
                        type: item.details.type || item.slot,
                    };
                    stats.push(infixObject);
                }

                // Infusions
                for (const infusion of item.upgrades) {
                    if (infusion.details.type === 'Default') {
                        const attributes = infusion.details?.infix_upgrade?.attributes;
                        let itemOutput = '';
                        if (attributes && attributes.length > 0) {
                            for (let i = 0; i < attributes.length; i++) {
                                const attribute = attributes[i].attribute;
                                if (item.upgrades?.find(x => x.details?.infix_upgrade?.attributes.find(x => x.attribute === attribute))) {
                                    itemOutput = item.details.type || item.slot;
                                }
                                const modifier = attributes[i].modifier;

                                if (attribute !== undefined) {
                                    const existingInfusion = infusions.find(
                                        (i) =>
                                            i.attribute === attribute &&
                                            i.modifier === modifier
                                    );

                                    if (existingInfusion) {
                                        existingInfusion.count++;
                                        if (!existingInfusion.items.includes(itemOutput)) {
                                            existingInfusion.items.push(itemOutput);
                                        }
                                    } else {
                                        const newInfusion = {
                                            attribute,
                                            modifier,
                                            count: 1,
                                            items: [itemOutput],
                                        };
                                        infusions.push(newInfusion);
                                    }
                                }
                            }
                        }
                    }
                }
            } else {

            }
        }

        // Itemstats Logic
        if (itemstats) {
            for (const itemstat of itemstats) {
                for (const stat of stats) {
                    if (itemstat.id === stat.id) {
                        const existingItem = finishedItemstats.find(
                            (item) => item.name === itemstat.name
                        );
                        if (existingItem) {
                            existingItem.items.push({
                                name: stat.name,
                                type: stat.type,
                                attributes: stat.attributes
                            });
                        } else {
                            const result = {
                                name: itemstat.name,
                                items: [
                                    { name: stat.name, type: stat.type },
                                ],
                            };
                            finishedItemstats.push(result);
                        }
                    }
                }
            }
        }
    }

    const aquaticHelm = items.find(x => x.slot == 'HelmAquatic');
    const WeaponAquaticA = items.find(x => x.slot == 'WeaponAquaticA');
    const WeaponAquaticB = items.find(x => x.slot == 'WeaponAquaticB');
    return (
        <div className={`flex column itemstats ${prof.toLowerCase()}-lightning-border`}>
            {/* Prefixes */}
            {finishedItemstats &&
                (<div>
                    <div>
                        <span className="yellow-highlight">Prefixes</span>:
                    </div>
                    {
                        finishedItemstats &&
                        finishedItemstats.map((itemstat, index) => (
                            <>
                                {itemstat.name !== '' &&
                                    <div key={index}>
                                        <span className="itemname">{itemstat.items.length}x {itemstat.name.split("'")[0]} </span>
                                        <span className="itemtypes">- {itemstat.items.map((x, i) => x.type).join(", ")}</span>
                                    </div>
                                }
                            </>
                        ))
                    }
                    {
                        emptyPrefixes && emptyPrefixes.length !== 0 &&
                        <div>
                            <span className="itemname" style={{ color: '#ff1e1e' }}>Missing prefixes </span>
                            <span className="itemtypes">- {emptyPrefixes}</span>
                        </div>
                    }

                </div>)}

            {/* Runes */}
            < div className="itemstat" >
                <span className="yellow-highlight">Runes</span>:
            </div >
            <div>
                {upgrades &&
                    upgrades.map((upgrade, index) => (
                        <React.Fragment key={index}>
                            {upgrade.type === "Rune" && (
                                <div key={index}>
                                    <span className="itemname">{upgrade.items.length}x {upgrade.name} </span>
                                    <span className="itemtypes">- {upgrade.items.map((x, i) => x.type).join(", ")}</span>
                                </div>
                            )}
                        </React.Fragment>
                    ))
                }
                {emptyRunes && emptyRunes.length !== 0 &&
                    <div>
                        <span span className="itemname" style={{ color: '#ff1e1e' }}>Missing runes </span>
                        <span className="itemtypes">- {emptyRunes.map((x, i) => x.amount > 1 ? `${x.amount}x ${x.type}` : x.type).join(", ")}</span>
                    </div>
                }
            </div>

            {/* Sigils */}
            <div className="itemstat">
                <span className="yellow-highlight">Sigils</span>:
            </div>
            {
                upgrades &&
                upgrades.map((upgrade, index) => (
                    <div key={index}>
                        {upgrade.type == "Sigil" && (
                            <React.Fragment key={index}>
                                <span className="itemname">{upgrade.items.length}x {upgrade.name} </span>
                                <span className="itemtypes">- {upgrade.items.map((x, i) => x.type).join(", ")}</span>
                            </React.Fragment>
                        )}
                    </div>
                ))
            }
            {emptySigils && emptySigils.length !== 0 &&
                <div>
                    <span span className="itemname" style={{ color: '#ff1e1e' }}>Missing sigils </span>
                    <span className="itemtypes">- {emptySigils.map((x, i) => x.amount > 1 ? `${x.amount}x ${x.type}` : x.type).join(", ")}</span>
                </div>
            }

            {/* Infusions */}
            <div className="itemstat">
                <span className="yellow-highlight">Infusions</span>:
            </div>
            {
                infusions &&
                infusions.map((infusion, index) => (
                    <div key={index}>
                        {(() => {
                            if (infusion.attribute === 'CritDamage') { infusion.attribute = 'Ferocity' }
                            if (infusion.attribute === 'ConditionDamage') { infusion.attribute = 'Condition Damage' }
                            if (infusion.attribute === 'ConditionDuration') { infusion.attribute = 'Expertise' }
                            if (infusion.attribute === 'BoonDuration') { infusion.attribute = 'Concentration' }
                            if (infusion.attribute === 'AgonyResistance') { infusion.attribute = 'Agony Resistance' }
                        })()}
                        <span className="yellow-highlight itemtypes">{infusion.count}x</span>
                        <span className="itemname"> +{infusion.modifier} {infusion.attribute} </span>
                        <span className="off-text itemtypes">(+{infusion.count * infusion.modifier}) </span>
                        <span className="itemtypes">- {infusion.items.join(", ")}</span>
                    </div>
                ))
            }
            {emptyInfusions && emptyInfusions.length !== 0 &&
                <div>
                    <span span className="itemname" style={{ color: '#ff1e1e' }}>Missing infusions </span>
                    <span className="itemtypes">- {emptyInfusions.map((x, i) => x.amount > 1 ? `${x.amount}x ${x.type}` : x.type).join(", ")}</span>
                </div>
            }

            {/* Underwater Content */}
            <div className="itemstat" style={{ fontSize: '12px' }}>
                {/* Aquatic Helm */}
                {aquaticHelm
                    ? <div>
                        {/* Name */}
                        <span className="yellow-highlight ">Aquatic Headgear </span>
                        - <span>
                            {/* Prefix */}
                            <span className="itemname">
                                {aquaticHelm.itemstats.find(
                                    (x) =>
                                        x.id === aquaticHelm.stats?.id ||
                                        x.id === aquaticHelm.details.infix_upgrade.id
                                )?.name.split("'")[0] || aquaticHelm.details.infix_upgrade.name}
                            </span>
                            {/* Rune */}
                            , <span className="itemname">
                                {aquaticHelm.upgrades?.find((x) => x.details.type === 'Rune')?.name || (
                                    <span style={{ color: '#ff1e1e' }}>Missing rune</span>
                                )}
                            </span>
                            {/* Infusion */}
                            {aquaticHelm.rarity === 'Legendary' || aquaticHelm.rarity === 'Ascended' &&
                                <>
                                    , <span className="itemname">
                                        {aquaticHelm.upgrades?.find((x) => x.details.type === 'Default')?.name || (
                                            <span style={{ color: '#ff1e1e' }}>Missing infusion</span>
                                        )}
                                    </span>
                                </>
                            }
                        </span>
                    </div>
                    : ''
                }

                {/* Aquatic Weapon A */}
                {WeaponAquaticA
                    ? <div>
                        <span className="yellow-highlight ">Aquatic {WeaponAquaticA.details.type} </span>
                        - <span>
                            <span className="itemname">
                                {WeaponAquaticA.itemstats.find(x =>
                                    x.id === WeaponAquaticA.stats?.id
                                    || x.id === WeaponAquaticA.details.infix_upgrade.id
                                )?.name.split("'")[0]
                                    || WeaponAquaticA.details.infix_upgrade.name
                                }
                            </span>
                            {/* Sigils */}
                            <span>
                                {WeaponAquaticA.upgrades?.filter(x => x.details.type === 'Sigil').map((upgrade, index) => (
                                    <>
                                        , <span key={index} className="itemname">
                                            {upgrade.name}
                                        </span>
                                    </>
                                ))}
                                {WeaponAquaticA.upgrades?.filter(x => x.details.type === 'Sigil').length < 2 ? (
                                    <>
                                        , <span className="itemname">
                                            {WeaponAquaticA.upgrades?.filter(x => x.details.type === 'Sigil').length === 0
                                                ? <span style={{ color: '#ff1e1e' }}>2x Missing sigils</span>
                                                : <span style={{ color: '#ff1e1e' }}>Missing sigil</span>}
                                        </span>
                                    </>
                                ) : null}
                            </span>

                            {/* Infusion */}
                            {WeaponAquaticA.rarity === 'Legendary' || WeaponAquaticA.rarity === 'Ascended' &&
                                <>
                                    <span>
                                        {WeaponAquaticA.upgrades?.filter(x => x.details.type === 'Default').map((upgrade, index) => (
                                            <>
                                                , <span key={index} className="itemname">
                                                    {upgrade.name}
                                                </span>
                                            </>
                                        ))}
                                        {WeaponAquaticA.upgrades?.filter(x => x.details.type === 'Default').length < 2 ? (
                                            <>
                                                , <span className="itemname">
                                                    {WeaponAquaticA.upgrades?.filter(x => x.details.type === 'Default').length === 0
                                                        ? <span style={{ color: '#ff1e1e' }}>2x Missing infusions</span>
                                                        : <span style={{ color: '#ff1e1e' }}>Infusion Missing</span>}
                                                </span>
                                            </>
                                        ) : null}
                                    </span>
                                </>
                            }
                        </span>
                    </div>
                    : ''
                }

                {/* Aquatic Weapon B */}
                {WeaponAquaticB
                    ? <div>
                        <span className="yellow-highlight ">Aquatic {WeaponAquaticB.details.type} </span>
                        - <span>
                            <span className="itemname">
                                {WeaponAquaticB.itemstats.find(x =>
                                    x.id === WeaponAquaticB.stats?.id
                                    || x.id === WeaponAquaticB.details.infix_upgrade.id
                                )?.name.split("'")[0]
                                    || WeaponAquaticB.details.infix_upgrade.name
                                }
                            </span>
                            {/* Sigils */}
                            <span>
                                {WeaponAquaticB.upgrades?.filter(x => x.details.type === 'Sigil').map((upgrade, index) => (
                                    <>
                                        , <span key={index} className="itemname">
                                            {upgrade.name}
                                        </span>
                                    </>
                                ))}
                                {WeaponAquaticB.upgrades?.filter(x => x.details.type === 'Sigil').length < 2 ? (
                                    <>
                                        , <span className="itemname">
                                            {WeaponAquaticB.upgrades?.filter(x => x.details.type === 'Sigil').length === 0
                                                ? <span style={{ color: '#ff1e1e' }}>2x Missing sigils</span>
                                                : <span style={{ color: '#ff1e1e' }}>Missing sigil</span>}
                                        </span>
                                    </>
                                ) : null}
                            </span>

                            {/* Infusion */}
                            {WeaponAquaticB.rarity === 'Legendary' || WeaponAquaticB.rarity === 'Ascended' &&
                                <>
                                    <span>
                                        {WeaponAquaticB.upgrades?.filter(x => x.details.type === 'Default').map((upgrade, index) => (
                                            <>
                                                , <span key={index} className="itemname">
                                                    {upgrade.name}
                                                </span>
                                            </>
                                        ))}
                                        {WeaponAquaticB.upgrades?.filter(x => x.details.type === 'Default').length < 2 ? (
                                            <>
                                                , <span className="itemname">
                                                    {WeaponAquaticB.upgrades?.filter(x => x.details.type === 'Default').length === 0
                                                        ? <span style={{ color: '#ff1e1e' }}>2x Missing infusions</span>
                                                        : <span style={{ color: '#ff1e1e' }}>Infusion Missing</span>}
                                                </span>
                                            </>
                                        ) : null}
                                    </span>
                                </>
                            }

                        </span>
                    </div>
                    : ''
                }
            </div>
        </div >
    );
}

export default EquipmentStats;
