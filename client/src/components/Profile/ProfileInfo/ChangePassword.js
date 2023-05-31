import React, { useState, useCallback } from "react";

function ChangePassword({ currentUser, AuthService, EventBus }) {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");

    // Change Password Logic
    const handleChangePassword = useCallback(() => {
        setPasswordError("");
        setConfirmPasswordError("");
        if (newPassword !== confirmPassword) {
            setConfirmPasswordError("Password and confirm password do not match.");
            return;
        }
        AuthService.changePassword(newPassword)
            .then((response) => {
                console.log(response.data.message);
                EventBus.emit("passwordChanged", true);
            })
            .catch((error) => {
                console.error("Error changing password:", error);
                setPasswordError("Failed to change password. Please try again.");
            });
    }, [newPassword, confirmPassword]);

    function handleCombinedPasswordClick(event) {
        const button = event.target;
        changePasswordColor(button);
        handleChangePassword();
    }

    function changePasswordColor(button) {
        button && button.classList.add("darkgreen");
        button.innerText = 'Password Changed';
        setTimeout(function () {
            button && button.classList.remove("darkgreen");
            button.innerText = 'Change Password';
        }, 2000);
    }
    return (
        <>
            {/* Change Password */}
            <div className="flex-row-center">
                <div>
                    <div>
                        <input
                            type="password"
                            id="newPassword"
                            className="form-control"
                            placeholder="New password..."
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        {passwordError && <div className="error">{passwordError}</div>}
                    </div>
                    <div>

                        <input
                            type="password"
                            id="confirmPassword"
                            className="form-control"
                            placeholder="Confirm password..."
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        {confirmPasswordError && <div className="error">{confirmPasswordError}</div>}
                    </div>
                </div>
                <div>
                    <button
                        onClick={handleCombinedPasswordClick}
                        className="disabled-button basic-button"
                        disabled={
                            newPassword.length < 4
                            || newPassword !== confirmPassword
                            || newPassword === currentUser.password
                            || !newPassword
                            || !confirmPassword}
                    >
                        Change Password
                    </button>
                </div>
            </div>
        </>
    );
}

export default ChangePassword;