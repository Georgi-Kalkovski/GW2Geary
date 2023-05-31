import React, { useState, useEffect, useCallback } from "react";

function ChangeUsername({ AuthService, EventBus }) {
    const [users, setUsers] = useState([]);
    const [newUsername, setNewUsername] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");

    useEffect(() => {
        AuthService.getAllUsers()
            .then((response) => {
                const users = response.data.users;
                setUsers(users);
            })
            .catch((error) => {
                console.error("Error retrieving users:", error);
                setUsernameError("Failed to retrieve users. Please try again.");
            });
    }, []);

    const handleChangeUsername = useCallback(() => {
        setUsernameError("");
        AuthService.getAllUsers()
            .then((response) => {
                const users = response.data.users;
                const userExists = users.some((u) => u.username === newUsername);
                if (userExists) {
                    setPopupMessage("Username already exists. Please choose a different one.");
                    setShowPopup(true);
                    setTimeout(() => {
                        setShowPopup(false);
                    }, 3000);
                    return;
                }
                if (newUsername.length < 4) {
                    setPopupMessage("Username must be at least 4 characters long.");
                    setShowPopup(true);
                    setTimeout(() => {
                        setShowPopup(false);
                    }, 3000);
                    return;
                }
    
                AuthService.changeUsername(newUsername)
                    .then((response) => {
                        console.log(response.data.message);
    
                        EventBus.emit("usernameChanged", newUsername);
    
                        const userInfoJSON = localStorage.getItem("user");
                        const userInfo = JSON.parse(userInfoJSON);
                        userInfo.username = newUsername;
                        const updatedUserInfoJSON = JSON.stringify(userInfo);
                        localStorage.setItem("user", updatedUserInfoJSON);
    
                        setPopupMessage(`Username changed to ${newUsername}.`);
                        setShowPopup(true);
                        setTimeout(() => {
                            setShowPopup(false);
                        }, 3000);
                    })
                    .catch((error) => {
                        console.error("Error changing username:", error);
                        setUsernameError("Failed to change username. Please try again.");
                    });
            })
            .catch((error) => {
                console.error("Error retrieving users:", error);
                setUsernameError("Failed to retrieve users. Please try again.");
            });
    }, [newUsername]);
    

    return (
        <>
            {/* Change Username */}
            <div>
                <input
                    type="text"
                    className="form-control"
                    placeholder="New username..."
                    onChange={(e) => setNewUsername(e.target.value)}
                    name={`username-${Math.random()}`}
                />
                {usernameError && <div className="error">{usernameError}</div>}
                <button onClick={handleChangeUsername} className="basic-button">
                    Change Username
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

export default ChangeUsername;
