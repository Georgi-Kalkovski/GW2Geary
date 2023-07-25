import React from "react";

function EquipmentStats({ prof, items }) {
    const stats = [];
    const upgrades = [];
    const finishedItemstats = [];
    const infusions = [];
    let itemstats = items[0]?.itemstats;

    if (items) {
        for (const item of items) {
            if (
                item.slot != "HelmAquatic" &&
                item.slot != "WeaponAquaticA" &&
                item.slot != "WeaponAquaticB"
            ) {
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
    return (
        <div className={`flex column itemstats ${prof.toLowerCase()}-lightning-border`}>
            {/* Prefixes */}
            <div>
                <div>
                    <span className="yellow-highlight">Prefixes</span>:
                </div>
                {finishedItemstats &&
                    finishedItemstats.map((itemstat, index) => (
                        <div key={index}>
                            <span className="itemname">{itemstat.items.length}x {itemstat.name.split("'")[0]} </span>
                            <span className="itemtypes">- {itemstat.items.map((x, i) => x.type).join(", ")}</span>
                        </div>
                    ))}
            </div>

            {/* Runes */}
            <div className="itemstat">
                <span className="yellow-highlight">Runes</span>:
            </div>
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
                    ))}
            </div>

            {/* Sigils */}
            <div className="itemstat">
                <span className="yellow-highlight">Sigils</span>:
            </div>
            {upgrades &&
                upgrades.map((upgrade, index) => (
                    <div key={index}>
                        {upgrade.type == "Sigil" && (
                            <React.Fragment key={index}>
                                <span className="itemname">{upgrade.items.length}x {upgrade.name} </span>
                                <span className="itemtypes">- {upgrade.items.map((x, i) => x.type).join(", ")}</span>
                            </React.Fragment>
                        )}
                    </div>
                ))}

            {/* Infusions */}
            <div className="itemstat">
                <span className="yellow-highlight">Infusions</span>:
            </div>
            {infusions &&
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
                ))}
        </div>
    );
}

export default EquipmentStats;
