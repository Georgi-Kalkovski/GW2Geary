import { useState, useEffect } from 'react';
import { useFetchData } from '../useFetchData';
import getItem from './getItem'

function EquipmentTabs({ character }) {
    const [equipmentTab, setEquipmentTab] = useState([]);
    useFetchData(`characters/${character}`, setEquipmentTab);
    const [infusionSum, setInfusionSum] = useState(0);

    useEffect(() => {
        const infusionsArr = [{ name: String, amount: 0 }];
        const equipment = equipmentTab.equipment;
        if (equipment) {
            for (const item of equipment) {
                if (item.infusions && item.tabs.includes(equipmentTab.active_equipment_tab)) {
                    for (const infusion of item.infusions) {
                        const existingInfusion = infusionsArr.find(i => i.name === infusion);
                        if (existingInfusion) {
                            existingInfusion.amount++;
                        } else {
                            infusionsArr.push({ name: infusion, amount: 1 });
                        }
                    }
                }
            }
        }

        let totalSum = 0;
        for (const item of infusionsArr) {
            getItem(item.name).then((data) => {
                const attributes = data.details.infix_upgrade.attributes
                for (const attr of attributes) {
                    if (attr.attribute === "AgonyResistance") {
                        totalSum += attr.modifier * item.amount;
                    }
                }
                setInfusionSum(totalSum);
            });
        }
    }, [equipmentTab]);

    return (
        <p className='extra-space'>
            <img className='agony-image' src="https://wiki.guildwars2.com/images/0/0e/Agony_Resistance.png" alt="" />
            {infusionSum}
            </p>
    );
}

export default EquipmentTabs;
