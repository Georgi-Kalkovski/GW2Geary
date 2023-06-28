import React, { useState, useEffect } from "react";
import axios from "axios";
import ProfileApiCharacters from "./ProfileApis/ProfileApiCharacters";
import ProfileApiInfo from "./ProfileApis/ProfileApiInfo";
import ProfileApiCreate from "./ProfileApis/ProfileApiCreate";
function ProfileApis({ currentUser, AuthService }) {
    const ip = 'gw2geary.com';
    const [apiKeys, setApiKeys] = useState([]);

    const fetchApiKeys = (userId, accessToken) => {
        return axios.get(`http://${ip}:3001/api/auth/users/${userId}/apiKeys`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                throw new Error("Failed to retrieve API keys");
            });
    };

    useEffect(() => {
        if (currentUser) {
            fetchApiKeys(currentUser.id, currentUser.accessToken)
                .then((data) => {
                    setApiKeys(data.user.apiKeys);
                })
                .catch((error) => {
                    console.error("Error retrieving API keys:", error);
                });
        }
    }, [currentUser]);


    return (
        <>
            {/* API Keys Section */}
            <div className="container" key="profile-container">
                <div className="flex center apis-flex" key="apis-flex">
                    <div key="api-key-section">
                        <ProfileApiCreate
                            currentUser={currentUser}
                            fetchApiKeys={fetchApiKeys}
                            setApiKeys={setApiKeys}
                        />

                        {/* Apis */}
                        {apiKeys &&
                            apiKeys.map((apiKey, index) => (
                                <ProfileApiInfo
                                    key={index}
                                    apiKey={apiKey}
                                    apiKeys={apiKeys}
                                    AuthService={AuthService}
                                    setApiKeys={setApiKeys}
                                />
                            ))}
                    </div>
                </div>

                {/* Characters */}
                <ProfileApiCharacters apiKeys={apiKeys} />
            </div>
        </>
    );
}

export default ProfileApis;