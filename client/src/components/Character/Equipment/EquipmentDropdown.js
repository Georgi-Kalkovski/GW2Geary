import React, { useState, useCallback } from 'react';
import Equipment from './Equipment';

function EquipmentDropdown({ char }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState(
    char.equipment_tabs.find((equip) => equip.is_active).tab
  );
  const charTab = char.equipment_tabs[selectedTab - 1]

  function toggleMenu() {
    setIsOpen(!isOpen);
  }

  function handleItemClick(event) {
    const clickedItem = event.target;
    const tab = clickedItem.getAttribute('value');
    if (tab === selectedTab) {
      setIsOpen(false);
    } else {
      setSelectedTab(char.equipment_tabs[tab - 1].tab);
      setIsOpen(false);
    }
  }

  const filterEquipment = useCallback(
    (tab, equip) => {
      return equip.filter(item => item.tabs?.includes(tab));
    },
    []
  );

  const filteredEquip = filterEquipment(selectedTab, char.equipment);

  const mergeEquipment = useCallback(
    (selectedEquip, filteredEquip) => {
      const selectedDict = {};
      for (const equip of selectedEquip) {
        selectedDict[equip.id] = equip;
      }
      for (const equip of filteredEquip) {
        if (selectedDict[equip.id] && selectedDict[equip.id].stats) {
          selectedDict[equip.id].stats = equip.stats;
        } else {
          selectedDict[equip.id] = equip;
        }
      }
      return Object.values(selectedDict);
    },
    []
  );

  const selectedEquip = char.equipment_tabs.find((equip) => equip.tab === selectedTab).equipment;
  const mergedEquip = mergeEquipment(selectedEquip, filteredEquip);

  return (
    <div className='equipment'>
      <div className="dropdown">
        <button className={`${char.profession.toLowerCase()}-border dropdown-button`} onClick={toggleMenu}>
          {charTab && charTab.name ? charTab.name : `Equipment ${charTab.tab}`}
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
      <Equipment key={selectedTab} tab={selectedTab} items={mergedEquip} />
    </div>
  );
}

export default EquipmentDropdown;
