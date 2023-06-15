import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Traits from './Traits';
import Skills from './Skills';
import Template from './Template/Template';
import fetchData from '../../fetchData';
import './Build.css';
import Cog from '../../../cog.svg'
import Dragon from '../../../dragon.svg'

function Build({ setBuild, tab }) {
    const [isLoading, setIsLoading] = useState(true);
    const [specializations, setSpecializations] = useState([]);

    const [traits, setTraits] = useState([]);
    setBuild(traits);
    
    useEffect(() => {
        const fetchSpecializations = async () => {
            try {
                const specializationData = await Promise.all(
                    tab.specializations.map(async (spec) => {
                        const sp = await fetchData('specializations', spec.id);
                        const [min, maj] = await Promise.all([
                            fetchData('traits', sp[0].minor_traits.join(',')),
                            fetchData('traits', sp[0].major_traits.join(','))
                        ]);
                        return { specialization: sp[0], traits: { min, maj }, activeTraits: spec?.traits };
                    })
                );

                setSpecializations(specializationData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchSpecializations();
    }, [tab.specializations]);


    useEffect(() => {
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, [tab]);

    return (<>
        {
            isLoading
                ?
                <div className='logo-build-width'>
                    <div className="flex center">
                        < div className="logo-loading-div-build" >
                            <img src={Dragon} alt="" className="logo--loading-dragon" />
                            <img src={Cog} alt="" className="logo-loading-cog" />
                        </div >
                    </div >
                </div>
                : <Container className='spec-box logo-build-width'>
                    {specializations && tab.skills && tab.aquatic_skills && (
                        <>
                            <Skills skills={tab.skills} water_skills={tab.aquatic_skills} prof={tab.profession} />
                            <Traits setTraits={setTraits} specializations={specializations} prof={tab.profession} />
                            <br />
                            <Template buildInput={tab} />
                        </>
                    )}
                </Container>
        }
    </>
    );
}

export default Build;