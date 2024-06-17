import React, { useState, useCallback } from 'react';
import axios from 'axios';

function SendMail({ AuthService }) {
  const ip = "https://gw2geary.com/api";
  const [emailInput, setEmailInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleCheckUsername = async () => {
    try {
      const response = await AuthService.getEmail(emailInput);
      const userFound = response.data.user;

      if (userFound.length > 0) {
        await axios.post(`${ip}/reset-password`, { user: userFound[0] }, { headers: { "Content-Type": "application/json" } });
        setErrorMessage("Email sent successfully!");
      } else {
        setErrorMessage("User not found.");
      }
    } catch (error) {
      console.error("Error checking username:", error);
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  const handleKeyPress = useCallback(
    (e) => {
      if (e.key === "Enter") {
        handleCheckUsername();
      }
    },
    [handleCheckUsername]
  );

  return (
    <div className="form-group">
      <h2 style={{ textAlign: "center", marginBlockEnd: 0 }}>
        Reset password
      </h2>
      <p style={{ textAlign: "center" }}>
        <span>Enter your Email and we </span>{" "}
        <span> will send you</span>
        <span> reset password email.</span>
      </p>
      <div className="flex column center">
        <label htmlFor="check-email">Email</label>
        <input
          type="email"
          className="form-control"
          name="check-email"
          value={emailInput}
          onChange={(e) => setEmailInput(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        {errorMessage && <p style={{ textAlign: "center" }}>{errorMessage}</p>}
        <div className="flex center">
          <button
            className="basic-button"
            type="button"
            onClick={handleCheckUsername}
          >
            Send an Email
          </button>
        </div>
      </div>
    </div>
  );
}

export default SendMail;