import React, { useState, useEffect } from "react";
import AuthService from "../services/auth.service";
import ProfileInfo from "./Profile/ProfileInfo";
import ProfileApis from "./Profile/ProfileApis";
import ProfileStorage from "./Profile/ProfileStorage";

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();
  const activeButtonFromStorage = localStorage.getItem("activeButton");
  const [showMessage, setShowMessage] = useState(localStorage.getItem('showMessage'));
  const [showProfileInfo, setShowProfileInfo] = useState(
    activeButtonFromStorage === "profileInfo"
  );
  const [showProfileApis, setShowProfileApis] = useState(
    activeButtonFromStorage === "profileApis" || activeButtonFromStorage === null
  );
  const [showProfileStorage, setShowProfileStorage] = useState(
    activeButtonFromStorage === "profileStorage"
  );

  const toggleProfileInfo = () => {
    setShowProfileInfo(true);
    setShowProfileApis(false);
    setShowProfileStorage(false);
    localStorage.setItem("activeButton", "profileInfo");
  };

  const toggleProfileApis = () => {
    setShowProfileInfo(false);
    setShowProfileApis(true);
    setShowProfileStorage(false);
    localStorage.setItem("activeButton", "profileApis");
  };

  const toggleProfileStorage = () => {
    setShowProfileInfo(false);
    setShowProfileApis(false);
    setShowProfileStorage(true);
    localStorage.setItem("activeButton", "profileStorage");
  };

  useEffect(() => {
    // Update localStorage when state changes
    if (showProfileInfo) {
      localStorage.setItem("activeButton", "profileInfo");
    } else if (showProfileApis) {
      localStorage.setItem("activeButton", "profileApis");
    } else if (showProfileStorage) {
      localStorage.setItem("activeButton", "profileStorage");
    }
  }, [showProfileInfo, showProfileApis, showProfileStorage]);

  useEffect(() => {
    const showMessageStatus = localStorage.getItem('showMessage');
    setShowMessage(showMessageStatus !== 'false');
  }, []);

  const handleClose = () => {
    setShowMessage(false);
    localStorage.setItem('showMessage', 'false');
  };

  return (
    <div>
      {currentUser && (
        <>
          <div className="flex center">
            <button
              className={`basic-button ${showProfileInfo ? "active" : ""}`}
              onClick={toggleProfileInfo}
            >
              Profile Info
            </button>
            <button
              className={`basic-button ${showProfileApis ? "active" : ""}`}
              onClick={toggleProfileApis}
            >
              Profile Apis
            </button>
            <button
              className={`basic-button ${showProfileStorage ? "active" : ""}`}
              onClick={toggleProfileStorage}
            >
              Profile Storage
            </button>
          </div>
          <div>
            {showProfileInfo && (
              <ProfileInfo currentUser={currentUser} AuthService={AuthService} />
            )}

            {showProfileApis && (
              <ProfileApis currentUser={currentUser} AuthService={AuthService} />
            )}

            {showProfileStorage && (
              <ProfileStorage
                currentUser={currentUser}
                AuthService={AuthService}
              />
            )}
            {showMessage === true && (
              <div className="flex center" >
                <div className="flex center" style={{ backgroundColor: '#ff3b3b', padding: '0 10px' }}>
                  <div>
                    <span style={{ fontSize: '18px' }}>Important!</span> If you are missing information, please Logout and Login again.
                  </div>
                  <div onClick={handleClose} style={{ marginLeft: '5px', cursor: 'pointer', fontSize: '20px' }}>
                    ✖
                  </div>
                </div>
              </div>
            )}
          </div>

          <br />
        </>
      )}
    </div>
  );
};

export default Profile;
