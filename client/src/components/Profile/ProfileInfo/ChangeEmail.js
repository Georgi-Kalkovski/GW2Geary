import React, { useState, useEffect, useCallback } from "react";

function ChangeEmail({ currentUser, AuthService, EventBus }) {
  const [users, setUsers] = useState([]);
  const [newEmail, setNewEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [hasEmail, setHasEmail] = useState(!!currentUser.email);

  useEffect(() => {
    AuthService.getAllUsers()
      .then((response) => {
        const users = response.data.users;
        setUsers(users);
        setHasEmail(!!currentUser.email || false);
      })
      .catch((error) => {
        console.error("Error retrieving users:", error);
        setEmailError("Failed to retrieve users. Please try again.");
      });
  }, []);

  const handleChangeEmail = useCallback(() => {
    setEmailError("");
    AuthService.getAllUsers()
      .then((response) => {
        const users = response.data.users;
        const emailExists = users.some((u) => u.email === newEmail);
        if (emailExists) {
          setPopupMessage("Email already exists. Please choose a different one.");
          setShowPopup(true);
          setTimeout(() => {
            setShowPopup(false);
          }, 3000);
          return;
        }
        if (!validateEmail(newEmail)) {
          setPopupMessage("Invalid email format. Please enter a valid email address.");
          setShowPopup(true);
          setTimeout(() => {
            setShowPopup(false);
          }, 3000);
          return;
        }

        AuthService.changeEmail(newEmail)
          .then((response) => {
            console.log(response.data.message);

            EventBus.emit("emailChanged", newEmail);

            const userInfoJSON = localStorage.getItem("user");
            const userInfo = JSON.parse(userInfoJSON);
            userInfo.email = newEmail;
            const updatedUserInfoJSON = JSON.stringify(userInfo);
            localStorage.setItem("user", updatedUserInfoJSON);

            setPopupMessage(`Email changed to ${newEmail}.`);
            setShowPopup(true);
            setTimeout(() => {
              setShowPopup(false);
            }, 3000);
          })
          .catch((error) => {
            console.error("Error changing email:", error);
            setEmailError("Failed to change email. Please try again.");
          });
      })
      .catch((error) => {
        console.error("Error retrieving users:", error);
        setEmailError("Failed to retrieve users. Please try again.");
      });
  }, [newEmail]);

  const handleKeyPress = useCallback(
    (e) => {
      if (e.key === "Enter") {
        handleChangeEmail();
      }
    },
    [handleChangeEmail]
  );

  const validateEmail = (email) => {
    return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email);
  };

  const buttonLabel = hasEmail ? "Change Email" : "Add Email";
  const placeholder = hasEmail ? "New email..." : "Add email...";

  return (
    <>
      {/* Change Email */}
      <div>
        <input
          id="changeEmail"
          type="text"
          className="form-control"
          placeholder={placeholder}
          onChange={(e) => setNewEmail(e.target.value)}
          onKeyDown={handleKeyPress}
          name="change-email"
        />
        {emailError && <div className="error">{emailError}</div>}
        <button onClick={handleChangeEmail} className="basic-button info-button">
          {buttonLabel}
        </button>
      </div>

      {/* Popup Modal */}
      {showPopup && (
        <div className="popup-modal">
          <div className="popup-content">
            <p style={{ marginBlockStart: 0 }}>{popupMessage}</p>
          </div>
        </div>
      )}
    </>
  );
}

export default ChangeEmail;
