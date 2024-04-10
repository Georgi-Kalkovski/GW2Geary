import React, { useState, useEffect } from "react";
import ProfileApiCharacters from "./ProfileApis/ProfileApiCharacters";
import ProfileApiInfo from "./ProfileApis/ProfileApiInfo";
import ProfileApiCreate from "./ProfileApis/ProfileApiCreate";
import EventBus from "../../common/EventBus";
import { useNavigate } from "react-router-dom";

function ProfileApis({ AuthService }) {
    const [apiKeys, setApiKeys] = useState([]);
    const [maxHeight, setMaxHeight] = useState(0);
    const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());
    const [loading, setLoading] = useState(true);
    const [expandedApiKey, setExpandedApiKey] = useState(null);
    const [closing, setClosing] = useState(null);
    let navigate = useNavigate();

    const getApiKeys = () => {
        return AuthService.getApiKeys()
            .then((response) => {
                return response.data.user.apiKeys;
            })
            .catch((error) => {
                if (error.message === "Request failed with status code 401") {
                    EventBus.emit("logout");
                    navigate('/');
                } else {
                    throw new Error("Failed to retrieve API keys");
                }
            });
    };

    useEffect(() => {
        if (currentUser) {
            getApiKeys()
                .then((data) => {
                    setApiKeys(data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Error retrieving API keys:", error);
                    setLoading(false);
                });
        }
    }, [currentUser]);

    useEffect(() => {
        if (window.innerWidth >= 900) {
            setMaxHeight(Math.max(document.documentElement.clientHeight, window.innerHeight || 0) * 0.6);
        } else {
            setMaxHeight(Math.max(document.documentElement.clientHeight, window.innerHeight || 0) * 0.55);
        }
    }, []);

    useEffect(() => {
        if (apiKeys.length > 0 && expandedApiKey === null && !closing) {
            setExpandedApiKey(apiKeys[0]._id);
            setClosing(true);
        }
    }, [apiKeys, expandedApiKey, closing]);

    const handleExpandApiKey = (apiKeyId) => {
        setExpandedApiKey(apiKeyId);
    };

    return (
        <>
            {/* API Keys Section */}
            <div className="container" key="profile-container" style={{ marginTop: '20px' }}>
                <div className="flex center apis-flex" key="apis-flex">
                    <div className="flex column">
                        {/* Apis */}
                        {loading ? (
                            <div>
                                {/* Loading... */}
                                </div>
                        ) : apiKeys.length > 0 ? (
                            <div className='profile-box custom-scrollbar' style={{ textAlign: 'left', justifyContent: 'right', maxWidth: '790px', maxHeight: `${maxHeight}px`, overflow: 'auto' }}>
                                {apiKeys.map((apiKey) => (
                                    <ProfileApiInfo
                                        key={apiKey._id}
                                        apiKey={apiKey}
                                        apiKeys={apiKeys}
                                        AuthService={AuthService}
                                        setApiKeys={setApiKeys}
                                        expandedApiKey={expandedApiKey}
                                        handleExpandApiKey={handleExpandApiKey}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                                <div>No API Keys are stored.</div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Characters */}
                <ProfileApiCharacters apiKeys={apiKeys} />
            </div>
        </>
    );
}

export default ProfileApis;
