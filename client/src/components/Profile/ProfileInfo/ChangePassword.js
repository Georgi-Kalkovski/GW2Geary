import React, { useState, useCallback, useEffect } from "react";

function ChangePassword({ currentUser, AuthService, EventBus }) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showNotification, setShowNotification] = useState(false);

  // Change Password Logic
  const handleChangePassword = useCallback(() => {
    setErrorMessage("");
    if (!newPassword || !confirmPassword) {
      setErrorMessage("Both fields should be filled.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorMessage("Password and confirm password do not match.");
      return;
    }
    if (newPassword.length < 4 || confirmPassword.length < 4) {
      setErrorMessage("Password should be more than 3 letters long.");
      return;
    }
    if (!/^[A-Za-z0-9]+$/.test(newPassword) || !/^[A-Za-z0-9]+$/.test(confirmPassword)) {
      setErrorMessage("Password can only contain letters and numbers.");
      return;
    }
    console.log(currentUser.password)
    AuthService.changePassword(newPassword)
      .then((response) => {
        console.log(response.data.message);
        setShowNotification(true);
        setNewPassword("");
        setConfirmPassword("");
        EventBus.emit("passwordChanged", true);
      })
      .catch((error) => {
        console.error("Error changing password:", error);
        setErrorMessage("Failed to change password. Please try again.");
        setTimeout(() => {
          setErrorMessage("");
        }, 5000);
      });
  }, [newPassword, confirmPassword]);

  useEffect(() => {
    let timer;
    if (showNotification) {
      timer = setTimeout(() => {
        setShowNotification(false);
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [showNotification]);

  useEffect(() => {
    let errorTimer;
    if (errorMessage) {
      errorTimer = setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
    return () => clearTimeout(errorTimer);
  }, [errorMessage]);

  const handleKeyPress = useCallback(
    (e) => {
      if (e.key === "Enter") {
        handleChangePassword();
      }
    },
    [handleChangePassword]
  );

  return (
    <>
      {/* Change Password */}
      <div className="flex-row">
        <div>
          <div>
            <input
              id="addNewPassword"
              type="password"
              className="form-control"
              placeholder="New password..."
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              onKeyDown={handleKeyPress}
            />
          </div>
          <div>
            <input
              id="addNewPasswordConfirm"
              type="password"
              className="form-control"
              placeholder="Confirm password..."
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onKeyDown={handleKeyPress}
            />
          </div>
        </div>
        <div>
          <button onClick={handleChangePassword} className="disabled-button basic-button">
            Change Password
          </button>
        </div>
      </div>

      {/* Notification Area */}
      {showNotification && (
        <div className="notification success">
          <p>Password changed successfully!</p>
        </div>
      )}

      {errorMessage && (
        <div className="notification error">
          <p>{errorMessage}</p>
        </div>
      )}
    </>
  );
}

export default ChangePassword;
