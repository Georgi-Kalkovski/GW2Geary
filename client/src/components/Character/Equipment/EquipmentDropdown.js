import React, { useState, useEffect } from 'react';
import Equipment from './Equipment';
import fetchData from '../../fetchData';

function EquipmentDropdown({ char }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState(
    char.equipment_tabs.find((equip) => equip.is_active)
  );
  const [mergedItems, setMergedItems] = useState([]);
  const [loading, setLoading] = useState(true);

  function toggleMenu() {
    setIsOpen(!isOpen);
  }

  function handleItemClick(event) {
    const clickedItem = event.target;
    const tab = parseInt(clickedItem.getAttribute('value'));
    if (tab === selectedTab.tab) {
      setIsOpen(false);
    } else {
      setSelectedTab(char.equipment_tabs[tab - 1]);
      setIsOpen(false);
    }
  }

  useEffect(() => {
    const mergedTabs = [];
    for (const tab of char.equipment_tabs) {
      for (const tabItem of tab.equipment) {
        for (const equipItem of char.equipment) {
          if (tabItem.id === equipItem.id && tab.tab === selectedTab.tab && equipItem.tabs.includes(selectedTab.tab)) {
            const mergedItems = { ...tabItem, ...equipItem };
            mergedTabs.push(mergedItems);
          }
        }
      }
    }
    const mergedItems = mergedTabs.filter(equip => equip.tabs.includes(selectedTab.tab));

    const equipItemWithDetails = async (equipItem) => {
      const itemData = await fetchData('items', equipItem.id);
      let skinData = {};

      if (equipItem.skin) {
        skinData = await fetchData('skins', equipItem.skin)
      }

      const itemDetails = itemData ? itemData.details : null;
      const stats = itemDetails?.infix_upgrade;
      const attributesArray = itemDetails?.infix_upgrade?.attributes;

      if (stats && attributesArray) {
        stats.attributes = {};
        for (const attributeObj of attributesArray) {
          stats.attributes[attributeObj.attribute] = attributeObj.modifier;
        }
      }
      return {
        ...equipItem,
        rarity: itemData?.rarity,
        item_name: itemData?.name,
        item_icon: itemData?.icon,
        skin_name: skinData?.name,
        skin_icon: skinData?.icon,
        stats: equipItem.stats || stats,
        details: itemDetails,
        item_data: itemData
      };
    };

    const setItemsWithDetails = async (items) => {
      const newItems = [];
      for (const item of items) {
        newItems.push(await equipItemWithDetails(item));
      }
      setMergedItems(newItems);
      setLoading(false);
    }

    setItemsWithDetails(mergedItems);
  }, [char, selectedTab.tab]);

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
      </div>{loading
        ? <div>Loading...</div>
        : <Equipment key={selectedTab.tab} items={mergedItems} />
      }
    </div>
  );
}

export default EquipmentDropdown;
