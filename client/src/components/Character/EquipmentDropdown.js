import React, { useState } from 'react';
import EquipmentBox from './EquipmentBox'
import Character from '../Character';

function EquipmentDropdown({ char }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState(null);

  function toggleMenu() {
    setIsOpen(!isOpen);
  }

  function handleItemClick(event) {
    const clickedItem = event.target;
    const tab = clickedItem.getAttribute('value');
    setSelectedTab(parseInt(tab));
    setIsOpen(false);
  }
  console.log(char.equipment_tabs)
  return (
    <>
      <div className="dropdown">
        <button className="dropdown-button" onClick={toggleMenu}>
          Dropdown
        </button>
        {isOpen && (
          <ul className="dropdown-menu">
            {char.equipment_tabs.map((stats) => (
               <li key={stats.tab} onClick={handleItemClick} value={stats.tab}>{stats.name}</li>
            ))};
          </ul>
        )}
      </div>
      {<EquipmentBox char={char} tab={selectedTab} key={selectedTab} />}

    </>
  );
}

export default EquipmentDropdown;
