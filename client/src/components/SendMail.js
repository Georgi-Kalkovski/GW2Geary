import { useState } from "react";

function SendMail({ AuthService }) {
    const [usernameInput, setUsernameInput] = useState("");

    const handleCheckUsername = async () => {
        const userFound = (await AuthService.getAllUsers()).data.users.find(u => u.username === usernameInput);
        fetch("http://localhost:3001/reset-password", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ user: userFound }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data); // Handle the response from the server
            })
            .catch((error) => {
                console.error("Error checking username:", error);
            });
    };

    return (
        <>
            {/* New input and button for checking the username */}
            <div className="form-group">
                <h2 style={{ textAlign: 'center', marginBlockEnd: 0 }}>Reset password</h2>
                <p style={{ textAlign: 'center' }}><span>Enter your Username and we </span> <span> will send you an email.</span></p>
                <label htmlFor="check-username">Username</label>
                <input
                    type="text"
                    className="form-control"
                    name="check-username"
                    value={usernameInput}
                    onChange={(e) => setUsernameInput(e.target.value)}
                />
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
        </>
    );
}

export default SendMail;