import React, { useState } from "react";
import AuthService from "../services/auth.service";
import ProfileInfo from "./Profile/ProfileInfo";
import ProfileApis from "./Profile/ProfileApis";
import ProfileStorage from "./Profile/ProfileStorage";

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();
  const [showProfileInfo, setShowProfileInfo] = useState(false);
  const [showProfileApis, setShowProfileApis] = useState(true);
  const [showProfileStorage, setShowProfileStorage] = useState(false);

  const toggleProfileInfo = () => {
    if (!showProfileInfo) {
      setShowProfileInfo(true);
      setShowProfileApis(false);
      setShowProfileStorage(false);

    }
  };

  const toggleProfileApis = () => {
    if (!showProfileApis) {
      setShowProfileApis(true);
      setShowProfileInfo(false);
      setShowProfileStorage(false);
    }
  };
  const toggleProfileStorage = () => {
    if (!showProfileStorage) {
      setShowProfileApis(false);
      setShowProfileInfo(false);
      setShowProfileStorage(true);

    }
  };
  return (
    <div>
      {currentUser && (
        <>
          <div className="flex center">
            <button className={`basic-button ${showProfileInfo ? 'active' : ''}`} onClick={toggleProfileInfo}>Profile Info</button>
            <button className={`basic-button ${showProfileApis ? 'active' : ''}`} onClick={toggleProfileApis}>Profile Apis</button>
            <button className={`basic-button ${showProfileStorage ? 'active' : ''}`} onClick={toggleProfileStorage}>Profile Storage</button>
          </div>
          <div>
            {showProfileInfo && (
              <ProfileInfo
                currentUser={currentUser}
                AuthService={AuthService}
              />
            )}

            {showProfileApis && (
              <ProfileApis
                currentUser={currentUser}
                AuthService={AuthService}
              />
            )}

            {showProfileStorage && (
              <ProfileStorage
                currentUser={currentUser}
                AuthService={AuthService}
              />
            )}
          </div>
          <br />
        </>
      )}
    </div>
  );
};

export default Profile;
