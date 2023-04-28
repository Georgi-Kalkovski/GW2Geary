import React, { useState } from 'react';
import Equipment from './Equipment';

function EquipmentDropdown({ char }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState(null);

  function toggleMenu() {
    setIsOpen(!isOpen);
  }

  function handleItemClick(event) {
    const clickedItem = event.target;
    const tab = clickedItem.getAttribute('value');
    if (tab === selectedTab) {
      setIsOpen(false);
    } else {
      setSelectedTab(tab === "Unknown" ? null : parseInt(tab));
      setIsOpen(false);
    }
  }
  const selectedEquip = char.equipment_tabs.find((equip) => equip.tab === selectedTab);
  const activeEquip = char.equipment_tabs.find((equip) => equip.is_active);
  return (
    <div className='equipment'>
      <div className="dropdown">
        <button className={`${char.profession.toLowerCase()}-border dropdown-button`} onClick={toggleMenu}>
          {selectedTab === null && selectedEquip === null && activeEquip === null
            ? 'Unknown'
            : (selectedEquip && activeEquip
              ? (selectedEquip.name ? selectedEquip.name : `Equipment ${selectedEquip.tab}`)
              : (activeEquip.name ? activeEquip.name : `Equipment ${activeEquip.tab}`))}
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
      {<Equipment key={selectedTab} tab={selectedTab} tabs={char.equipment_tabs} equip={char.equipment}/>}
    </div>
  );
}

export default EquipmentDropdown;
