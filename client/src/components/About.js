import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import github from './img/github.svg';
import discord from './img/discord.svg';
import linkedin from './img/linkedin.svg';

function About() {
    const [maxHeight, setMaxHeight] = useState(0);

    useEffect(() => {
        if (window.innerWidth >= 900) {
            setMaxHeight(Math.max(document.documentElement.clientHeight, window.innerHeight || 0) * 0.7);
        } else {
            setMaxHeight(Math.max(document.documentElement.clientHeight, window.innerHeight || 0) * 0.68);
        }
    }, []);

    return (
        <div>
            <Helmet>
                <title>GW2Geary - About</title>
            </Helmet>
            <div className='flex center column'>
                <h2 style={{ textAlign: 'center' }}>About</h2>
                <div className='about-box news-box custom-scrollbar' style={{ textAlign: 'left', justifyContent: 'right', marginBottom: '20px', maxHeight: `${maxHeight}px`, overflow: 'auto' }}>
                    <h2><span className='yellow-highlight'>Description</span></h2>
                    <div className="line"></div>
                    <p>
                        Welcome to GW2Geary, a dedicated GW2 armory. Your ultimate tool to explore and inspect Guild Wars 2 accounts and characters.
                        With GW2Geary, you can dive deep into the details of your favorite players equipment, builds, traits, and skills.
                        Want to show your gear(armour & weapons) to others? Use GW2Geary!
                    </p>
                    <h2><span className='yellow-highlight'>Privacy Notice</span></h2>
                    <div className="line"></div>
                    <p>At GW2Geary, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Notice explains how we collect, use, disclose, and protect the information you provide to us when using our website. By accessing and using our website, you acknowledge that you have read and understood this Privacy Notice.</p>
                    <h4><span className='yellow-highlight'>Information We Collect</span></h4>
                    <div>When you register and use GW2Geary, we may collect the following information:</div>
                    <ul>
                        <li><span className='yellow-highlight'>Username</span>: The name you choose to identify yourself on our website.</li>
                        <li><span className='yellow-highlight'>Password</span>: Rest assured, your password is securely encrypted and stored in our database.</li>
                        <li><span className='yellow-highlight'>Email</span>: If you provide it, we may collect your email address for communication purposes such as sendiong you a message for password reset.</li>
                        <li><span className='yellow-highlight'>API Keys</span>: If you share your API keys with us, we can access account information such as character equipment, builds, traits, and skills.
                            <div style={{ fontSize: '15px' }}>-<span className='yellow-highlight'> Required permissions</span>
                                : <span style={{ borderBottom: '1px dotted' }}>account</span>
                                , <span style={{ borderBottom: '1px dotted' }}>characters</span>
                                , <span style={{ borderBottom: '1px dotted' }}>builds</span>
                                , <span style={{ borderBottom: '1px dotted' }}>progression</span>
                            </div>
                        </li>
                    </ul>
                    <h4><span className='yellow-highlight'>How We Use Your Information</span></h4>
                    <div>We use the collected information for the following purposes:</div>
                    <ul>
                        <li><span className='yellow-highlight'>Account & Character Inspection</span>: You can search and inspect accounts and characters using our website's features.</li>
                        <li><span className='yellow-highlight'>Communication</span>: We may reach out to you regarding your account, important updates, and notifications.</li>
                        <li><span className='yellow-highlight'>Personalization</span>: We want to provide you with the best user experience, so we may personalize content and offer recommendations.</li>
                        <li><span className='yellow-highlight'>Statistical Analysis</span>: We analyze aggregated and anonymized data to improve our services, including utilizing Google Analytics.</li>
                    </ul>
                    <h4><span className='yellow-highlight'>Sharing Your Information</span></h4>
                    <div>We respect your privacy and do not sell, trade, or transfer your personal information to third parties without your explicit consent. However, there are a few exceptions:</div>
                    <ul>
                        <li><span className='yellow-highlight'>Service Providers</span>: We may engage trusted third-party service providers to help us operate GW2Geary and deliver our services. These providers are obligated to keep your information secure and confidential.</li>
                        <li><span className='yellow-highlight'>Legal Requirements</span>: If required by law or in response to a valid legal request, we may disclose your information.</li>
                    </ul>
                    <h4><span className='yellow-highlight'>Data Retention and Deletion</span></h4>
                    <div>We retain your personal information only as long as necessary for the purposes stated in this Privacy Notice or as required by law. If you decide to delete your account and associated data, including API keys, you have the right to do so.</div>
                    <h4><span className='yellow-highlight'>Your Security Matters</span></h4>
                    <div>We take your data security seriously. We have implemented appropriate measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, please note that no online method is entirely foolproof.</div>
                    <h4><span className='yellow-highlight'>Cookies and Tracking Technologies</span></h4>
                    <div>To enhance your experience on GW2Geary, we may use cookies and other tracking technologies. These tools help us understand your browsing patterns, analyze trends, administer the website, and gather demographic information.</div>
                    <h4><span className='yellow-highlight'>Links to Third-Party Websites</span></h4>
                    <div>GW2Geary may contain links to third-party websites. Please be aware that we are not responsible for their privacy practices or content. Before providing any personal information, we encourage you to review the privacy policies of those websites.</div>
                    {/* 
                <h4><span className='yellow-highlight'>Children's Privacy</span></h4>
                <div>GW2Geary is intended for users aged 16 and above. We do not knowingly collect personal information from children. If you believe we have inadvertently collected such information, please contact us immediately.</div>
                */}
                    <h4><span className='yellow-highlight'>Changes to this Privacy Notice</span></h4>
                    <div>We may update or modify this Privacy Notice as needed. Any changes will be effective upon posting the revised Privacy Notice on GW2Geary. We recommend checking this Privacy Notice periodically for updates.</div>
                    <p>If you have any questions, concerns, or requests about this Privacy Notice or the processing of your personal information, please reach out to us through the provided channels on GW2Geary.</p>
                    <div>Last Updated: <span className='yellow-highlight'>28.06.2023</span></div>

                    {/* Acknowledgements */}
                    <h2><span className='yellow-highlight'>Acknowledgements</span></h2>
                    <div className="line"></div>
                    © ArenaNet LLC. All rights reserved.
                    NCSOFT, ArenaNet, Guild Wars, Guild Wars 2: Heart of Thorns, Guild Wars 2: Path of Fire, and Guild Wars 2: End of Dragons
                    and all associated logos, designs, and composite marks are trademarks or registered trademarks of NCSOFT Corporation.
                    All other trademarks are the property of their respective owners.
                    <span><br /></span>
                    {/* Design and coding */}
                    <h2>Design and coding by <span className='yellow-highlight'>Terter.4125</span></h2>
                    <div className="line"></div>
                    <div className='flex'>
                        <a className="contact-svg" href='https://discord.com/users/242250226545590274'><img src={discord} /></a>
                        <a className="contact-svg" href='https://www.linkedin.com/in/georgi-kalkovski/'><img src={linkedin} /></a>
                        <a className="contact-svg" href='https://github.com/Georgi-Kalkovski'><img src={github} /></a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;