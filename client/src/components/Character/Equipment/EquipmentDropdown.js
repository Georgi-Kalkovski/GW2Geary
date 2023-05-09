import React, { useState, useEffect } from 'react';
import Equipment from './Equipment';
import fetchData from '../../fetchData';

const EquipmentDropdown = ({ char }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState(
    char.equipment_tabs.find((equip) => equip.is_active)
  );
  const [mergedItems, setMergedItems] = useState([]);
  // console.log('char', char)
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

  useEffect(() => {
    (async () => {
      try {
        const fetchedItems = await fetchData('items', selectedTab.equipment.map(el => el.id).join(','))
        const fetchedSkins = await fetchData('skins', selectedTab.equipment.filter(item => item.skin).map(item => item.skin).join(','))
        const fetchedUpgrades = await fetchData('items', selectedTab.equipment.filter(item => item.upgrades).flatMap(el => el.upgrades).join(','))
        const fetchedInfusions = await fetchData('items', [
          ...char.equipment.flatMap(el => el.infusions),
          ...char.equipment_tabs.flatMap(tab => tab.equipment.flatMap(item => item.infusions))
        ].join(','))

        const mergingItems = selectedTab.equipment.map(item => ({
          ...item,
          ...char.equipment.find((fetchedItem => fetchedItem.id === item.id)),
          ...fetchedItems.find(fetchedItem => fetchedItem.id === item.id),
          skin_name: fetchedSkins.find(fetchedSkin => fetchedSkin.id === item.skin)?.name,
          skin_icon: fetchedSkins.find(fetchedSkin => fetchedSkin.id === item.skin)?.icon,
          upgrades: [
            ...fetchedUpgrades.filter(fetchedUpgrade => item.upgrades?.includes(fetchedUpgrade.id)).map((upgrade) => ({
              ...upgrade,
              counter: selectedTab.equipment.reduce((count, fetchedItem) => {
                if (fetchedItem.slot === "HelmAquatic") {
                  return count;
                }
                return count + (fetchedItem.upgrades && fetchedItem.upgrades.includes(upgrade.id) ? 1 : 0);
              }, 0)
            })),
            ...(item.infusions
              ?? char.equipment.find(fetchedItem => fetchedItem.id === item.id)?.infusions
              ?? []
            ).map(infusionId => fetchedInfusions?.find(fetchedInfusion => fetchedInfusion.id === infusionId)),
          ],
        }))

        setMergedItems(mergingItems);
      } catch (error) {
        console.log(error)
      }
    })();

  }, [selectedTab, char.equipment])

  // console.log(mergedItems)

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
