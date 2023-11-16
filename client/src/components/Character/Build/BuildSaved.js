import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Traits from './Traits';
import Skills from './Skills';
import Template from './Template/Template';
import fetchData from '../../fetchData';
import './Build.css';
import Cog from '../../../cog.svg'
import Dragon from '../../../dragon.svg'
import AuthService from '../../../services/auth.service';
import { specIcons } from './specIcons';
import BackButton from '../BackButton';

function BuildSaved() {
    const { name, id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [specializations, setSpecializations] = useState([]);
    const [traits, setTraits] = useState([]);
    const [tab, setTab] = useState(null);

    useEffect(() => {
        const fetchBuildData = async () => {
            try {
                let fetchedTab = await AuthService.getBuild(name, id);
                setTab(fetchedTab.data.build);

                const specializationData = await Promise.all(
                    fetchedTab.data.build.specializations.map(async (spec) => {
                        const sp = await fetchData('specializations', spec.id);
                        const [min, maj] = await Promise.all([
                            fetchData('traits', sp[0].minor_traits.join(',')),
                            fetchData('traits', sp[0].major_traits.join(','))
                        ]);
                        return { specialization: sp[0], traits: { min, maj }, activeTraits: spec?.traits };
                    })
                );
                setSpecializations(specializationData);
                setIsLoading(false);
            } catch (error) {
                console.error(error);
                setIsLoading(false);
            }
        };

        fetchBuildData();
    }, [name, id]);

    return (
        <div className='flex center'>
            {tab && (
                <div className={`build ${tab.profession.toLowerCase()}-lightning-border`} style={{marginRight:'4px'}}>
                    <div className="dropdown">
                        {isLoading ? (
                            <div className='logo-build-width'>
                                <div className="flex center">
                                    <div className="logo-loading-div-build">
                                        <img src={Dragon} alt="" className="logo--loading-dragon" />
                                        <img src={Cog} alt="" className="logo-loading-cog" />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <Container className='spec-box logo-build-width' style={{ marginTop: 0 }}>
                                {specializations.length > 0 && tab && (
                                    <div>
                                        <BackButton />
                                        <div className='flex center' style={{ marginLeft: '50px' }}>
                                            <div style={{ fontSize: '30px' }}>{tab.name}</div>
                                            <div className='center-land'>
                                                <img className='' style={{ width: '40px', height: '40px' }} src={specIcons[tab.spec.toLowerCase()]} alt="" />
                                            </div>
                                        </div>
                                        <Skills skills={tab.skills} water_skills={tab.aquatic_skills} prof={tab.profession} />
                                        <Traits setTraits={setTraits} specializations={specializations} prof={tab.profession} />
                                        <Template buildInput={tab} />
                                    </div>
                                )}
                            </Container>
                        )
                        }
                    </div>
                </div>
            )}
        </div>
    );
}

export default BuildSaved;
