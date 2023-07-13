import React, { useState, useEffect, useRef } from 'react';
import { usePopperTooltip } from 'react-popper-tooltip';
import Equipment from './Equipment';
import fetchData from '../../fetchData';
import mouseClick from '.././mouse-click.svg';

const EquipmentDropdown = ({ char, build, setEquip, initial }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mergedItems, setMergedItems] = useState([]);
  const [isSliderOn, setIsSliderOn] = useState(true);
  const [selectedEqTab, setSelectedEqTab] = useState(() => {
    if (initial && char?.equipment_tabs) {
      const found = char.equipment_tabs.find((equip) => equip.tab === parseInt(initial));
      if (found) {
        return found;
      } else {
        return char.equipment_tabs.find((equip) => equip.is_active);
      }
    } else if (char && char.equipment_tabs) {
      return char.equipment_tabs.find((equip) => equip.is_active);
    }
  });

  useEffect(() => {
    if (!initial || initial !== selectedEqTab.tab) {
      setEquip(selectedEqTab?.tab);
    }
  }, []);

  const toggleSlider = () => setIsSliderOn(!isSliderOn);
  const toggleMenu = () => setIsOpen(!isOpen);

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

  const handleItemClick = (event) => {
    const clickedItem = event.target;
    const tab = parseInt(clickedItem.getAttribute('value'));
    if (tab === selectedEqTab?.tab) {
      setIsOpen(false);
    } else {
      setSelectedEqTab(char?.equipment_tabs[tab - 1]);
      setEquip(char?.equipment_tabs[tab - 1].tab);
      setIsOpen(false);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        if (selectedEqTab?.equipment.length === 0) {
          setMergedItems([]);
          return;
        }
        const itemIds = selectedEqTab?.equipment.map((el) => el.id).join(',');
        const fetchedItems = itemIds ? await fetchData('items', itemIds) : [];
        const skinIds = selectedEqTab?.equipment.filter((item) => item.skin).map((item) => item.skin).join(',');
        const fetchedSkins = skinIds ? await fetchData('skins', skinIds) : [];
        const upgradeIds = selectedEqTab?.equipment.filter((item) => item.upgrades).flatMap((el) => el.upgrades).join(',');
        const fetchedUpgrades = upgradeIds ? await fetchData('items', upgradeIds) : [];
        const infusionIds = [
          ...char?.equipment.flatMap((el) => el.infusions).filter((item) => item !== undefined),
          ...char?.equipment_tabs.flatMap((tab) => tab.equipment.flatMap((item) => item.infusions)).filter((item) => item !== undefined),
        ].join(',');
        const fetchedInfusions = infusionIds ? await fetchData('items', infusionIds) : [];

        const mergingItems = selectedEqTab?.equipment.map(item => ({
          ...item,
          ...char?.equipment.find((fetchedItem => fetchedItem.id === item.id)),
          ...fetchedItems?.find(fetchedItem => fetchedItem.id === item.id),
          skin_name: fetchedSkins?.find(fetchedSkin => fetchedSkin.id === item.skin)?.name,
          skin_icon: fetchedSkins?.find(fetchedSkin => fetchedSkin.id === item.skin)?.icon,
          upgrades: fetchedInfusions ? [
            ...fetchedUpgrades?.filter(fetchedUpgrade => item.upgrades?.includes(fetchedUpgrade.id)).map((upgrade) => ({
              ...upgrade,
              counter: selectedEqTab?.equipment.reduce((count, fetchedItem) => {
                if (fetchedItem.slot === "HelmAquatic") {
                  return count;
                }
                return count + (fetchedItem.upgrades && fetchedItem.upgrades.includes(upgrade.id) ? 1 : 0);
              }, 0)
            })),
            ...(item.infusions
              ?? char?.equipment.find(fetchedItem => fetchedItem.id === item.id)?.infusions
              ?? []
            ).map(infusionId => fetchedInfusions?.find(fetchedInfusion => fetchedInfusion.id === infusionId)),
          ] : '',
        }));

        setMergedItems(mergingItems);
      } catch (error) {
        console.log(error)
      }
    })();
  }, [selectedEqTab?.equipment, char?.equipment, char?.equipment_tabs]);

  const {
    getArrowProps: getDropdownArrowProps,
    getTooltipProps: getDropdownTooltipProps,
    setTooltipRef: setDropdownTooltipRef,
    setTriggerRef: setDropdownTriggerRef,
    visible: dropdownVisible,
  } = usePopperTooltip({ placement: 'top', offset: [0, 3] });

  const {
    getArrowProps: getSwitchArrowProps,
    getTooltipProps: getSwitchTooltipProps,
    setTooltipRef: setSwitchTooltipRef,
    setTriggerRef: setSwitchTriggerRef,
    visible: switchVisible,
  } = usePopperTooltip({ placement: 'top', offset: [0, 3] });

  return (
    <div className={`equipment ${char?.profession?.toLowerCase()}-lightning-border`} ref={wrapperRef}>
      <div className="dropdown">
        <button className={`${char?.profession?.toLowerCase()}-border dropdown-button`} onClick={toggleMenu} ref={setDropdownTriggerRef}>
          {selectedEqTab && selectedEqTab.name ? selectedEqTab.name : `Equipment ${selectedEqTab.tab}`}
        </button>
        {dropdownVisible && (
          <div
            ref={setDropdownTooltipRef}
            {...getDropdownTooltipProps({ className: 'tooltip-container equip-tooltip' })}
          >
            <div>
              <div>
                <img className='mouse-click' src={mouseClick} alt="" /> <span className='yellow-popup'>Click</span> to choose <span className='yellow-popup'>Equipment</span>
              </div>
            </div>
            <div {...getDropdownArrowProps({ className: 'tooltip-arrow' })} />
          </div>
        )}
        {isOpen && (
          <ul className={`dropdown-menu ${char?.profession?.toLowerCase()}-lightning-border`}>
            {char?.equipment_tabs.map((equip) => (
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
          <span className={`${char?.profession?.toLowerCase()}-switch slider round`} ref={setSwitchTriggerRef}></span>
        </label>
        {switchVisible && (
          <div
            ref={setSwitchTooltipRef}
            {...getSwitchTooltipProps({ className: 'tooltip-container equip-tooltip' })}
          >
            <div>
              <div>
                <img className='mouse-click' src={mouseClick} alt="" /> <span className='yellow-popup'>Click</span> to toggle <span className='yellow-popup'>item skins</span> <span className='off-text'>off</span>/<span className={`${char?.profession?.toLowerCase()}-text`}>on</span>
              </div>
            </div>
            <div {...getSwitchArrowProps({ className: 'tooltip-arrow' })} />
          </div>
        )}
      </div>
      <Equipment key={selectedEqTab?.tab + selectedEqTab?.name} items={mergedItems} build={build} prof={char?.profession} slider={isSliderOn} />
    </div>
  );
}

export default EquipmentDropdown;
