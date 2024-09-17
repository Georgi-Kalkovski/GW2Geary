import React, { useState, useEffect, useRef } from 'react';
import { usePopperTooltip } from 'react-popper-tooltip';
import Equipment from './Equipment';
import fetchData from '../../fetchData';
import InfusionsName from '../Fashion/InfusionsName';

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

  const togglePrefixes = () => {
    if (isPrefixesOn) {
      setIsPrefixesOn(false);
    } else {
      setIsPrefixesOn(true);
    }
    setIsFashionOn(false);
  };

  const toggleFashion = () => {
    if (isFashionOn) {
      setIsFashionOn(false);
    } else {
      setIsFashionOn(true);
    }
    setIsPrefixesOn(false);
  };

  useEffect(() => {
    localStorage.setItem('isPrefixesOn', JSON.stringify(isPrefixesOn));
    localStorage.setItem('isFashionOn', JSON.stringify(isFashionOn));
  }, [isPrefixesOn, isFashionOn]);

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

        // Fetch Relic data from api, if there is no fetch but there is equip with slot 'Relic', fetch the legendary relic (101582).
        const equippedRelic = char.equipment.find((equip) => equip.slot === 'Relic' && equip.location === 'Equipped');
        const relicId = equippedRelic?.id;
        let relicData = await fetchData('items', relicId);
        if (!relicData && equippedRelic) {
          console.warn('Relic data not found, fetching with backup ID 101582 (Legendary Relic).');
          relicData = await fetchData('items', 101582);
        }
        setRelic(relicData);

        setPowerCore(await fetchData('items', char.equipment.find((equip) => equip.slot === 'PowerCore')?.id))
        const itemIds = selectedEqTab?.equipment.map((el) => el.id).join(',');
        const fetchedItems = itemIds ? await fetchData('items', itemIds) : [];
        for (const item of fetchedItems) {
          if (item?.details?.type == "LongBow") { item.details.type = "Longbow" }
          if (item?.details?.type == "ShortBow") { item.details.type = "Shortbow" }
          if (item?.details?.type == "HelmAquatic") { item.details.type = "Aquatic Headgear" }
          if (item?.details?.type == "Harpoon") { item.details.type = "Spear" }
          if (item?.details?.type == "Speargun") { item.details.type = "Harpoon Gun" }
        }
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
          powerCore: fetchedItems.find(item => item.type === 'PowerCore'),
          infusions: fetchedInfusions ? (item.infusions
            ?? char?.equipment.find(fetchedItem => fetchedItem.id === item.id)?.infusions
            ?? []
          ).map(infusionId => {
            const fetchedInfusion = fetchedInfusions.find(fetchedInfusion => fetchedInfusion.id === infusionId);
            if (fetchedInfusion && InfusionsName(fetchedInfusion.name)) {
              return fetchedInfusion;
            }
            return null; // or handle non-matching cases as needed
          }).filter(infusion => infusion !== null) : [],
        }));

        setMergedItems(mergingItems);
      } catch (error) {
        console.log(error)
      }
    })();
  }, [selectedEqTab?.equipment, char?.equipment, char?.equipment_tabs]);

  const {
    setTriggerRef: setDropdownTriggerRef,
  } = usePopperTooltip({ placement: 'top', offset: [0, 3] });

  const {
    setTriggerRef: setSwitchTriggerRef,
  } = usePopperTooltip({ placement: 'top', offset: [0, 3] });

  const {
    setTriggerRef: setSwitch2TriggerRef,
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
        selectedEqTab={selectedEqTab}
        items={mergedItems}
        build={build}
        char={char}
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
