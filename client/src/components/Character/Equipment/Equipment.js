import React, { useState } from 'react';
import EquipmentBox from './EquipmentBox';
import './Equipment.css';

function Equipment({ char }) {
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
        <button className={char.profession.toLowerCase() + '-border dropdown-button'} onClick={toggleMenu}>
          {selectedTab === null && selectedEquip === null && activeEquip === null
            ? 'Unknown'
            : (selectedEquip && activeEquip
              ? (selectedEquip.name ? selectedEquip.name : 'Unknown')
              : (activeEquip.name ? activeEquip.name : 'Unknown'))}
        </button>
        {isOpen && (
          <ul className="dropdown-menu">
            {char.equipment_tabs.map((equip) => (
              <li
                key={equip.tab}
                onClick={handleItemClick}
                value={equip.name ? equip.tab : 'Unknown'}
              >
                {equip.name ? equip.name : 'Unknown'}
              </li>
            ))}
          </ul>
        )}
      </div>
      {<EquipmentBox char={char} tab={selectedTab} key={selectedTab} />}
    </div>
  );
}

export default Equipment;
