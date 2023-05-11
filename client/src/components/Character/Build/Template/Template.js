import React, { useState, useEffect } from 'react';
import Profession from './Profession';
import fetchData from '../../../fetchData';
import { usePopperTooltip } from 'react-popper-tooltip';
const BuildTemplate = require('./BuildTemplate');
import mouseClick from '../img/mouse-click.svg'

function Template({ buildInput }) {
    const [traits, setTraits] = useState([]);
    const [profession, setProfession] = useState([]);
    const [skillIndex, setSkillIndex] = useState([]);
    const [buttonColor, setButtonColor] = useState('');

    useEffect(() => {
        async function fetchTraits() {
            const fetchedTraits = [];
            if (buildInput.specializations) {
                for (let i = 1; i <= 3; i++) {
                    for (let j = 1; j <= 3; j++) {
                        try {
                            const skill = await fetchData('traits', buildInput.specializations[i - 1].traits[j - 1]);
                            fetchedTraits.push(skill.order + 1);
                        } catch (error) {
                            console.error(`Error fetching trait ${buildInput.specializations[i - 1].traits[j - 1]}:`, error);
                        }
                    }
                };
            }
            setTraits(fetchedTraits);
        }
        fetchTraits();
    }, [buildInput.specializations]);

    useEffect(() => {
        const fetchProfession = async () => {
            try {
                const prof = await fetchData('professions', buildInput.profession);
                setProfession(prof);
            } catch (error) {
                console.error(`Error fetching profession ${buildInput.profession}:`, error);
            }
        };
        fetchProfession();
    }, [buildInput.profession]);

    useEffect(() => {
        async function fetchSkillIndex() {
            const skills =
                [buildInput.skills.heal, ...buildInput.skills.utilities, buildInput.skills.elite, buildInput.aquatic_skills.heal, ...buildInput.aquatic_skills.utilities, buildInput.aquatic_skills.elite,];

            if (profession.skills_by_palette) {
                try {
                    const skillIndex = await Promise.all(
                        skills.map(skill =>
                            profession.skills_by_palette.find(element => element[1] === skill)
                        )
                    );
                    setSkillIndex(skillIndex.map(skill => skill ? skill[0] : 0));
                } catch (error) {
                    console.error('Error fetching skill index:', error);
                }
            }
        }

        fetchSkillIndex();
    }, [profession.skills_by_palette, buildInput.aquatic_skills.elite, buildInput.aquatic_skills.heal, buildInput.aquatic_skills.utilities, buildInput.skills.elite, buildInput.skills.heal, buildInput.skills.utilities]);

    const {
        getArrowProps,
        getTooltipProps,
        setTooltipRef,
        setTriggerRef,
        visible,
    } = usePopperTooltip({ placement: 'top' });

    const build = new BuildTemplate();
    build.profession = Profession(buildInput.profession);
    build.specializations[0].id = buildInput.specializations[0].id;
    build.specializations[0].traits = [traits[0], traits[1], traits[2]];

    build.specializations[1].id = buildInput.specializations[1].id;
    build.specializations[1].traits = [traits[3], traits[4], traits[5]];

    build.specializations[2].id = buildInput.specializations[2].id;
    build.specializations[2].traits = [traits[6], traits[7], traits[8]];

    build.skills.terrestrial.heal = skillIndex[0];
    build.skills.terrestrial.utilities[0] = skillIndex[1];
    build.skills.terrestrial.utilities[1] = skillIndex[2];
    build.skills.terrestrial.utilities[2] = skillIndex[3];
    build.skills.terrestrial.elite = skillIndex[4];

    build.skills.aquatic.heal = skillIndex[5];
    build.skills.aquatic.utilities[0] = skillIndex[6];
    build.skills.aquatic.utilities[1] = skillIndex[7];
    build.skills.aquatic.utilities[2] = skillIndex[8];
    build.skills.aquatic.elite = skillIndex[9];

    const copyText = () => {
        navigator.clipboard.writeText(build.toString());
        setButtonColor('darkgreen');
        setTimeout(() => {
            setButtonColor('');
        }, 250);
    };

    return (
        <div className='template-container'>
            <input className='template-text' type='text' value={build.toString()} readOnly onDoubleClick={copyText} />
            <button
                className={`${buildInput.profession.toLowerCase()}-border template-button`}
                onClick={copyText}
                style={{ backgroundColor: buttonColor, transition: 'background-color 0.3s ease-out' }}
                ref={setTriggerRef}>
                Copy
            </button>

            {visible && (
                <div
                    ref={setTooltipRef}
                    {...getTooltipProps({ className: 'tooltip-container attribute-popup' })}
                >
                    <div>
                        <img className='mouse-click' src={mouseClick} alt="" /> 
                        <span>Click</span> to <span className='save'>Save</span> Build (<span className='copy-build'>Traits</span> & <span className='copy-build'>Skills</span>)
                    </div>
                    <div {...getArrowProps({ className: 'tooltip-arrow' })} />
                </div>
            )}
        </div>
    );
}

export default Template;