import React, { useState, useEffect } from "react";
import axios from "axios";
import ProfileApiCharacters from "./ProfileApis/ProfileApiCharacters";
import ProfileApiInfo from "./ProfileApis/ProfileApiInfo";
import ProfileApiCreate from "./ProfileApis/ProfileApiCreate";
function ProfileApis({ currentUser, AuthService }) {
    const ip = 'https://gw2geary.com/api';
    const [apiKeys, setApiKeys] = useState([]);

    const fetchApiKeys = (userId, accessToken) => {
        return axios.get(`${ip}/auth/users/${userId}/apiKeys`, {
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

    const [maxHeight, setMaxHeight] = useState(0);

    useEffect(() => {
        if (window.innerWidth >= 550) {
            setMaxHeight(Math.max(document.documentElement.clientHeight, window.innerHeight || 0) * 0.6);
        } else {
            setMaxHeight(Math.max(document.documentElement.clientHeight, window.innerHeight || 0) * 0.5);
        }
    }, []);

    return (
        <>
            {/* API Keys Section */}
            <div className="container" key="profile-container" style={{ marginTop: '20px'}}>
            <div className="flex center apis-flex" key="apis-flex">
                <div className="flex column" >
                    <ProfileApiCreate
                        currentUser={currentUser}
                        fetchApiKeys={fetchApiKeys}
                        setApiKeys={setApiKeys}
                    />

                    {/* Apis */}
                    <div className='profile-box custom-scrollbar' style={{ textAlign: 'left', justifyContent: 'right', maxWidth:'790px', maxHeight: `${maxHeight}px`, overflow: 'auto' }}>
                        {apiKeys &&
                            apiKeys.map((apiKey) => (
                                <ProfileApiInfo
                                    key={apiKey._id}
                                    apiKey={apiKey}
                                    apiKeys={apiKeys}
                                    AuthService={AuthService}
                                    setApiKeys={setApiKeys}
                                />
                            ))
                        }
                    </div>
                </div>
            </div>

            {/* Characters */}
            <ProfileApiCharacters apiKeys={apiKeys} />
        </div >
        </>
    );
}

export default ProfileApis;