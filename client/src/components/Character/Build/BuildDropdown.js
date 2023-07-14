import React, { useState, useEffect, useRef } from 'react';
import Build from './Build';
import { usePopperTooltip } from 'react-popper-tooltip';
import mouseClick from '.././mouse-click.svg';


function BuildDropdown({ setSelectedBuild, char, setBuildState, initial }) {
    const [isOpen, setIsOpen] = useState(false);
    const [build, setBuild] = useState([]);
    const [selectedBldTab, setSelectedBldTab] = useState(() => {
        if (initial && char?.build_tabs) {
            const found = char.build_tabs.find((build) => build.tab === parseInt(initial));
            if (found) {
                return found;
            } else {
                return char.build_tabs.find((build) => build.is_active);
            }
        } else if (char && char.build_tabs) {
            return char.build_tabs.find((build) => build.is_active);
        }
    });

    useEffect(() => {
        if (!initial || initial !== selectedBldTab.tab) {
            setBuildState(selectedBldTab?.tab);
        }
    }, []);

    useEffect(() => {
        setSelectedBuild(build);
    }, [build]);
    const wrapperRef = useRef(null);
    const handleClickOutside = (event) => {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [wrapperRef]);


    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }

    const handleItemClick = (event) => {
        const clickedItem = event.target;
        const tab = parseInt(clickedItem.getAttribute('value'));
        if (tab === selectedBldTab.tab) {
            setIsOpen(false);
        } else {
            setSelectedBldTab(char.build_tabs[tab - 1]);
            setBuildState(char.build_tabs[tab - 1].tab);
            setIsOpen(false);
        }
    }

    const {
        getArrowProps,
        getTooltipProps,
        setTooltipRef,
        setTriggerRef,
        visible,
    } = usePopperTooltip({ placement: 'top' });


    return (
        <div className={`build ${char.profession.toLowerCase()}-lightning-border`} ref={wrapperRef}>
            <div className="dropdown">
                <button className={`${char.profession.toLowerCase()}-border dropdown-button`} onClick={toggleMenu} ref={setTriggerRef}>
                    {selectedBldTab && selectedBldTab.build.name ? selectedBldTab.build.name : `Build ${selectedBldTab.tab}`}
                </button>
                {visible && (
                    <div
                        ref={setTooltipRef}
                        {...getTooltipProps({ className: 'tooltip-container attribute-popup' })}
                    >
                        <div>
                            <img className='mouse-click' src={mouseClick} alt="" />
                            <span className='yellow-popup'>Click</span> the menu to choose <span className='yellow-popup'>Build</span> option
                        </div>
                        <div {...getArrowProps({ className: 'tooltip-arrow' })} />
                    </div>
                )}
                {isOpen && (
                    <ul className={`dropdown-menu ${char.profession.toLowerCase()}-lightning-border`}>
                        {char.build_tabs.map((buildTab) => (
                            <li
                                key={buildTab.tab}
                                onClick={handleItemClick}
                                value={buildTab.tab}
                            >
                                {buildTab.build.name ? buildTab.build.name : `Build ${buildTab.tab}`}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            {<Build tab={selectedBldTab.build} setBuild={() => setBuild} key={selectedBldTab.tab} />}
        </div>
    );
}

export default BuildDropdown;
