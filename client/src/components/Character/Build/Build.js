import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Traits from './Traits';
import Skills from './Skills';
import Template from './Template/Template';
import './Build.css';
import Cog from '../../../cog.svg'
import Dragon from '../../../dragon.svg'

function Build({ tab }) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, [tab]);

    return (<>
        {
            isLoading
                ? <div className="flex center">
                    < div className="logo-loading-div" >
                        <img src={Dragon} alt="" className="logo--loading-dragon" />
                        <img src={Cog} alt="" className="logo-loading-cog" />
                    </div >
                </div >
                : <Container className='spec-box'>
                    {tab.specializations && tab.skills && tab.aquatic_skills && (
                        <>
                            <Skills skills={tab.skills} water_skills={tab.aquatic_skills} prof={tab.profession} />
                            {tab.specializations.map((spec, index) => (
                                <div key={index}>
                                    <Traits spec={spec} prof={tab.profession} />
                                </div>
                            ))}
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