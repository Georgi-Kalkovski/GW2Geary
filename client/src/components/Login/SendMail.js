import React from 'react';
import { useState, useCallback } from "react";
import axios from "axios";

function SendMail({ AuthService }) {
  const ip = "https://gw2geary.com/api";
  // const [usernameInput, setUsernameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleCheckUsername = async () => {
    const userFound = (await AuthService.getEmail({ email: emailInput })).data.user.find(
      (u) => u.email === emailInput
    );
    if (userFound && userFound.email) {
      axios
        .post(`${ip}/reset-password`, { user: userFound }, { headers: { "Content-Type": "application/json" } })
        .then((response) => {
          console.log(response.data);
          setErrorMessage("Email sent successfully!");
        })
        .catch((error) => {
          console.error("Error checking username:", error);
        });
    } else {
      setErrorMessage("Username doesn't have email.");
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
    <>
      {/* New input and button for checking the username */}
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
          {/* <label htmlFor="check-username">Username</label>
          <input
            type="text"
            className="form-control"
            name="check-username"
            value={usernameInput}
            onChange={(e) => setUsernameInput(e.target.value)}
            onKeyDown={handleKeyPress}
          /> */}

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
    </>
  );
}

export default SendMail;
