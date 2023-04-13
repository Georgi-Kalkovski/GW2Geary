import React, { useState } from 'react';
import EquipmentBox from './EquipmentBox';

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

  const selectedStats = char.equipment_tabs.find((stats) => stats.tab === selectedTab);
  const activeStats = char.equipment_tabs.find((stats) => stats.is_active);

  return (
    <>
      <div className="dropdown">
        <button className="dropdown-button" onClick={toggleMenu}>
          {selectedTab === null ? 'Unknown' : (selectedStats ? selectedStats.name : activeStats.name)}
        </button>
        {isOpen && (
          <ul className="dropdown-menu">
            {char.equipment_tabs.map((stats) => (
              <li key={stats.tab} onClick={handleItemClick} value={stats.name ? stats.tab : 'Unknown'}>{stats.name ? stats.name : 'Unknown'}</li>
            ))}
          </ul>
        )}
      </div>
      {<EquipmentBox char={char} tab={selectedTab} key={selectedTab} />}
    </>
  );
}

export default EquipmentDropdown;
