import React, { useState, useCallback } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const ResetPassword = () => {
    const { token } = useParams();
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleResetPassword = () => {
        if (!newPassword || !confirmPassword) {
            setErrorMessage("Both fields should be filled.");
            return;
        }
        if (newPassword !== confirmPassword) {
            setErrorMessage("Passwords do not match.");
            return;
        }
        if (newPassword.length < 4 || confirmPassword.length < 4) {
            setErrorMessage("Password is less than 4.");
            return;
        }
        if (!/^[A-Za-z0-9]+$/.test(newPassword) || !/^[A-Za-z0-9]+$/.test(confirmPassword)) {
            setErrorMessage("Invalid password.");
            return;
        }
        axios
            .post(`http://46.55.197.57:3001/reset-password/${token}`, { newPassword })
            .then((response) => {
                console.log(response)
                // Handle the success response
                console.log(response?.data?.message);

                // Reset the input fields and error message
                setNewPassword("");
                setConfirmPassword("");
                setErrorMessage("");

                navigate("/login");
            })
            .catch((error) => {
                // Handle the error response
                console.error(error);
            });
    };
    const handleKeyPress = useCallback(
        (e) => {
            if (e.key === "Enter") {
                handleResetPassword();
            }
        },
        [handleResetPassword]
    );

    return (
        <div className="flex center">
            <div>
                <h2 style={{ textAlign: 'center' }}>Reset Password</h2>
                <div>
                    <label>New Password</label>
                    <input
                        type="password"
                        value={newPassword}
                        className="form-control"
                        onChange={(e) => setNewPassword(e.target.value)}
                        onKeyDown={handleKeyPress}
                    />
                </div>
                <div>
                    <label>Confirm Password</label>
                    <input
                        type="password"
                        className="form-control"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        onKeyDown={handleKeyPress}
                    />
                </div>
                {errorMessage && <p>{errorMessage}</p>}
                <div className="flex center">
                    <button className="basic-button" onClick={handleResetPassword}>Reset Password</button>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
