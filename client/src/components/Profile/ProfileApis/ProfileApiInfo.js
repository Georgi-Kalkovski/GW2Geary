import React from 'react';
import { useState, useCallback } from "react";
import { usePopperTooltip } from 'react-popper-tooltip';
import ProfileApiCharacters from './ProfileApiCharacters';

function ProfileApiInfo({ apiKey, apiKeys, AuthService, setApiKeys }) {
    const [isVisible, setIsVisible] = useState(null)

    const updateApiKeyStatus = useCallback((apiKeyId, active) => {
        AuthService.updateApiKeyStatus(apiKeyId, active)
            .then((response) => {
                if (response.user && response.user.apiKeys) {
                    setApiKeys(response.user.apiKeys);
                }
            })
            .catch((error) => {
                console.error("Error updating API key status:", error);
            });
    }, [setApiKeys, AuthService]);

    const deleteApiKey = useCallback((apiKeyId) => {
        AuthService.deleteApiKey(apiKeyId)
            .then((response) => {
                if (response.user && response.user.apiKeys) {
                    setApiKeys(response.user.apiKeys);
                }
            })
            .then(() => {
                setApiKeys(apiKeys.filter((apiKey) => apiKey._id !== apiKeyId));
            })
            .catch((error) => {
                console.error("Error deleting API key:", error);
            });
    }, [setApiKeys, AuthService]);

    const {
        getArrowProps,
        getTooltipProps,
        setTooltipRef,
        setTriggerRef,
        visible,
    } = usePopperTooltip({
        placement: 'top',
        visible: isVisible,
        onVisibleChange: setIsVisible
    });

    return (
        <div>
            <div key={apiKey._id}>
                <div className="facts-div-profile api-key-fact api-right" key={`api-key-details-${apiKey._id}`}>
                    <div className="flex center font-size-20px yellow-highlight" key={`account-name-${apiKey?._id}`}>
                        {apiKey.accountName}
                    </div>
                    {/* Checkbox */}
                    <label className="custom-checkbox"
                        ref={setTriggerRef}>
                        <input
                            type="checkbox"
                            className="api-checkbox "
                            defaultChecked={apiKey.active}
                            onChange={(e) => updateApiKeyStatus(apiKey._id, e.target.checked)}
                            key={`api-key-checkbox-${apiKey._id}`}
                        />
                        <span className="checkmark"></span>
                    </label>
                    {visible && (
                        <div
                            ref={setTooltipRef}
                            {...getTooltipProps({ className: 'tooltip-container attribute-popup' })}
                        >
                            <div style={{ fontSize: '14px' }}>
                                Make accounts & characters
                                <span style={{ color: 'darkgreen' }}> Public </span>
                                /<span style={{ color: '#aa0404' }}> Private </span>

                            </div>
                            <div {...getArrowProps({ className: 'tooltip-arrow' })} />
                        </div>
                    )}

                    <div className="api-key-profile api-keys">{apiKey._id}{" "}</div>
                    {/* Delete Key */}
                    <button onClick={() => deleteApiKey(apiKey._id)} className="basic-button" key={`api-key-delete-button-${apiKey._id}`}>
                        Delete Key
                    </button>
                </div>
            </div>

            <ProfileApiCharacters
                apiKey={apiKey}
                AuthService={AuthService}
                setApiKeys={setApiKeys}
            />
            <br/>
            <br/>
        </div>
    );
}

export default ProfileApiInfo