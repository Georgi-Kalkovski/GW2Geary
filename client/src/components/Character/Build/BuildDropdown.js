import React, { useState } from 'react';
import Build from './Build';

function BuildDropdown({ char }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedTab, setSelectedTab] = useState(null);

    function toggleMenu() {
        setIsOpen(!isOpen);
    }

    function handleItemClick(event) {
        const clickedItem = event.target;
        const tab = clickedItem.getAttribute('value');
        if (tab === selectedTab) {
            setIsOpen(false);
        } else {
            setSelectedTab(tab === "Unknown" ? null : parseInt(tab));
            setIsOpen(false);
        }
    }

    const selectedBuild = char.build_tabs.find((build) => build.tab === selectedTab);
    const activeBuild = char.build_tabs.find((build) => build.is_active);
    return (
        <div className='build'>
            <div className="dropdown">
                <button className={char.profession.toLowerCase() + '-border dropdown-button'} onClick={toggleMenu}>
                    {
                        selectedTab === null && selectedBuild === null && activeBuild === null
                            ? 'Unknown'
                            : (selectedBuild && activeBuild
                                ? (selectedBuild.build.name ? selectedBuild.build.name : `Build ${selectedBuild.tab}`)
                                : (activeBuild.build.name ? activeBuild.build.name : `Build ${activeBuild.tab}`))}
                </button>
                {isOpen && (
                    <ul className="dropdown-menu-right">
                        {char.build_tabs.map((build) => (
                            <li
                                key={build.tab}
                                onClick={handleItemClick}
                                value={build.tab}
                            >
                                {build.build.name ? build.build.name : `Build ${build.tab}`}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            {<Build char={char} tab={selectedTab} key={selectedTab} />}
        </div>
    );
}

export default BuildDropdown;