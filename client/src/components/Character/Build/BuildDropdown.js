import React, { useState } from 'react';
import Build from './Build';

function BuildDropdown({ char }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedTab, setSelectedTab] = useState(
        char.build_tabs.find((build) => build.is_active)
    );

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

    return (
        <div className='build'>
            <div className="dropdown">
                <button className={`${char.profession.toLowerCase()}-border dropdown-button`} onClick={toggleMenu}>
                    {selectedTab && selectedTab.build.name ? selectedTab.build.name : `Build ${selectedTab.tab}`}
                </button>
                {isOpen && (
                    <ul className="dropdown-menu">
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
