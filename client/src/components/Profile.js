import React, { useState } from "react";
import AuthService from "../services/auth.service";
import ProfileInfo from "./Profile/ProfileInfo";
import ProfileApis from "./Profile/ProfileApis";

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();
  const [showProfileInfo, setShowProfileInfo] = useState(false);
  const [showProfileApis, setShowProfileApis] = useState(true);

  const toggleProfileInfo = () => {
    if (!showProfileInfo) {
      setShowProfileInfo(true);
      setShowProfileApis(false);
    }
  };

  const toggleProfileApis = () => {
    if (!showProfileApis) {
      setShowProfileApis(true);
      setShowProfileInfo(false);
    }
  };

  return (
    <>
      {currentUser && (
        <>
          <div className="flex center">
            <button className={`basic-button ${showProfileInfo ? 'active' : ''}`} onClick={toggleProfileInfo}>Profile Info</button>
            <button className={`basic-button ${showProfileApis ? 'active' : ''}`} onClick={toggleProfileApis}>Profile Apis</button>
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
          </div>
          <br />
        </>
      )}
    </>
  );
};

export default Profile;
