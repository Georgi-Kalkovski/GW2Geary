import React, { useState, useEffect, useCallback } from "react";

function ChangeUsername({ AuthService, EventBus }) {
    const [users, setUsers] = useState([]);
    const [newUsername, setNewUsername] = useState("");
    const [usernameError, setUsernameError] = useState("");

    // Get All Users
    useEffect(() => {
        AuthService.getAllUsers()
            .then(response => {
                const users = response.data.users;
                setUsers(users);
            })
            .catch(error => {
                console.error("Error retrieving users:", error);
                setUsernameError("Failed to retrieve users. Please try again.");
            });
    }, []);

    // Change Username Logic
    const handleChangeUsername = useCallback(() => {
        setUsernameError("");
        AuthService.getAllUsers()
            .then(response => {
                const users = response.data.users;
                const userExists = users.some(u => u.username === newUsername);
                if (userExists || newUsername === null || newUsername.length < 4) {
                    return;
                }
                AuthService.changeUsername(newUsername)
                    .then(response => {
                        console.log(response.data.message);

                        EventBus.emit("usernameChanged", newUsername);

                        const userInfoJSON = localStorage.getItem("user");
                        const userInfo = JSON.parse(userInfoJSON);
                        userInfo.username = newUsername;
                        const updatedUserInfoJSON = JSON.stringify(userInfo);
                        localStorage.setItem("user", updatedUserInfoJSON);
                    })
                    .catch(error => {
                        console.error("Error changing username:", error);
                        setUsernameError("Failed to change username. Please try again.");
                    });
            })
            .catch(error => {
                console.error("Error retrieving users:", error);
                setUsernameError("Failed to retrieve users. Please try again.");
            });
    }, [newUsername]);

    function handleCombinedUsernameClick(event) {
        const button = event.target;
        changeUsernameColor(button);
        handleChangeUsername();
    }

    function changeUsernameColor(button) {
        button && button.classList.add("darkgreen");
        button.innerText = 'Username Changed';
        setTimeout(function () {
            button && button.classList.remove("darkgreen");
            button.innerText = 'Change Username';
        }, 2000);
    }

    return (
        <>
            {/* Change Username */}
            <div>
                <input
                    type="text"
                    id="newUsername"
                    className="form-control"
                    placeholder="New username..."
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    autoComplete="off"
                />
                {usernameError && <div className="error">{usernameError}</div>}
                <button
                    onClick={handleCombinedUsernameClick}
                    className="basic-button disabled-button"
                    disabled={
                        newUsername === ""
                        || newUsername.length < 4
                        || users.some(u => u.username === newUsername)}
                >
                    Change Username
                </button>
            </div>
        </>
    );
}

export default ChangeUsername;