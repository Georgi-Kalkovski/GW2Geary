import { useState, useEffect } from 'react';
import fetchData from '../fetchData';

function SpecBox({ spec }) {
    const [specialization, setSpecialization] = useState(null);
    const [traits, setTraits] = useState(null);

    useEffect(() => {
        const fetchSpec = async () => {
            const char = await fetchData('specializations', spec.id);
            setSpecialization(char);
        };
        fetchSpec();
    }, [spec.id]);


    console.log(specialization)
    return (
        <div className='cropped-spec-img-div'>
            {specialization && (
                <img className='cropped-spec-img' src={specialization.background} alt={specialization.name} />
            )}
        </div>
    );
}

export default SpecBox;