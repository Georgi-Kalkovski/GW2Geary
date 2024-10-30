import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import fetchData from '../../fetchData';
import InfusionsName from '../Fashion/InfusionsName';
import AuthService from '../../../services/auth.service';
import { specIcons } from '../Build/specIcons';
import BackButton from '../BackButton';
import Cog from '../../../cog.svg'
import Dragon from '../../../dragon.svg'
import EquipmentSavedInner from './EquipmentSavedInner';
const relicsData = require('../../relics.json');

const EquipmentSaved = () => {
    const { name, id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [mergedItems, setMergedItems] = useState([]);
    const [equip, setEquipment] = useState(null);
    const [relic, setRelic] = useState(null);
    const [powerCore, setPowerCore] = useState(null);

    const [isSliderOn, setIsSliderOn] = useState(() => {
        const storedValue = localStorage.getItem('isSliderOn');
        return storedValue !== null ? JSON.parse(storedValue) : true;
    });
    const [isPrefixesOn, setIsPrefixesOn] = useState(() => {
        const storedValue = localStorage.getItem('isPrefixesOn');
        return storedValue !== null ? JSON.parse(storedValue) : false;
    });

    useEffect(() => {
        (async () => {
            try {
                const fetchedEq = await AuthService.getEquipment(name, id);
                const fetchedEquipment = fetchedEq.data.equipment;
                setEquipment(fetchedEquipment);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
                setIsLoading(false);
            }
        })();
    }, [name, id]);

    useEffect(() => {
        if (equip) {
            (async () => {
                try {
                    // Relic Logic
                    const relicId = equip.relic;

                    let relicData = relicId ? await fetchData('items', relicId) : null;

                    const findItemByGameId = (gameId) => {
                        const items = relicsData.results;
              
                        for (let itemKey in items) {
                          const item = items[itemKey];
                          const itemId = item.printouts['Has game id']?.[0];
                          const itemName = item.printouts['Has canonical name']?.[0];
              
                          const hasCorrectIcon = item.printouts['Has game icon']?.[0]?.fulltext === "File:Legendary Relic.png";
              
                          if (itemId === gameId && hasCorrectIcon) {
                            for (let relatedItemKey in items) {
                              const relatedItem = items[relatedItemKey];
                              const canonicalName = relatedItem.printouts['Has canonical name']?.[0];
              
                              if (canonicalName === itemName) {
                                const description = items[itemName].printouts['Has game description']?.[0] || "No description available";
              
                                return {
                                  id: gameId,
                                  name: canonicalName,
                                  description,
                                };
                              }
                            }
                          }
                        }
                        return null;
                      };
              
                      if (!relicData) {
                        
                        const relicDetails = findItemByGameId(relicId);
                        if (relicDetails) {
                          relicData = await fetchData('items', 101582);

                          if (relicData?.length) {
                            Object.assign(relicData[0], {
                              id: relicDetails.id,
                              name: relicDetails.name,
                              description: relicDetails.description.replace(/\[\[|\]\]/g, ''),
                            });
                          }
                        } else {
                          console.log(`No item found for game ID: ${relicId}`);
                        }
                      }
              
                    setRelic(relicData);
                    // End of Relic Logic

                    setPowerCore(await fetchData('items', equip.powerCore))
                    const itemIds = equip.equipment.map((el) => el.id).join(',');
                    const fetchedItems = itemIds ? await fetchData('items', itemIds) : [];
                    for (const item of fetchedItems) {
                        if (item?.details?.type == "LongBow") { item.details.type = "Longbow" }
                        if (item?.details?.type == "ShortBow") { item.details.type = "Shortbow" }
                        if (item?.details?.type == "HelmAquatic") { item.details.type = "Aquatic Headgear" }
                        if (item?.details?.type == "Harpoon") { item.details.type = "Spear" }
                        if (item?.details?.type == "Speargun") { item.details.type = "Harpoon Gun" }
                    }
                    const itemstats = [
                        ...equip.equipment.filter((item) => item.stats?.id).map((item) => item.stats?.id),
                        ...equip.equipment.filter((item) => item.stats?.id).map((item) => item.stats?.id),
                        ...fetchedItems.filter((item) => item.details?.infix_upgrade?.id).map((item) => item.details?.infix_upgrade?.id),
                        ...equip.equipment.filter((item) => item.details?.infix_upgrade?.id).map((item) => item.details?.infix_upgrade?.id)
                    ].join(',');
                    const fetchedItemstats = itemstats ? await fetchData('itemstats', itemstats) : [];
                    const skinIds = equip.equipment.filter((item) => item.skin).map((item) => item.skin).join(',');
                    const fetchedSkins = skinIds ? await fetchData('skins', skinIds) : [];
                    const upgradeIds = equip.equipment.filter((item) => item.upgrades).flatMap((el) => el.upgrades).join(',');
                    const fetchedUpgrades = upgradeIds ? await fetchData('items', upgradeIds) : [];
                    const dyesIds = equip.equipment.filter((item) => item.dyes).flatMap((el) => el.dyes).join(',');
                    const fetchedColors = dyesIds ? await fetchData('colors', dyesIds) : [];
                    const infusionIds = [
                        ...equip?.equipment.flatMap((el) => el.infusions).filter((item) => item !== undefined)
                    ].join(',');
                    const fetchedInfusions = infusionIds ? await fetchData('items', infusionIds) : [];
                    const mergingItems = equip.equipment.map(item => ({

                        ...equip.equipment.find((fetchedItem => fetchedItem.id === item.id)),
                        ...fetchedItems?.find(fetchedItem => fetchedItem.id === item.id),
                        ...item,
                        dyes: [
                            item.dyes && fetchedColors?.find(fetchedDyes => fetchedDyes.id === item.dyes[0]),
                            item.dyes && fetchedColors?.find(fetchedDyes => fetchedDyes.id === item.dyes[1]),
                            item.dyes && fetchedColors?.find(fetchedDyes => fetchedDyes.id === item.dyes[2]),
                            item.dyes && fetchedColors?.find(fetchedDyes => fetchedDyes.id === item.dyes[3]),
                        ],
                        skin_name: fetchedSkins?.find(fetchedSkin => fetchedSkin.id === item.skin)?.name,
                        skin_icon: fetchedSkins?.find(fetchedSkin => fetchedSkin.id === item.skin)?.icon,
                        upgrades: fetchedInfusions ? [
                            ...fetchedUpgrades?.filter(fetchedUpgrade => item.upgrades?.includes(fetchedUpgrade.id)).map((upgrade) => ({
                                ...upgrade,
                                counter: equip.equipment.reduce((count, fetchedItem) => {
                                    if (fetchedItem.slot === "HelmAquatic") {
                                        return count;
                                    }
                                    return count + (fetchedItem.upgrades && fetchedItem.upgrades.includes(upgrade.id) ? 1 : 0);
                                }, 0)
                            })),
                            ...(item.infusions
                                ?? char?.equipment.find(fetchedItem => fetchedItem.id === item.id)?.infusions
                                ?? []
                            ).map(infusionId => fetchedInfusions?.find(fetchedInfusion => fetchedInfusion.id === infusionId)),
                        ] : '',
                        itemstats: fetchedItemstats,
                        powerCore: fetchedItems.find(item => item.type === 'PowerCore'),
                        infusions: fetchedInfusions ? (item.infusions
                            ?? char?.equipment.find(fetchedItem => fetchedItem.id === item.id)?.infusions
                            ?? []
                        ).map(infusionId => {
                            const fetchedInfusion = fetchedInfusions.find(fetchedInfusion => fetchedInfusion.id === infusionId);
                            if (fetchedInfusion && InfusionsName(fetchedInfusion.name)) {
                                return fetchedInfusion;
                            }
                            return null; // or handle non-matching cases as needed
                        }).filter(infusion => infusion !== null) : [],
                    }));
                    localStorage.setItem('prof', equip?.profession);
                    localStorage.setItem('race', equip?.race);
                    localStorage.setItem('gender', equip?.gender);

                    setMergedItems(mergingItems);
                } catch (error) {
                    console.log(error);
                }
            })();
        }
    }, [equip]);

    const togglePrefixes = () => {
        if (isPrefixesOn) {
            setIsPrefixesOn(false);
        } else {
            setIsPrefixesOn(true);
        }
    };

    const toggleSlider = () => {
        if (isSliderOn) {
            setIsSliderOn(false);
        } else {
            setIsSliderOn(true);
        }
    };

    return (
        <div className='flex center content-down'>
            {equip && (
                <div className={`equipment ${equip.profession.toLowerCase()}-lightning-border`} style={{ marginRight: '4px', padingTop: '10px', paddingBottom: '10px' }}>
                    <div className="dropdown">
                        {isLoading ? (
                            <div className='logo-equipment-width'>
                                <div className="flex center">
                                    <div className="logo-loading-div-equipment">
                                        <img src={Dragon} alt="" className="logo--loading-dragon" />
                                        <img src={Cog} alt="" className="logo-loading-cog" />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <Container className='spec-box logo-equipment-width' style={{ marginTop: 0 }}>
                                <div>
                                    <BackButton />
                                    <div className='flex center' style={{ marginLeft: '50px', position: 'relative', paddingTop: '40px' }}>
                                        <div style={{ fontSize: '30px', marginLeft: '-10px' }}>{equip.name}</div>
                                        <div className='center-land'>
                                            <img
                                                className=''
                                                style={{ width: '40px', height: '40px' }}
                                                src={specIcons[equip.profession.toLowerCase()]}
                                                alt=""
                                            />
                                        </div>
                                        {/* Prefixes Switch */}
                                        <div className='flex column' style={{ marginRight: '20px', position: 'absolute', right: '35px', top: '-5px' }}>
                                            <label className="switch">
                                                <input
                                                    className="tgl tgl-skewed"
                                                    id="cb3"
                                                    type="checkbox"
                                                    checked={isSliderOn}
                                                    onChange={toggleSlider}
                                                />
                                                <span className={`tgl-btn ${equip.profession?.toLowerCase()}-switch`} style={{ paddingTop: '2px' }} data-tg-off="OFF" data-tg-on="ON"></span>
                                                <span style={{ marginRight: '5px', marginTop: '5px', cursor: 'pointer' }}>Skins</span>
                                            </label>
                                        </div>
                                        {/* Prefixes Switch */}
                                        <div className='flex column' style={{ marginRight: '20px', position: 'absolute', right: '-10px', top: '-5px' }}>
                                            <label className="switch">
                                                <input
                                                    className="tgl tgl-skewed"
                                                    id="cb3"
                                                    type="checkbox"
                                                    checked={isPrefixesOn}
                                                    onChange={togglePrefixes}
                                                />
                                                <span className={`tgl-btn ${equip.profession?.toLowerCase()}-switch`} style={{ paddingTop: '2px' }} data-tg-off="OFF" data-tg-on="ON"></span>
                                                <span style={{ marginRight: '5px', marginTop: '5px', cursor: 'pointer' }}>Stats</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div>
                                        <div style={{ margin: '0  0 10px 0' }}>{equip?.gender} {equip?.race} {equip?.profession}</div>
                                    </div>
                                    {mergedItems !== undefined &&
                                        <EquipmentSavedInner items={mergedItems} char={equip} prof={equip.profession} relic={relic} powerCore={powerCore} prefixSlider={isPrefixesOn} slider={isSliderOn} />
                                    }
                                </div>
                            </Container>
                        )}
                    </div>
                </div>
            )
            }
        </div >
    );
}

export default EquipmentSaved;
