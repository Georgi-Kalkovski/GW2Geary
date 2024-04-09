import React, { useState, useCallback } from "react";
import { usePopperTooltip } from 'react-popper-tooltip';
import ProfileApiCharacters from './ProfileApiCharacters';
import upArrow from '../up-arrow.svg';
import downArrow from '../down-arrow.svg';
import CopyBuild from '../copy.png';
import ApplyBuild from '../apply.png';

function ProfileApiInfo({ apiKey, apiKeys, AuthService, setApiKeys, expandedApiKey, handleExpandApiKey }) {
    const [isVisible, setIsVisible] = useState(null);
    const [deleteButtonState, setDeleteButtonState] = useState("Delete");

    const isExpanded = () => expandedApiKey === apiKey?._id;

    const toggleExpansion = () => {
        if (isExpanded()) {
            handleExpandApiKey(null);
        } else {
            handleExpandApiKey(apiKey?._id);
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

    const [copiedMap, setCopiedMap] = useState({});

    const handleButtonClick = (apiKey) => {
        if (copiedMap[apiKey._id]) {
            applyBuild(apiKey._id);
        } else {
            copyApiKey(apiKey._id);
        }
    };
    
    const copyApiKey = (storedId) => {
        navigator.clipboard.writeText(storedId)
            .then(() => {
                setCopiedMap((prevState) => ({
                    ...prevState,
                    [storedId]: true,
                }));
                setTimeout(() => {
                    setCopiedMap((prevState) => ({
                        ...prevState,
                        [storedId]: false,
                    }));
                }, 800);
            })
            .catch((error) => {
                console.error('Error copying API key:', error);
            });
    };

    const deleteApiKey = useCallback((apiKeyId) => {
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
                        style={{ alignItems: 'center', marginRight: '5px' }}
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
                            className="tgl tgl-skewed api-checkbox"
                            id={"cb3" + apiKey._id}
                            type="checkbox"
                            defaultChecked={apiKey.active}
                            onChange={(e) => updateApiKeyStatus(apiKey._id, e.target.checked)}
                            key={`api-key-checkbox-${apiKey._id}`}
                            name={`checkbox-${apiKey._id}`}

                        />
                        <span className={`tgl-btn checkmark`} data-tg-off="OFF" data-tg-on="ON" ref={setTriggerRef}></span>
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

                    {/* Api Key Visual */}
                    <div className="api-key-profile api-keys">{apiKey._id}{" "}</div>

                    {/* Copy Api Key */}
                    <button
                        type='button'
                        title={copiedMap[apiKey._id] ? 'Apply Api Key' : 'Copy Api Key'}
                        className='game-button'
                        style={{ background: 'none' }}
                        onClick={() => handleButtonClick(apiKey)}
                    >
                        <img
                            src={copiedMap[apiKey._id] ? ApplyBuild : CopyBuild}
                            alt={copiedMap[apiKey._id] ? 'ApplyBuild' : 'StoreBuild'}
                        />
                    </button>

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
