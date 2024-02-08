import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
function DeleteUser({ AuthService, currentUser }) {
    const [showPopup, setShowPopup] = useState(false);
    const confirmUserBeforeDelete = () => {
        togglePopup();
    };

    const deleteCurrentUser = useCallback(() => {
        AuthService.deleteCurrentUser(currentUser.accessToken)
            .then(() => {
                AuthService.logout();
                window.location.reload();
            })
            .catch((error) => {
                console.error("Error deleting user:", error);
            });
    }, []);

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    return (
        <div className="flex-row column">
            {/* Delete User Button */}
            <button
                onClick={confirmUserBeforeDelete}
                className="basic-button delete-button"
                style={{ marginLeft: '3px' }}
            >
                Delete User
            </button>

            {/* Popup */}
            {showPopup && (
                <div className="popup flex center">
                    <div className="popup-content">
                        <h4 style={{ marginTop: 0, marginBottom: 0 }}>Confirm Delete</h4>
                        <div>Are you sure you want to delete the user?</div>
                        <div className="popup-buttons">

                            <Link to="/"><button onClick={deleteCurrentUser} className="delete-button" style={{ marginLeft: '3px' }}>
                                Yes, Delete
                            </button>
                            </Link>
                            <button onClick={togglePopup} className="basic-button">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DeleteUser;
