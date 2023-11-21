import React, { useState, useEffect } from "react";
import BuildStorage from "./ProfileStorage/BuildStorage";
import FashionStorage from "./ProfileStorage/FashionStorage";

function ProfileStorage({ currentUser }) {
  const [showProfileFashionStorage, setShowProfileFashionStorage] = useState(
    localStorage.getItem("activeProfileStorage") === "profileFashionStorage"
  );
  const [showProfileEquipmentStorage, setShowProfileEquipmentStorage] = useState(
    localStorage.getItem("activeProfileStorage") === "profileEquipmentStorage" ||
    localStorage.getItem("activeProfileStorage") === null
  );
  const [showProfileBuildStorage, setShowProfileBuildStorage] = useState(
    localStorage.getItem("activeProfileStorage") === "profileBuildStorage"
  );

  const toggleProfileInfo = () => {
    setShowProfileFashionStorage(true);
    setShowProfileEquipmentStorage(false);
    setShowProfileBuildStorage(false);
    localStorage.setItem("activeProfileStorage", "profileFashionStorage");
  };

  const toggleProfileApis = () => {
    setShowProfileFashionStorage(false);
    setShowProfileEquipmentStorage(true);
    setShowProfileBuildStorage(false);
    localStorage.setItem("activeProfileStorage", "profileEquipmentStorage");
  };

  const toggleProfileStorage = () => {
    setShowProfileFashionStorage(false);
    setShowProfileEquipmentStorage(false);
    setShowProfileBuildStorage(true);
    localStorage.setItem("activeProfileStorage", "profileBuildStorage");
  };

  useEffect(() => {
    // Update localStorage when state changes
    if (showProfileFashionStorage) {
      localStorage.setItem("activeProfileStorage", "profileFashionStorage");
    } else if (showProfileEquipmentStorage) {
      localStorage.setItem("activeProfileStorage", "profileEquipmentStorage");
    } else if (showProfileBuildStorage) {
      localStorage.setItem("activeProfileStorage", "profileBuildStorage");
    }
  }, [showProfileFashionStorage, showProfileEquipmentStorage, showProfileBuildStorage]);

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
                        <FashionStorage
                          storage={currentUser.storedFashion}
                        />
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
      </div>
    </>
  );
}

export default ProfileStorage;
