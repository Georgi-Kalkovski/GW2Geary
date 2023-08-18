import React from "react";

function Aquatic({ items }) {

    const aquaticHelm = items.find(x => x.slot == 'HelmAquatic');
    const WeaponAquaticA = items.find(x => x.slot == 'WeaponAquaticA');
    const WeaponAquaticB = items.find(x => x.slot == 'WeaponAquaticB');
    const WeaponAquaticASigils = WeaponAquaticA?.upgrades?.filter(x => x.details.type === 'Sigil');
    const WeaponAquaticAInfusions = WeaponAquaticA?.upgrades?.filter(x => x.details.type === 'Default');
    const WeaponAquaticBSigils = WeaponAquaticB?.upgrades?.filter(x => x.details.type === 'Sigil');
    const WeaponAquaticBInfusions = WeaponAquaticB?.upgrades?.filter(x => x.details.type === 'Default');

    return (<>
        <div className="itemstat" style={{ fontSize: '14px' }}>
            {/* Aquatic Helm */}
            {aquaticHelm
                ? <div>
                    {/* Name */}
                    <span className="yellow-highlight ">Aquatic Headgear </span>
                    {aquaticHelm.rarity !== 'Basic' && (
                        <>
                            - <span>
                                {/* Prefix */}
                                <span className="itemname">
                                    {aquaticHelm?.itemstats.find((x) =>
                                        x.id === aquaticHelm.stats?.id
                                        || x.id === aquaticHelm.details?.infix_upgrade?.id
                                    )?.name.split("'")[0]
                                        || <span style={{ color: '#ff1e1e' }}>Missing prefix</span>
                                    }
                                </span>
                                {/* Rune */}
                                {aquaticHelm.rarity !== 'Basic' && aquaticHelm.rarity !== 'Fine' &&
                                    <>
                                        , <span className="itemname">
                                            {aquaticHelm.upgrades?.find((x) => x.details.type === 'Rune')?.name || (
                                                <span style={{ color: '#ff1e1e' }}>Missing rune</span>
                                            )}
                                        </span>
                                    </>
                                }
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
                        </>
                    )}
                </div>
                : ''
            }

            {/* Aquatic Weapon A */}
            {WeaponAquaticA
                ? <div>
                    {/* Name */}
                    <span className="yellow-highlight ">Aquatic {WeaponAquaticA.details?.type} </span>
                    {WeaponAquaticA.rarity !== 'Basic' &&
                        <>
                            - <span>
                                {/* Prefix */}
                                <span className="itemname">
                                    {WeaponAquaticA?.itemstats.find(x =>
                                        x.id === WeaponAquaticA.stats?.id
                                        || x.id === WeaponAquaticA.details?.infix_upgrade?.id
                                    )?.name.split("'")[0]
                                        || <span style={{ color: '#ff1e1e' }}>Missing prefix</span>
                                    }
                                </span>
                                {/* Sigils */}
                                {WeaponAquaticA.rarity !== 'Basic' && WeaponAquaticA.rarity !== 'Fine' &&
                                    <span>
                                        {['Masterwork', 'Rare'].includes(WeaponAquaticA.rarity) ? (
                                            <span>
                                                {(!WeaponAquaticASigils[0]?.name) ? (
                                                    <>
                                                        , <span style={{ color: '#ff1e1e' }}>Missing sigil</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        , <span className="itemname">
                                                            {WeaponAquaticASigils[0]?.name}
                                                        </span>
                                                    </>
                                                )}
                                            </span>
                                        ) : (
                                            <span>
                                                {(!WeaponAquaticASigils[0]?.name && !WeaponAquaticASigils[1]?.name) ? (
                                                    <>
                                                        , <span style={{ color: '#ff1e1e' }}>2x Missing sigils</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        , <span className="itemname">
                                                            {WeaponAquaticASigils[0]?.name ? WeaponAquaticASigils[0].name : <span style={{ color: '#ff1e1e' }}>Missing sigil</span>}
                                                        </span>
                                                        , <span className="itemname">
                                                            {WeaponAquaticASigils[1]?.name ? WeaponAquaticASigils[1].name : <span style={{ color: '#ff1e1e' }}>Missing sigil</span>}
                                                        </span>
                                                    </>
                                                )}
                                            </span>
                                        )}
                                    </span>
                                }

                                {/* Infusion */}
                                {WeaponAquaticA.rarity === 'Legendary' || WeaponAquaticA.rarity === 'Ascended' ?
                                    <span>
                                        {(!WeaponAquaticAInfusions[0]?.name && !WeaponAquaticAInfusions[1]?.name)
                                            ? <>
                                                , <span style={{ color: '#ff1e1e' }}>2x Missing infusions</span>
                                            </>
                                            : <>
                                                ,  <span className="itemname">
                                                    {WeaponAquaticAInfusions[0]?.name ? WeaponAquaticAInfusions[0].name : <span style={{ color: '#ff1e1e' }}>Missing infusion</span>}
                                                </span>
                                                , <span className="itemname">
                                                    {WeaponAquaticAInfusions[1]?.name ? WeaponAquaticAInfusions[1].name : <span style={{ color: '#ff1e1e' }}>Missing infusion</span>}
                                                </span>
                                            </>
                                        }
                                    </span>
                                    : ''
                                }
                            </span>
                        </>}
                </div>
                : ''
            }

            {/* Aquatic Weapon B */}
            {WeaponAquaticB
                ? <div>
                    {/* Name */}
                    <span className="yellow-highlight ">Aquatic {WeaponAquaticB.details?.type} </span>
                    {WeaponAquaticB.rarity !== 'Basic' &&
                        <>
                            - <span>
                                {/* Prefix */}
                                <span className="itemname">
                                    {WeaponAquaticB.itemstats.find(x =>
                                        x.id === WeaponAquaticB.stats?.id
                                        || x.id === WeaponAquaticB.details?.infix_upgrade?.id
                                    )?.name.split("'")[0]
                                        || <span style={{ color: '#ff1e1e' }}>Missing prefix</span>
                                    }
                                </span>
                                {/* Sigils */}
                                {WeaponAquaticB.rarity !== 'Basic' && WeaponAquaticB.rarity !== 'Fine' &&
                                    <span>
                                        {['Masterwork', 'Rare'].includes(WeaponAquaticB.rarity) ? (
                                            <span>
                                                {(!WeaponAquaticBSigils[0]?.name) ? (
                                                    <>
                                                        , <span style={{ color: '#ff1e1e' }}>Missing sigil</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        , <span className="itemname">
                                                            {WeaponAquaticBSigils[0]?.name}
                                                        </span>
                                                    </>
                                                )}
                                            </span>
                                        ) : (
                                            <span>
                                                {(!WeaponAquaticBSigils[0]?.name && !WeaponAquaticBSigils[1]?.name) ? (
                                                    <>
                                                        , <span style={{ color: '#ff1e1e' }}>2x Missing sigils</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        , <span className="itemname">
                                                            {WeaponAquaticBSigils[0]?.name ? WeaponAquaticBSigils[0].name : <span style={{ color: '#ff1e1e' }}>Missing sigil</span>}
                                                        </span>
                                                        , <span className="itemname">
                                                            {WeaponAquaticBSigils[1]?.name ? WeaponAquaticBSigils[1].name : <span style={{ color: '#ff1e1e' }}>Missing sigil</span>}
                                                        </span>
                                                    </>
                                                )}
                                            </span>
                                        )}
                                    </span>
                                }
                                {/* Infusion */}
                                {WeaponAquaticB.rarity === 'Legendary' || WeaponAquaticB.rarity === 'Ascended' ?
                                    <span>
                                        {(!WeaponAquaticBInfusions[0]?.name && !WeaponAquaticBInfusions[1]?.name)
                                            ? <>
                                                , <span style={{ color: '#ff1e1e' }}>2x Missing infusions</span>
                                            </>
                                            : <>
                                                ,  <span className="itemname">
                                                    {WeaponAquaticBInfusions[0]?.name ? WeaponAquaticBInfusions[0].name : <span style={{ color: '#ff1e1e' }}>Missing infusion</span>}
                                                </span>
                                                , <span className="itemname">
                                                    {WeaponAquaticBInfusions[1]?.name ? WeaponAquaticBInfusions[1].name : <span style={{ color: '#ff1e1e' }}>Missing infusion</span>}
                                                </span>
                                            </>
                                        }
                                    </span>
                                    : ''
                                }
                            </span>
                        </>}
                </div>
                : ''
            }
        </div>
    </>)
}

export default Aquatic;