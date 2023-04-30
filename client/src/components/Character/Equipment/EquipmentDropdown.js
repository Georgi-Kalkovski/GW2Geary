import React, { useState, useEffect } from 'react';
import Equipment from './Equipment';

function EquipmentDropdown({ char }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState(
    char.equipment_tabs.find((equip) => equip.is_active)
  );
  const [mergedItems, setMergedItems] = useState([]);

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
    setMergedItems(mergedTabs.filter(equip => equip.tabs.includes(selectedTab.tab)));
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
      </div>
      <Equipment key={selectedTab.tab} items={mergedItems} />
    </div>
  );
}

export default EquipmentDropdown;
