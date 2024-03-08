import React, { useState, useEffect } from "react";
import ProfileApiCharacters from "./ProfileApis/ProfileApiCharacters";
import ProfileApiInfo from "./ProfileApis/ProfileApiInfo";
import ProfileApiCreate from "./ProfileApis/ProfileApiCreate";

function ProfileApis({ AuthService }) {
    const [apiKeys, setApiKeys] = useState([]);
    const [maxHeight, setMaxHeight] = useState(0);
    const currentUser = AuthService.getCurrentUser();

    const getApiKeys = () => {
        return AuthService.getApiKeys()
            .then((response) => {
                return response.data.user.apiKeys;
            })
            .catch((error) => {
                throw new Error("Failed to retrieve API keys");
            });
    };
    useEffect(() => {
        if (currentUser) {
            getApiKeys()
                .then((data) => {
                    setApiKeys(data);
                })
                .catch((error) => {
                    console.error("Error retrieving API keys:", error);
                });
        }
    }, []);

    useEffect(() => {
        if (window.innerWidth >= 900) {
            setMaxHeight(Math.max(document.documentElement.clientHeight, window.innerHeight || 0) * 0.6);
        } else {
            setMaxHeight(Math.max(document.documentElement.clientHeight, window.innerHeight || 0) * 0.55);
        }
    }, []);

    return (
        <>
            {/* API Keys Section */}
            <div className="container" key="profile-container" style={{ marginTop: '20px' }}>
                <div className="flex center apis-flex" key="apis-flex">
                    <div className="flex column">
                        <ProfileApiCreate
                            currentUser={currentUser}
                            fetchApiKeys={getApiKeys}
                            setApiKeys={setApiKeys}
                        />

                        {/* Apis */}
                        {apiKeys.length > 0 ?
                            <div className='profile-box custom-scrollbar' style={{ textAlign: 'left', justifyContent: 'right', maxWidth: '790px', maxHeight: `${maxHeight}px`, overflow: 'auto' }}>
                                {apiKeys.map((apiKey) => (
                                    <ProfileApiInfo
                                        key={apiKey._id}
                                        apiKey={apiKey}
                                        apiKeys={apiKeys}
                                        AuthService={AuthService}
                                        setApiKeys={setApiKeys}
                                    />
                                ))}
                            </div>
                            : <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                                <div>No API Keys Stored</div>
                                <div>If you've registered an API key but you don't see it, please relog your user.</div>
                            </div>
                        }
                    </div>
                </div>

                {/* Characters */}
                <ProfileApiCharacters apiKeys={apiKeys} />
            </div>
        </>
    );
}

export default ProfileApis;
