import React, { useState, useCallback } from "react";

function DeleteUser({ currentUser, AuthService }) {
    const [usernameInput, setUsernameInput] = useState("");
    const [isInputValid, setIsInputValid] = useState(false);

    // Delete Logic
    const confirmUserBeforeDelete = (event) => {
        const { value } = event.target;
        setUsernameInput(value);
        setIsInputValid(value === currentUser.username);
    };
    
    const deleteCurrentUser = useCallback(() => {
        AuthService.deleteCurrentUser()
            .then(() => {
                AuthService.logout();
                window.location.reload();
            })
            .catch((error) => {
                console.error("Error deleting user:", error);
            });
    }, []);

    return (
        <>
            {/* Delete User */}
            <div>
                {/* Repeat the current user's username */}
                <input
                    type="text"
                    className="form-control"
                    placeholder={`Write '${currentUser.username}' to delete user...`}
                    value={usernameInput}
                    onChange={confirmUserBeforeDelete}
                />
                {/* Delete User Button */}
                <button
                    onClick={deleteCurrentUser}
                    className="disabled-button delete-button"
                    disabled={!isInputValid}
                >
                    Delete User
                </button>
            </div>
        </>
    );
}

export default DeleteUser;