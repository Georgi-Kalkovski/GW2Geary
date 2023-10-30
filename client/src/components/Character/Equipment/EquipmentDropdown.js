import React, { useState, useEffect, useRef } from 'react';
import { usePopperTooltip } from 'react-popper-tooltip';
import Equipment from './Equipment';
import EquipmentStats from './EquipmentStats';
import fetchData from '../../fetchData';
import mouseClick from '.././mouse-click.svg';

const EquipmentDropdown = ({ char, build, setEquip, initial }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mergedItems, setMergedItems] = useState([]);
  const [isSliderOn, setIsSliderOn] = useState(() => {
    const storedValue = localStorage.getItem('isSliderOn');
    return storedValue !== null ? JSON.parse(storedValue) : true;
  });
  const [isPrefixesOn, setIsPrefixesOn] = useState(() => {
    const storedValue = localStorage.getItem('isPrefixesOn');
    return storedValue !== null ? JSON.parse(storedValue) : false;
  });

  const [isFashionOn, setIsFashionOn] = useState(() => {
    const storedValue = localStorage.getItem('isFashionOn');
    return storedValue !== null ? JSON.parse(storedValue) : false;
  });
  const [itemstatsOutput, setItemstatsOutput] = useState([]);
  const [relic, setRelic] = useState(null);
  const [powerCore, setPowerCore] = useState(null);
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
  useEffect(() => {
    localStorage.setItem('isSliderOn', JSON.stringify(isSliderOn));
  }, [isSliderOn]);

  const togglePrefixes = () => setIsPrefixesOn(!isPrefixesOn);
  useEffect(() => {
    localStorage.setItem('isPrefixesOn', JSON.stringify(isPrefixesOn));
  }, [isPrefixesOn]);

  const toggleFashion = () => {
    setIsFashionOn(!isFashionOn);
    window.location.reload();
  };

  useEffect(() => {
    localStorage.setItem('isFashionOn', JSON.stringify(isFashionOn));
  }, [isFashionOn]);


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
        setRelic(await fetchData('items', char.equipment.find((equip) => equip.slot === 'Relic')?.id))
        setPowerCore(await fetchData('items', char.equipment.find((equip) => equip.slot === 'PowerCore')?.id))
        const itemIds = selectedEqTab?.equipment.map((el) => el.id).join(',');
        const fetchedItems = itemIds ? await fetchData('items', itemIds) : [];
        const itemstats = [
          ...selectedEqTab?.equipment.filter((item) => item.stats?.id).map((item) => item.stats?.id),
          ...char.equipment.filter((item) => item.stats?.id).map((item) => item.stats?.id),
          ...fetchedItems.filter((item) => item.details?.infix_upgrade?.id).map((item) => item.details?.infix_upgrade?.id),
          ...char.equipment.filter((item) => item.details?.infix_upgrade?.id).map((item) => item.details?.infix_upgrade?.id)
        ].join(',');
        const fetchedItemstats = itemstats ? await fetchData('itemstats', itemstats) : [];
        const skinIds = selectedEqTab?.equipment.filter((item) => item.skin).map((item) => item.skin).join(',');
        const fetchedSkins = skinIds ? await fetchData('skins', skinIds) : [];
        const upgradeIds = selectedEqTab?.equipment.filter((item) => item.upgrades).flatMap((el) => el.upgrades).join(',');
        const fetchedUpgrades = upgradeIds ? await fetchData('items', upgradeIds) : [];
        const dyesIds = selectedEqTab?.equipment.filter((item) => item.dyes).flatMap((el) => el.dyes).join(',');
        const fetchedColors = dyesIds ? await fetchData('colors', dyesIds) : [];
        const infusionIds = [
          ...char?.equipment.flatMap((el) => el.infusions).filter((item) => item !== undefined),
          ...char?.equipment_tabs.flatMap((tab) => tab.equipment.flatMap((item) => item.infusions)).filter((item) => item !== undefined),
        ].join(',');
        const fetchedInfusions = infusionIds ? await fetchData('items', infusionIds) : [];
        const mergingItems = selectedEqTab?.equipment.map(item => ({

          ...char?.equipment.find((fetchedItem => fetchedItem.id === item.id)),
          ...fetchedItems?.find(fetchedItem => fetchedItem.id === item.id),
          ...item,
          dyes: [
            item.dyes && fetchedColors?.find(fetchedDyes => fetchedDyes.id === item.dyes[0]),
            item.dyes && fetchedColors?.find(fetchedDyes => fetchedDyes.id === item.dyes[1]),
            item.dyes && fetchedColors?.find(fetchedDyes => fetchedDyes.id === item.dyes[2]),
            item.dyes && fetchedColors?.find(fetchedDyes => fetchedDyes.id === item.dyes[3]),
          ],
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
          itemstats: fetchedItemstats,
          powerCore: fetchedItems.find(item => item.type === 'PowerCore')
        }));

        setMergedItems(mergingItems);
      } catch (error) {
        console.log(error)
      }
    })();
  }, [selectedEqTab?.equipment, char?.equipment, char?.equipment_tabs, itemstatsOutput]);

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

  const {
    getArrowProps: getSwitch2ArrowProps,
    getTooltipProps: getSwitch2TooltipProps,
    setTooltipRef: setSwitch2TooltipRef,
    setTriggerRef: setSwitch2TriggerRef,
    visible: switch2Visible,
  } = usePopperTooltip({ placement: 'top', offset: [0, 3] });

  return (
    <div className={`equipment ${char?.profession?.toLowerCase()}-lightning-border`} ref={wrapperRef}>
      <div className="dropdown">
        <button
          className={`${char?.profession?.toLowerCase()}-border dropdown-button`}
          style={{ marginLeft: '10px' }}
          onClick={toggleMenu}
          ref={setDropdownTriggerRef}>
          {selectedEqTab && selectedEqTab.name ? selectedEqTab.name : `Equipment ${selectedEqTab.tab}`}
        </button>
        {/* {dropdownVisible && (
          <div
            ref={setDropdownTooltipRef}
            {...getDropdownTooltipProps({ className: 'tooltip-container equip-tooltip dropdown-popup' })}
          >
            <div>
              <div>
                <img className='mouse-click' src={mouseClick} alt="" /> <span className='yellow-popup'>Click</span> to choose <span className='yellow-popup'>Equipment</span>
              </div>
            </div>
            <div {...getDropdownArrowProps({ className: 'tooltip-arrow' })} />
          </div>
        )} */}
        <ul
          className={`dropdown-menu ${char?.profession?.toLowerCase()}-lightning-border transition-hover-search ${isOpen ? 'open' : ''}`}
          style={{ marginLeft: '10px' }}>
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
      </div>
      {/* Switches */}
      <div className='flex center' style={{ margin: '15px' }}>
        {/* Fashion Switch */}
        <div className='flex' style={{ marginRight: '20px' }}>
          <div style={{ marginRight: '5px' }}>Fashion:</div>
          <label className="switch">
            <input
              className="tgl tgl-skewed"
              id="cb3"
              type="checkbox"
              checked={isFashionOn}
              onChange={toggleFashion}
            />
            <span className={`tgl-btn ${char?.profession?.toLowerCase()}-switch`} style={{ paddingTop: '2px' }} data-tg-off="OFF" data-tg-on="ON" ref={setSwitchTriggerRef}></span>
          </label>
        </div>
        {/* Prefixes Switch */}
        <div className='flex' style={{ marginRight: '20px' }}>
          <div style={{ marginRight: '5px' }}>Stats:</div>
          <label className="switch">
            <input
              className="tgl tgl-skewed"
              id="cb3"
              type="checkbox"

              checked={isPrefixesOn}
              onChange={togglePrefixes}
            />
            <span className={`tgl-btn ${char?.profession?.toLowerCase()}-switch`} style={{ paddingTop: '2px' }} data-tg-off="OFF" data-tg-on="ON" ref={setSwitchTriggerRef}></span>
          </label>
        </div>
        {/* Skins Switch */}
        <div className='flex'>
          <div style={{ marginRight: '5px' }}>Skins:</div>
          <label className="switch">
            <input
              className="tgl tgl-skewed"
              id="cb3"
              type="checkbox"
              checked={isSliderOn}
              onChange={toggleSlider}
            />
            <span className={`tgl-btn ${char?.profession?.toLowerCase()}-switch`} style={{ paddingTop: '2px' }} data-tg-off="OFF" data-tg-on="ON" ref={setSwitch2TriggerRef}></span>
          </label>
        </div>

      </div>
      <Equipment
        key={selectedEqTab?.tab + selectedEqTab?.name}
        items={mergedItems}
        build={build}
        prof={char?.profession}
        slider={isSliderOn}
        prefixSlider={isPrefixesOn}
        fashionSlider={isFashionOn}
        powerCore={powerCore}
        relic={relic}
      />
    </div>
  );
}

export default EquipmentDropdown;
