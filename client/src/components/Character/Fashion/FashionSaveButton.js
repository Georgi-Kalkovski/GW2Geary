import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import StoreFashion from '../../Profile/store.png';

function FashionSaveButton({ char, currentUser, items, slider }) {

    const navigate = useNavigate();
    const ip = 'https://gw2geary.com/api';
    const [formData, setFormData] = useState({
        owner: null,
        name: null,
        gender: null,
        race: null,
        profession: null,
        equipment: []
    });

    useEffect(() => {
        async function saveFormData() {
            if (formData.owner && formData.name && formData.gender && formData.race && formData.profession) {
                try {
                    const response = await axios.put(
                        `${ip}/auth/users/fs/${formData.name}`,
                        formData,
                        {
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${currentUser.accessToken}`,
                            },
                        }
                    );
                    console.log('Fashion stored successfully');
                    navigate(`/fs/${response.data.name}/${response.data._id}`);
                    const user = JSON.parse(localStorage.getItem('user')) || {};

                    const currentDate = new Date();
                    const updatedUser = {
                        ...user,
                        storedFashion: [
                            ...user.storedFashion.filter(fashion => fashion.id !== response.data.id),
                            {
                                char: response.data.name,
                                id: response.data._id,
                                gender: char.gender,
                                race: char.race,
                                profession: char.profession,
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
    }, [formData, currentUser?.accessToken, ip, navigate, char]);

    const handleSubmit = () => {
        if (char && currentUser) {

            const user = JSON.parse(localStorage.getItem('user')) || {};
            const { storedFashion } = user;
            if (storedFashion && storedFashion.length >= 15) {
                alert('You have reached the maximum limit of stored fashion (15).');
                return;
            }

            const modifiedItems = items.map(item => ({
                id: item.id,
                skin: slider ? item.skin : undefined,
                slot: item.slot,
                dyes: item.dyes,
                infusions: item.infusions
            }));

            setFormData(prevFormData => ({
                ...prevFormData,
                owner: currentUser.id,
                name: char.name,
                gender: char.gender,
                race: char.race,
                profession: char.profession,
                equipment: modifiedItems
            }));
        }
    };

    return (
        <button type='button' className='game-button' onClick={handleSubmit}>
            <img src={StoreFashion} alt='StoreFashion' />
            <div className='nav-a' style={{marginLeft:'-2px', display: 'inline-block', fontSize: '10px' }}>Store Fashion</div>
        </button >
    )
}

export default FashionSaveButton;
