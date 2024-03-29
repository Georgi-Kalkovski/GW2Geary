import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Build.css';
import StoreBuild from '../../Profile/store.png';
import limitRemovedNames from '../LimitRemovedNames';

function BuildSaveButton({ tab, char, currentUser, spec }) {
    const navigate = useNavigate();
    const ip = 'https://gw2geary.com/api';
    const [formData, setFormData] = useState({
        owner: null,
        name: null,
        profession: null,
        spec: null,
        skills: [],
        aquatic_skills: [],
        specializations: []
    });

    const builds = [
        'berserker', 'bladesworn', 'catalyst', 'chronomancer', 'daredevil', 'deadeye',
        'dragonhunter', 'druid', 'elementalist', 'engineer', 'firebrand', 'guardian',
        'harbinger', 'herald', 'holosmith', 'mechanist', 'mesmer', 'mirage',
        'necromancer', 'ranger', 'reaper', 'renegade', 'revenant', 'scourge',
        'scrapper', 'soulbeast', 'specter', 'spellbreaker', 'tempest', 'thief',
        'untamed', 'vindicator', 'virtuoso', 'warrior', 'weaver', 'willbender'
    ];

    useEffect(() => {
        async function saveFormData() {
            if (formData.owner && formData.name && formData.profession) {
                try {
                    const response = await axios.put(
                        `${ip}/auth/users/blds/${formData.name}`,
                        formData,
                        {
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${currentUser.accessToken}`,
                            },
                        }
                    );
                    console.log('Build stored successfully');
                    navigate(`/blds/${response.data.name}/${response.data._id}`);
                    const user = JSON.parse(localStorage.getItem('user')) || {};

                    const currentDate = new Date();
                    const updatedUser = {
                        ...user,
                        accessToken: currentUser.accessToken,
                        storedBuilds: [
                            ...user.storedBuilds.filter(build => build.id !== response.data.id),
                            {
                                char: response.data.name,
                                id: response.data._id,
                                profession: char.profession,
                                spec: builds.includes(spec.toLowerCase()) ? spec : char.profession,
                                bldname: response.data.bldname,
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
    }, [formData, currentUser.accessToken, ip, spec]);

    const handleSubmit = () => {
        if (tab && tab.skills && tab.aquatic_skills && char && currentUser) {

            const user = JSON.parse(localStorage.getItem('user')) || {};
            const { storedBuilds } = user;

            if (storedBuilds && storedBuilds.length >= 15) {
                if (!user.apiKeys.some(u => limitRemovedNames.includes(u.accountName))) {
                    alert('You have reached the maximum limit of stored builds (15).');
                    return;
                }
            }
            
            setFormData(prevFormData => ({
                ...prevFormData,
                owner: currentUser.id,
                name: char.name,
                profession: char.profession,
                spec: spec ? spec : char.profession,
                bldname: tab.name,
                skills: {
                    heal: tab.skills.heal,
                    utilities: [
                        tab.skills.utilities[0],
                        tab.skills.utilities[1],
                        tab.skills.utilities[2]
                    ],
                    elite: tab.skills.elite
                },
                aquatic_skills: {
                    heal: tab.aquatic_skills.heal,
                    utilities: [
                        tab.aquatic_skills.utilities[0],
                        tab.aquatic_skills.utilities[1],
                        tab.aquatic_skills.utilities[2]
                    ],
                    elite: tab.aquatic_skills.elite
                },
                specializations: tab.specializations.map(spec => ({
                    id: spec.id,
                    traits: spec.traits
                }))
            }));
        }
    };

    return (
        <button type='button' className='game-button' onClick={handleSubmit}>
            <img src={StoreBuild} alt='StoreFashion' />
            <div className='nav-a' style={{ marginLeft: '4px', display: 'inline-block', fontSize: '10px' }}>Store Build</div>
        </button >
    )
}

export default BuildSaveButton;
