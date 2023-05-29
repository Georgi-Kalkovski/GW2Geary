import React, { useState, useEffect, useRef } from 'react';
import { usePopperTooltip } from 'react-popper-tooltip';
import Equipment from './Equipment';
import fetchData from '../../fetchData';
import mouseClick from '.././mouse-click.svg'
import info from '.././info.svg'

const EquipmentDropdown = ({ char }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState(
    char.equipment_tabs.find((equip) => equip.is_active)
  );
  const [mergedItems, setMergedItems] = useState([]);
  const [isSliderOn, setIsSliderOn] = useState(true);

  // console.log('char', char)

  // Slider Logic
  const toggleSlider = () => {
    setIsSliderOn(!isSliderOn);
  };

  // Click outside of dropdown menu logic
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  }
  const wrapperRef = useRef(null);
  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [wrapperRef]);

  // Dropdown logic
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
        const fetchedItems = await fetchData('items', selectedTab.equipment.map(el => el.id).join(','));
        const fetchedSkins = await fetchData('skins', selectedTab.equipment.filter(item => item.skin).map(item => item.skin).join(','));
        const fetchedUpgrades = await fetchData('items', selectedTab.equipment.filter(item => item.upgrades).flatMap(el => el.upgrades).join(','));
        const fetchedInfusions = await fetchData('items', [
          ...char.equipment.flatMap(el => el.infusions).filter(item => item !== undefined),
          ...char.equipment_tabs.flatMap(tab => tab.equipment.flatMap(item => item.infusions)).filter(item => item !== undefined)
        ].join(','));

        const mergingItems = selectedTab.equipment.map(item => ({
          ...item,
          ...char.equipment.find((fetchedItem => fetchedItem.id === item.id)),
          ...fetchedItems?.find(fetchedItem => fetchedItem.id === item.id),
          skin_name: fetchedSkins?.find(fetchedSkin => fetchedSkin.id === item.skin)?.name,
          skin_icon: fetchedSkins?.find(fetchedSkin => fetchedSkin.id === item.skin)?.icon,
          upgrades: fetchedInfusions ? [
            ...fetchedUpgrades?.filter(fetchedUpgrade => item.upgrades?.includes(fetchedUpgrade.id)).map((upgrade) => ({
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
          ] : '',
        }));

        setMergedItems(mergingItems);
      } catch (error) {
        console.log(error)
      }
    })();

  }, [selectedTab.equipment, char.equipment, char.equipment_tabs])

  // console.log(mergedItems)

  const {
    getArrowProps,
    getTooltipProps,
    setTooltipRef,
    setTriggerRef,
    visible,
  } = usePopperTooltip({ placement: 'top', offset: [0, 3] });

  return (
    <div className='equipment' ref={wrapperRef}>
      <div className="dropdown">
        <button className={`${char.profession.toLowerCase()}-border dropdown-button`} onClick={toggleMenu}>
          {selectedTab && selectedTab.name ? selectedTab.name : `Equipment ${selectedTab.tab}`}
        </button>
        <span className='info-centered' ref={setTriggerRef}><img className={`${char.profession.toLowerCase()}-filter info-size`} src={info} alt="info-size" /></span>
        {visible && (
          <div
            ref={setTooltipRef}
            {...getTooltipProps({ className: 'tooltip-container equip-tooltip' })}
          >
            <div>
              <div>
                <img className='mouse-click' src={mouseClick} alt="" /> <span className='yellow-popup'>Click</span> the menu on the <span className='yellow-popup'>left</span> to choose <span className='yellow-popup'>Equipment</span>
              </div>
              <div>
                <img className='mouse-click' src={mouseClick} alt="" /> <span className='yellow-popup'>Click</span> the toggle switch on the <span className='yellow-popup'>right</span> to toggle <span className='yellow-popup'>item skins</span> <span className='off-text'>off</span> / <span className={`${char.profession.toLowerCase()}-text`}>on</span>
              </div>
            </div>
            <div {...getArrowProps({ className: 'tooltip-arrow' })} />
          </div>
        )}
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
        <label className="switch">
          <input
            type="checkbox"
            checked={isSliderOn}
            onChange={toggleSlider} />
          <span className={`${char.profession.toLowerCase()}-switch slider round`}></span>
        </label>
      </div>
      <Equipment key={selectedTab.tab + selectedTab.name} items={mergedItems} prof={char.profession} slider={isSliderOn} />
    </div>
  );
}

export default EquipmentDropdown;
