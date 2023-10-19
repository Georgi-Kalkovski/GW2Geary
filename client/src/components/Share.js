import React, { useState } from "react";
import LinkSvg from './Character/link.svg'
import { Link } from "react-router-dom";

import {
    EmailShareButton,
    FacebookMessengerShareButton,
    FacebookShareButton,
    LinkedinShareButton,
    PinterestShareButton,
    RedditShareButton,
    TelegramShareButton,
    TumblrShareButton,
    TwitterShareButton,
    ViberShareButton,
    VKShareButton,
    WeiboShareButton,
    WhatsappShareButton,
} from "react-share";

import {
    EmailIcon,
    FacebookIcon,
    FacebookMessengerIcon,
    LinkedinIcon,
    PinterestIcon,
    RedditIcon,
    TelegramIcon,
    TumblrIcon,
    TwitterIcon,
    ViberIcon,
    VKIcon,
    WeiboIcon,
    WhatsappIcon
} from "react-share";

function Share({ fashion, prof }) {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [buttonColor, setButtonColor] = useState('');
    const [buttonColor2, setButtonColor2] = useState('');
    const shareUrl = window.location.href;
    const [showSavedMessage, setShowSavedMessage] = useState(false);
    const [showSavedMessage2, setShowSavedMessage2] = useState(false);

    const togglePopup = () => {
        setIsPopupOpen(!isPopupOpen);
    };

    const copyText = () => {
        if (fashion) {
            navigator?.clipboard?.writeText(shareUrl.split('prof=')[0].slice(0, -1));
        } else {
            navigator?.clipboard?.writeText(shareUrl.split('w=')[0].slice(0, -1));
        }
        setButtonColor('darkgreen');
        setShowSavedMessage(true);
        setTimeout(() => {
            setButtonColor('');
            setShowSavedMessage(false);
        }, 500);
    };

    const copyText2 = () => {
        navigator?.clipboard?.writeText(window.location.href);
        setButtonColor2('darkgreen');
        setShowSavedMessage2(true);
        setTimeout(() => {
            setButtonColor2('');
            setShowSavedMessage2(false);
        }, 500);
    };

    const preventUrlChange = (e) => {
        e.preventDefault();
    };

    return (
        <div className="flex">
            <div onClick={togglePopup}>
                <Link onClick={preventUrlChange} className='nav-a'><img className="link-svg" src={LinkSvg} alt="" /> Share</Link>
            </div>
            <div className="flex column">
                <div
                    className={prof ? `flex acc-info account-box share-div ${prof.toLowerCase()}-lightning-border transition-hover-search ${isPopupOpen ? 'open' : ''}` : `flex acc-info account-box share-div transition-hover-search ${isPopupOpen ? 'open' : ''}`}
                    style={{ flexWrap: 'wrap', width: '250px' }}
                >
                    <div className="flex" style={{ padding: '10px 0 5px 0px', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
                        <div className="padding-box">
                            <FacebookShareButton
                                url={shareUrl}
                                quote={`This is my ${prof ? 'character' : 'account'} in GW2Geary.`}
                                hashtag={'#gw2geary'}
                            >
                                <FacebookIcon size={40} />
                            </FacebookShareButton>
                        </div>
                        <div className="padding-box">
                            <FacebookMessengerShareButton
                                url={shareUrl}
                                redirectUri='https://gw2geary.com/'
                            >
                                <FacebookMessengerIcon size={40} />
                            </FacebookMessengerShareButton>
                        </div>
                        <div className="padding-box">
                            <WhatsappShareButton
                                url={shareUrl}
                                title={`This is my ${prof ? 'character' : 'account'} in GW2Geary.`}
                            >
                                <WhatsappIcon size={40} />
                            </WhatsappShareButton>
                        </div>
                        <div className="padding-box">
                            <TwitterShareButton
                                url={shareUrl}
                                title={`This is my ${prof ? 'character' : 'account'} in GW2Geary.`}
                                hashtags={['#gw2geary', '#guildwars2', '#inspect', '#gw2armory', '#equipment', '#build']}
                            >
                                <TwitterIcon size={40} />
                            </TwitterShareButton>
                        </div>
                        <div className="padding-box">
                            <RedditShareButton
                                url={shareUrl}
                                title={`This is my ${prof ? 'character' : 'account'} in GW2Geary.`}
                            >
                                <RedditIcon size={40} />
                            </RedditShareButton>
                        </div>
                        <div className="padding-box">
                            <TelegramShareButton
                                url={shareUrl}
                                title={`This is my ${prof ? 'character' : 'account'} in GW2Geary.`}
                            >
                                <TelegramIcon size={40} />
                            </TelegramShareButton>
                        </div>
                        <div className="padding-box">
                            <PinterestShareButton
                                url={shareUrl}
                                media='https://i.imgur.com/2O7otCB.png'
                                description={`This is my ${prof ? 'character' : 'account'} in GW2Geary.`}
                            >
                                <PinterestIcon size={40} />
                            </PinterestShareButton>
                        </div>
                        <div className="padding-box">
                            <LinkedinShareButton
                                url={shareUrl}
                                title={`${prof ? 'Character' : 'Account'} in GW2Geary.`}
                                summary={`This is my ${prof ? 'character' : 'account'}. If you want to see more information, like equipments or builds, please visit the link.\n`}
                                source='https://gw2geary.com/'
                            >
                                <LinkedinIcon size={40} />
                            </LinkedinShareButton>
                        </div>
                        <div className="padding-box">
                            <ViberShareButton
                                url={shareUrl}
                                title={`This is my ${prof ? 'character' : 'account'} in GW2Geary.`}
                            >
                                <ViberIcon size={40} />
                            </ViberShareButton>
                        </div>
                        <div className="padding-box">
                            <VKShareButton
                                url={shareUrl}
                                title={`This is my ${prof ? 'character' : 'account'} in GW2Geary.`}
                                image='https://i.imgur.com/2O7otCB.png'
                            >
                                <VKIcon size={40} />
                            </VKShareButton>
                        </div>
                        <div className="padding-box">
                            <TumblrShareButton
                                url={shareUrl}
                                title={`This is my ${prof ? 'character' : 'account'} in GW2Geary.`}
                                caption={`This is my ${prof ? 'character' : 'account'}. If you want to see more information, like equipments or builds, please visit the link.\n`}
                                posttype='https://gw2geary.com/'
                            >
                                <TumblrIcon size={40} />
                            </TumblrShareButton>
                        </div>
                        <div className="padding-box">
                            <WeiboShareButton
                                url={shareUrl}
                                title={`This is my ${prof ? 'character' : 'account'} in GW2Geary.`}
                                image='https://i.imgur.com/2O7otCB.png'
                            >
                                <WeiboIcon size={40} />
                            </WeiboShareButton>
                        </div>
                        <div className="padding-box">
                            <EmailShareButton url={shareUrl}
                                subject={`This is my ${prof ? 'character' : 'account'} in GW2Geary.`}
                                body={`This is my ${prof ? 'character' : 'account'}. If you want to see more information, like equipments or builds, please visit the link.\n`}
                            >
                                <EmailIcon size={40} />
                            </EmailShareButton>
                        </div>
                        <div>
                            <button
                                title="This is my GW2 account." style={{ backgroundColor: buttonColor, transition: 'background-color 0.3s ease-out' }}
                                hashtag="#gw2geary, #guildwars2"
                                className="share-copy basic-button"
                                onClick={copyText}
                            >
                                {showSavedMessage ? 'Saved!' : 'Short Link'}
                            </button>
                            <button
                                title="This is my GW2 account." style={{ backgroundColor: buttonColor2, transition: 'background-color 0.3s ease-out' }}
                                hashtag="#gw2geary, #guildwars2"
                                className="basic-button share-copy"
                                onClick={copyText2}
                            >
                                {showSavedMessage2 ? 'Saved!' : 'Long Link'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Share;