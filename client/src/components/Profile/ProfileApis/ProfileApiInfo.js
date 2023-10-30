import React, { useState, useCallback } from "react";
import { usePopperTooltip } from 'react-popper-tooltip';
import ProfileApiCharacters from './ProfileApiCharacters';
import upArrow from '../up-arrow.svg';
import downArrow from '../down-arrow.svg';

function ProfileApiInfo({ apiKey, apiKeys, AuthService, setApiKeys }) {
    const [expandedIndexes, setExpandedIndexes] = useState([]);
    const [isVisible, setIsVisible] = useState(null);
    const [deleteButtonState, setDeleteButtonState] = useState("Delete"); // Add state for the button text

    const isExpanded = (apiKey) => expandedIndexes.includes(apiKey?._id);

    const toggleExpansion = (apiKey) => {
        if (isExpanded(apiKey?._id)) {
            setExpandedIndexes(expandedIndexes.filter((i) => i !== apiKey?._id));
        } else {
            setExpandedIndexes([...expandedIndexes, apiKey?._id]);
        }
    };

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
        // Change the button text and handle delete logic
        if (deleteButtonState === "Delete") {
            setDeleteButtonState("Confirm");
        } else {
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
        }
    }, [setApiKeys, AuthService, apiKeys, deleteButtonState]);

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
                <div className="facts-div-profile api-right" key={`api-key-details-${apiKey._id}`}>
                    <div
                        className="profile-apis-first-child flex center font-size-20px yellow-highlight"
                        style={{ alignItems: 'center', marginRight: '5px'  }}
                        key={`account-name-${apiKey?._id}`}
                    >
                        {apiKey && (
                            <div className="arrow-line" onClick={() => toggleExpansion(apiKey?._id)} key={`character-arrow-line-${apiKey?._id}`}>
                                <div className="flex center">
                                    <div className='profile-names'>
                                        {apiKey.accountName}
                                    </div>
                                    {isExpanded(apiKey?._id) ? <img src={upArrow} className="up-down-arrow" alt="up-arrow" /> : <img src={downArrow} className="up-down-arrow" alt="down-arrow" />}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Checkbox */}
                    <label className="custom-checkbox" ref={setTriggerRef}>
                        <input
                            class="tgl tgl-skewed api-checkbox"
                            id="cb3"
                            type="checkbox"
                            defaultChecked={apiKey.active}
                            onChange={(e) => updateApiKeyStatus(apiKey._id, e.target.checked)}
                            key={`api-key-checkbox-${apiKey._id}`}
                            name={`checkbox-${apiKey._id}`}

                        />
                        <span class={`tgl-btn checkmark`} data-tg-off="OFF" data-tg-on="ON" ref={setTriggerRef}></span>
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
                    <button onClick={() => deleteApiKey(apiKey._id)} className="basic-button delete-button" key={`api-key-delete-button-${apiKey._id}`}>
                        {deleteButtonState}
                    </button>
                </div>
            </div>

            <ProfileApiCharacters
                apiKey={apiKey}
                AuthService={AuthService}
                setApiKeys={setApiKeys}
                show={isExpanded(apiKey?._id)}
            />
        </div>
    );
}

export default ProfileApiInfo;
