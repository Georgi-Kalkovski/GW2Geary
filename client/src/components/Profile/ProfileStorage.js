import React, { useState } from "react";
import BuildStorage from "./ProfileStorage/BuildStorage";
function ProfileStorage({ currentUser }) {
    const [showProfileFashionStorage, setShowProfileFashionStorage] = useState(false);
    const [showProfileEquipmentStorage, setShowProfileEquipmentStorage] = useState(false);
    const [showProfileBuildStorage, setShowProfileBuildStorage] = useState(true);

    const toggleProfileInfo = () => {
        if (!showProfileFashionStorage) {
            setShowProfileFashionStorage(true);
            setShowProfileEquipmentStorage(false);
            setShowProfileBuildStorage(false);

        }
    };

    const toggleProfileApis = () => {
        if (!showProfileEquipmentStorage) {
            setShowProfileEquipmentStorage(true);
            setShowProfileFashionStorage(false);
            setShowProfileBuildStorage(false);
        }
    };
    const toggleProfileStorage = () => {
        if (!showProfileBuildStorage) {
            setShowProfileEquipmentStorage(false);
            setShowProfileFashionStorage(false);
            setShowProfileBuildStorage(true);

        }
    };

    return (
        <>
            <div className="container" key="profile-container" style={{ marginTop: '20px' }}>
                <div className="flex center apis-flex" key="apis-flex">
                    <div className="flex column" >
                        <div>
                            {currentUser && (
                                <>
                                    <div className="flex center">
                                        <button className={`basic-button ${showProfileFashionStorage ? 'active' : ''}`} onClick={toggleProfileInfo}>Fashion Storage</button>
                                        <button className={`basic-button ${showProfileEquipmentStorage ? 'active' : ''}`} onClick={toggleProfileApis}>Equipment Storage</button>
                                        <button className={`basic-button ${showProfileBuildStorage ? 'active' : ''}`} onClick={toggleProfileStorage}>Build Storage</button>
                                    </div>
                                    <div>
                                        {showProfileFashionStorage && (
                                            <>
                                                {/* TODO: Make Fashion Storage */}
                                                <div className="flex center">Fashion Storage - SOON TM</div>
                                            </>
                                        )}

                                        {showProfileEquipmentStorage && (
                                            <>
                                                {/* TODO: Make Equipment Storage */}
                                                <div className="flex center">Equipment Storage - SOON TM</div>
                                            </>
                                        )}

                                        {showProfileBuildStorage && (
                                            <>
                                                <BuildStorage
                                                    storage={currentUser.storedBuilds}
                                                />
                                            </>
                                        )}
                                    </div>
                                    <br />
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
}

export default ProfileStorage;