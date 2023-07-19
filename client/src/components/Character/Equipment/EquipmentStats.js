import React from "react";

function EquipmentStats({ prof, items }) {
    const stats = [];
    const upgrades = [];
    const finishedItemstats = [];
    const itemstats = items[0]?.itemstats;

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
                            type: item.details.type,
                        });
                    } else {
                        upgrades.push({
                            name: upgrade.name,
                            items: [
                                { name: item.name, type: item.details.type },
                            ],
                            type: upgrade.details.type,
                        });
                    }
                }

                // Stats Logic
                if (item.stats) {
                    const statsObject = {
                        id: item.stats.id,
                        name: item.name,
                        attributes: item.stats.attributes,
                        type: item.details.type,
                    };
                    stats.push(statsObject);
                }
                if (item.details && item.details.infix_upgrade) {
                    const infixObject = {
                        name: item.name,
                        id: item.details.infix_upgrade.id,
                        attributes: item.details.infix_upgrade.attributes,
                        type: item.details.type,
                    };
                    stats.push(infixObject);
                }
            }
        }

        // Itemstats Logic
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
                            {itemstat.items.length}x {itemstat.name.split("'")[0]}
                            <div
                                className="flex"
                                style={{ fontSize: "12px", color: "#aa0404" }}
                            >
                                - {itemstat.items.map((x, i) => x.type).join(", ")}
                            </div>
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
                                <React.Fragment key={index}>
                                    <div>
                                        {upgrade.items.length}x {upgrade.name}
                                    </div>
                                    <div
                                        className="flex"
                                        style={{ fontSize: "12px", color: "#aa0404" }}
                                    >
                                        - {upgrade.items.map((x, i) => x.type).join(", ")}
                                    </div>
                                </React.Fragment>
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
                    <React.Fragment key={index}>
                        {upgrade.type == "Sigil" && (
                            <React.Fragment key={index}>
                                <div>
                                    {upgrade.items.length}x {upgrade.name}
                                </div>
                                <div
                                    className="flex"
                                    style={{ fontSize: "12px", color: "#aa0404" }}
                                >
                                    - {upgrade.items.map((x, i) => x.type).join(", ")}
                                </div>
                            </React.Fragment>
                        )}
                    </React.Fragment>
                ))}
        </div>
    );
}

export default EquipmentStats;
