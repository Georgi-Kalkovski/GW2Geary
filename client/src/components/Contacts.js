import React, { useState } from 'react';
import { Helmet } from "react-helmet";
import AuthService from '../services/auth.service';

function Contacts() {
    const ip = 'https://gw2geary.com/api';
    const user = AuthService.getCurrentUser();
    const [email, setEmail] = useState(user?.email || '');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [submissionMessage, setSubmissionMessage] = useState('');

    const isButtonDisabled = subject === '' || message === '' || email === '';

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleSubjectChange = (event) => {
        setSubject(event.target.value);
    };

    const handleMessageChange = (event) => {
        setMessage(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (subject && message && email) {
            try {
                const response = await fetch(`${ip}/contacts`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: email,
                        subject: subject,
                        message: message,
                    }),
                });

                if (response.ok) {
                    setSubmissionMessage('Success! Email sent successfully.');
                    // Reset the form fields
                    setSubject('');
                    setMessage('');
                    setEmail('');
                } else {
                    setSubmissionMessage('Error sending email: ' + response.statusText);
                }
            } catch (error) {
                setSubmissionMessage('Error sending email: ' + error.message);
            }
        }
    };

    return (
        <div>
            <Helmet>
                <title>GW2Geary - Contacts</title>
                <meta
                    name="description"
                    content="This is where you can contact us. Write us a message if you have a questin, an idea or just want to chat."
                />
                <meta property="og:title" content="GW2Geary - Contacts" />
                <meta
                    name="og:description"
                    content="This is where you can contact us. Write us a message if you have a questin, an idea or just want to chat."
                />
            </Helmet>
            <div className="flex center">
                <div>
                    <h2 style={{ textAlign: 'center' }}>Send a message</h2>
                    <h5 style={{ textAlign: 'center', marginTop: '-20px', marginBottom: '-5px' }}>or contact me in-game (<span className='yellow-highlight'>Terter.4125</span>)</h5>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                value={email}
                                onChange={handleEmailChange}
                                name='email'
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="subject">Subject:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="subject"
                                value={subject}
                                onChange={handleSubjectChange}
                                name='subject'
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">Message:</label>
                            <textarea
                                className="form-control"
                                id="message"
                                value={message}
                                onChange={handleMessageChange}
                                style={{ minWidth: '193px', height: '100px', fontSize: '15px' }}
                            />
                        </div>
                        <div className="form-group flex center">
                            <button
                                type="submit"
                                className="basic-button form-button"
                                disabled={isButtonDisabled}
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                    {submissionMessage && <p>{submissionMessage}</p>}
                </div>
            </div>
        </div>
    );
}

export default Contacts;
