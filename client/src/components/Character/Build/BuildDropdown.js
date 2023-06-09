import React, { useState, useEffect, useRef } from 'react';
import Build from './Build'
import { usePopperTooltip } from 'react-popper-tooltip';
import mouseClick from '.././mouse-click.svg'
import info from '.././info.svg';


function BuildDropdown({ char }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedTab, setSelectedTab] = useState(
        char.build_tabs.find((build) => build.is_active)
    );

    // Click outside of dropdown menu logic
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
        if (tab === selectedTab.tab) {
            setIsOpen(false);
        } else {
            setSelectedTab(char.build_tabs[tab - 1]);
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
                    {selectedTab && selectedTab.build.name ? selectedTab.build.name : `Build ${selectedTab.tab}`}
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
            {<Build tab={selectedTab.build} key={selectedTab.tab} />}
        </div>
    );
}

export default BuildDropdown;
