import { useState, useEffect } from "react";
import fetchData from "../../fetchData";

function Specialization({ char }) {
    const tabs = char.build_tabs;
    let buildId = 0;

    const [specializations, setSpecializations] = useState(null);

    if (tabs !== undefined) {
        for (const tab of tabs) {
            if (tab.is_active === true) {
                buildId = tab.build.specializations[2].id;
            }
        }
    }
    useEffect(() => {
        const fetchSpecializations = async () => {
            if (buildId !== 0) {
                const spec = await fetchData('specializations', buildId);
                setSpecializations(spec);
            }
        };
        fetchSpecializations();
    }, [buildId]);

    return (
        <>
            {specializations && <div className="center-class"><img src={specializations.profession_icon} className="spec-icon" alt={specializations.name}/> {specializations.name}</div>}
        </>
    );
}

export default Specialization;