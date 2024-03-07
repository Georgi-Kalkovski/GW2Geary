import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import StoreEquipment from '../../Profile/store.png';
import limitRemovedNames from '../LimitRemovedNames';

function EquipmentSaveButton({ tab, char, currentUser, items, relic, powerCore, slider }) {
    const navigate = useNavigate();
    const ip = 'https://gw2geary.com/api';
    const [formData, setFormData] = useState({
        owner: null,
        name: null,
        gender: null,
        race: null,
        profession: null,
        relic: null,
        powerCore: null,
        eqname: null,
        equipment: []
    });
    useEffect(() => {
        async function saveFormData() {
            if (formData.owner &&
                formData.name &&
                formData.gender &&
                formData.race &&
                formData.profession &&
                formData.relic &&
                formData.powerCore &&
                formData.eqname
            ) {
                try {
                    const response = await axios.put(
                        `${ip}/auth/users/eqs/${formData.name}`,
                        formData,
                        {
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${currentUser.accessToken}`,
                            },
                        }
                    );
                    console.log('Equipment stored successfully');
                    navigate(`/eqs/${response.data.name}/${response.data._id}`);
                    const user = JSON.parse(localStorage.getItem('user')) || {};

                    const currentDate = new Date();
                    const updatedUser = {
                        ...user,
                        accessToken: currentUser.accessToken,
                        storedEquipment: [
                            ...user.storedEquipment?.filter(equipment => equipment.id !== response.data.id),
                            {
                                char: response.data.name,
                                id: response.data._id,
                                gender: char.gender,
                                race: char.race,
                                profession: char.profession,
                                eqname: tab?.name,
                                creationDate: currentDate
                            }
                        ]
                    };
                    localStorage.setItem('user', JSON.stringify(updatedUser));
                } catch (error) {
                    console.error('Error submitting building data:', error);
                    //alert('Error submitting building data');
                }
            }
        }

        saveFormData();
    }, [formData, tab.name, currentUser?.accessToken, ip, navigate, char]);

    const handleSubmit = () => {
        if (char && currentUser) {

            const user = JSON.parse(localStorage.getItem('user')) || {};
            const { storedEquipment } = user;

            if (storedEquipment && storedEquipment.length >= 15) {
                if (!user.apiKeys.some(u => limitRemovedNames.includes(u.accountName))) {
                    alert('You have reached the maximum limit of stored equipment (15).');
                    return;
                }
            }

            const modifiedItems = items.map(item => ({
                id: item.id,
                skin: slider ? item.skin : undefined,
                slot: item.slot,
                dyes: item.dyes,
                infusions: item.infusions,
                upgrades: item.upgrades,
                stats: item.stats
            }));

            setFormData(prevFormData => ({
                ...prevFormData,
                owner: currentUser.id,
                name: char.name,
                gender: char.gender,
                race: char.race,
                profession: char.profession,
                relic: relic[0].id,
                powerCore: powerCore[0].id,
                eqname: tab.name,
                equipment: modifiedItems,
            }));
        }
    };

    return (
        <button type='button' className='game-button' onClick={handleSubmit} style={{ marginTop: '25px' }}>
            <img src={StoreEquipment} alt='StoreEquipment' />
            <div className='nav-a' style={{ marginLeft: '-8px', display: 'inline-block', fontSize: '10px' }}>Store Equipment</div>
        </button >
    )
}

export default EquipmentSaveButton;
