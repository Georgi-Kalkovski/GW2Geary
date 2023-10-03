import React from "react";
import Aquatic from "./Stats/Aquatic";
import Prefixes from "./Stats/Prefixes";
import Runes from "./Stats/Runes";
import Sigils from "./Stats/Sigils";
import Infusions from "./Stats/Infusions";
import Relic from "./Stats/Relic";
import PowerCore from "./Stats/PowerCore";

function EquipmentStats({ prof, items, relic, powerCore }) {
    const stats = [];
    const upgrades = [];
    const finishedItemstats = [];
    const infusions = [];
    const emptyPrefixes = [];
    const emptyRunes = [];
    const emptySigils = [];
    const emptyInfusions = [];
    let enrichment = {};

    let itemstats = items[0]?.itemstats;
console.log(emptyRunes)
    if (items) {
        for (const item of items) {
            if (item.slot != "HelmAquatic" &&
                item.slot != "WeaponAquaticA" &&
                item.slot != "WeaponAquaticB") {

                // Empty Prefixes
                if (!item.details?.infix_upgrade && !item.stats) {
                    emptyPrefixes.push(item.details?.type)
                }

                // Empty Runes
                const nonRuneCount = item.upgrades.filter(x => x.details.type !== 'Rune').length;
                console.log(item)
                if (item.details?.defense
                    && item.details.defense > 0
                    && item.type !== 'Weapon'
                    && item.upgrades.length - nonRuneCount < item.details.infusion_slots.length) {
                    emptyRunes.push({
                        type: item.details.type,
                        amount: item.details.infusion_slots.length - item.upgrades.length
                    });
                }

                // Empty Sigils
                const nonSigilCount = item.upgrades.filter(x => x.details.type !== 'Sigil').length;
                if (item.details?.min_power
                    && item.details.max_power
                    && item.upgrades.length - nonSigilCount < item.details.infusion_slots.length) {
                    emptySigils.push({
                        type: item.details.type,
                        amount: item.details.infusion_slots.length - item.upgrades.length
                    });
                }

                // Empty Infusions
                const nonInfusionCount = item.upgrades.filter(x => x.details.type !== 'Default').length;
                if (item.upgrades?.length - nonInfusionCount < item.details?.infusion_slots?.length) {
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
                            type: item.details?.type || item.slot,
                        });
                    } else {
                        upgrades.push({
                            name: upgrade.name,
                            items: [
                                { name: item.name, type: item.details?.type },
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
                        } else {
                            enrichment = infusion
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
        <div className={`flex column itemstats`}>

            {/* Prefixes */}
            <Prefixes finishedItemstats={finishedItemstats} emptyPrefixes={emptyPrefixes} />

            {/* Power Core */}
            <PowerCore powerCore={powerCore} />

            {/* Runes */}
            <Runes upgrades={upgrades} emptyRunes={emptyRunes} />

            {/* Relic */}
            <Relic relic={relic} />

            {/* Sigils */}
            <Sigils upgrades={upgrades} emptySigils={emptySigils} />

            {/* Infusions */}
            <Infusions infusions={infusions} emptyInfusions={emptyInfusions} enrichment={enrichment} />

            {/* Underwater Content */}
            <Aquatic items={items} />
        </div >
    );
}

export default EquipmentStats;
