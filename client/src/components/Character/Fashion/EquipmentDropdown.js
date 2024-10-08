import React, { useState, useEffect, useRef } from 'react';
import Equipment from './Equipment';
import fetchData from '../../fetchData';
import InfusionsName from './InfusionsName';

const EquipmentDropdown = ({ char, setEquip, initial, embed }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mergedItems, setMergedItems] = useState([]);
  const [isFashionOn, setIsFashionOn] = useState(() => {
    const storedValue = localStorage.getItem('isFashionOn');
    return storedValue !== null ? JSON.parse(storedValue) : false;
  });
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

  const toggleMenu = () => setIsOpen(!isOpen);

  const wrapperRef = useRef(null);
  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const toggleFashion = () => {
    setIsFashionOn(!isFashionOn);
    window.location.reload();
  };

  useEffect(() => {
    localStorage.setItem('isFashionOn', JSON.stringify(isFashionOn));
  }, [isFashionOn]);

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
        for (const item of fetchedItems) {
          if (item?.details?.type == "LongBow") { item.details.type = "Longbow" }
          if (item?.details?.type == "ShortBow") { item.details.type = "Shortbow" }
          if (item?.details?.type == "HelmAquatic") { item.details.type = "Aquatic Headgear" }
          if (item?.details?.type == "Harpoon") { item.details.type = "Spear" }
          if (item?.details?.type == "Speargun") { item.details.type = "Harpoon Gun" }
        }
        const skinIds = selectedEqTab?.equipment.filter((item) => item.skin).map((item) => item.skin).join(',');
        const fetchedSkins = skinIds ? await fetchData('skins', skinIds) : [];
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
          skin_name: fetchedSkins?.find(fetchedSkin => fetchedSkin.id === item.skin)?.name,
          skin_icon: fetchedSkins?.find(fetchedSkin => fetchedSkin.id === item.skin)?.icon
        }));

        setMergedItems(mergingItems);
      } catch (error) {
        console.log(error)
      }
    })();
  }, [selectedEqTab?.equipment, char?.equipment, char?.equipment_tabs]);

  localStorage.setItem('prof', char?.profession);
  localStorage.setItem('race', char?.race);
  localStorage.setItem('gender', char?.gender);

  return (
    <div
      className={`equipment equipment-fashion ${embed === true ? '' : char?.profession?.toLowerCase()}-lightning-border`}
      style={embed === true ? {} : { marginTop: '-4px' }}
      ref={wrapperRef} >
      {embed !== true &&
        <div>
          <div style={{ fontSize: '35px', marginTop: '-10px' }}>{char.name}</div>
          <div style={{ margin: '0  0 10px 0' }}>{char.gender} {char.race} {char.profession}</div>
        </div>
      }
      <div className="dropdown">
        <button className={`class-hover ${char?.profession?.toLowerCase()}-border dropdown-button`} onClick={toggleMenu}>
          {selectedEqTab && selectedEqTab.name ? selectedEqTab.name : `Equipment ${selectedEqTab.tab}`}
        </button>
        <div className='flex' style={{ textAlign: 'left', padding: '5px 0px 0px 5px' }}>
          <div style={{ marginRight: '5px' }}>Fashion:</div>
          {/* Fashion Switch */}
          <label className="switch" >
            <input
              className="tgl tgl-skewed"
              id="cb3"
              type="checkbox"
              checked={isFashionOn}
              onChange={toggleFashion}
            />
            <span className={`tgl-btn ${char?.profession?.toLowerCase()}-switch`} style={{ paddingTop: '2px' }} data-tg-off="OFF" data-tg-on="ON"></span>
          </label>
        </div>
        <ul className={`dropdown-menu ${char?.profession?.toLowerCase()}-lightning-border transition-hover-search ${isOpen ? 'open' : ''}`} style={{ zIndex: '7', width: '90%', margin: '5px 5%' }}>
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
      <Equipment key={selectedEqTab?.tab + selectedEqTab?.name} items={mergedItems} char={char} embed={embed} />
    </div >
  );
}

export default EquipmentDropdown;
