import React, { useState, useEffect } from 'react';
import Equipment from './Equipment';
import fetchData from '../../fetchData';

const EquipmentDropdown = ({ char }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState(
    char.equipment_tabs.find((equip) => equip.is_active)
  );
  const [mergedItems, setMergedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [upgradesInfo, setUpgradesInfo] = useState([]);
  console.log('char', char)
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  }

  const handleItemClick = (event) => {
    const clickedItem = event.target;
    const tab = parseInt(clickedItem.getAttribute('value'));
    if (tab === selectedTab.tab) {
      setIsOpen(false);
    } else {
      setSelectedTab(char.equipment_tabs[tab - 1]);
      setIsOpen(false);
    }
  }

  console.log('tab', selectedTab)
  useEffect(() => {
    (async () => {
      try {
        const fetchedItems = await fetchData('items', selectedTab.equipment.map(el => el.id).join(','))
        const fetchedUpgrades = await fetchData('items', selectedTab.equipment.filter(item => item.upgrades).flatMap(el => el.upgrades).join(','))
        const fetchedInfusions = await fetchData('items', selectedTab.equipment.filter(item => item.infusions).flatMap(el => el.infusions).join(','))
        const fetchedSkins = await fetchData('skins', selectedTab.equipment.filter(item => item.skin).map(item => item.skin).join(','))

        console.log(fetchedInfusions)
        const mergingItems = selectedTab.equipment.map(item => ({
          ...item,
          ...char.equipment.find((fetchedItem => fetchedItem.id === item.id)),
          ...fetchedItems.find(fetchedItem => fetchedItem.id === item.id),
          skin_name: fetchedSkins.find(fetchedSkin => fetchedSkin.id === item.skin)?.name,
          skin_icon: fetchedSkins.find(fetchedSkin => fetchedSkin.id === item.skin)?.icon,
          upgrades: [
            ...fetchedUpgrades.filter(fetchedUpgrade => item.upgrades?.includes(fetchedUpgrade.id)),
            ...fetchedInfusions.filter(fetchedInfusions => item.infusions?.includes(fetchedInfusions.id)),
          ]
        }))

        setMergedItems(mergingItems);
      } catch (error) {
        console.log(error)
      }
    })();

  }, [selectedTab, char.equipment])


  // useEffect(() => {
  //   const mergedTabs = [];
  //   const upgradeInfo = [];
  //   for (const tab of char.equipment_tabs) {
  //     for (const tabItem of tab.equipment) {
  //       for (const equipItem of char.equipment) {
  //         if (tabItem.id === equipItem.id && tab.tab === selectedTab.tab && equipItem.tabs.includes(selectedTab.tab)) {
  //           const mergedItems = { ...tabItem, ...equipItem };
  //           mergedTabs.push(mergedItems);
  //         }
  //       }
  //     }
  //   }
  //   const mergedItems = mergedTabs.filter(equip => equip.tabs.includes(selectedTab.tab));
  //   const equipItemWithDetails = async (equipItem) => {

  //     const itemData = await fetchData('items', equipItem.id);

  //     let skinData = {};
  //     if (equipItem.skin) {
  //       skinData = await fetchData('skins', equipItem.skin)
  //     }

  //     const upgrades = [];
  //     if (equipItem.upgrades) {
  //       for (const upgrade of equipItem.upgrades) {
  //         upgrades.push(await fetchData('items', upgrade));
  //       }
  //     }

  //     for (const upgrade of upgrades) {
  //       const matchingIndex = upgradeInfo.findIndex(elem => elem.name === upgrade.name);
  //       if (equipItem.slot !== 'HelmAquatic' && equipItem.slot !== 'WeaponAquaticA' && equipItem.slot !== 'WeaponAquaticB')
  //         if (matchingIndex !== -1) {
  //           upgradeInfo[matchingIndex].count += 1;
  //         } else {
  //           upgradeInfo.push({
  //             name: upgrade.name,
  //             type: upgrade.details.type,
  //             bonuses: upgrade.details.bonuses ? upgrade.details.bonuses : [upgrade.details.infix_upgrade.buff.description],
  //             count: 1
  //           });
  //         }
  //     }

  //     setUpgradesInfo(upgradeInfo);

  //     if (equipItem.infusions) {
  //       for (const infusion of equipItem.infusions) {
  //         upgrades.push(await fetchData('items', infusion));
  //       }
  //     }

  //     const itemDetails = itemData ? itemData.details : null;
  //     const stats = itemDetails?.infix_upgrade;
  //     const attributesArray = itemDetails?.infix_upgrade?.attributes;
  //     if (stats && attributesArray) {
  //       stats.attributes = {};
  //       for (const attributeObj of attributesArray) {
  //         stats.attributes[attributeObj.attribute] = attributeObj.modifier;
  //       }
  //     }

  //     return {
  //       ...equipItem,
  //       rarity: itemData?.rarity,
  //       item_name: itemData?.name,
  //       item_icon: itemData?.icon,
  //       skin_name: skinData?.name,
  //       skin_icon: skinData?.icon,
  //       stats: equipItem.stats || stats,
  //       details: itemDetails,
  //       item_data: itemData,
  //       upgrades: upgrades
  //     };
  //   };

  //   const setItemsWithDetails = async (items) => {
  //     const newItems = [];
  //     for (const item of items) {
  //       newItems.push(await equipItemWithDetails(item));
  //     }
  //     setMergedItems(newItems);
  //     setLoading(false);
  //   }

  //   setItemsWithDetails(mergedItems);
  // }, [char, selectedTab.tab]);


  console.log('merged', mergedItems)

  return (
    <div className='equipment'>
      <div className="dropdown">
        <button className={`${char.profession.toLowerCase()}-border dropdown-button`} onClick={toggleMenu}>
          {selectedTab && selectedTab.name ? selectedTab.name : `Equipment ${selectedTab.tab}`}
        </button>
        {isOpen && (
          <ul className="dropdown-menu">
            {char.equipment_tabs.map((equip) => (
              <li
                key={equip.tab}
                onClick={handleItemClick}
                value={equip.tab}
              >
                {equip.name ? equip.name : `Equipment ${equip.tab}`}
              </li>
            ))}
          </ul>
        )}
      </div>
      <Equipment key={selectedTab.tab} items={mergedItems} lvl={char.level} prof={char.profession} />
    </div>
  );
}

export default EquipmentDropdown;
