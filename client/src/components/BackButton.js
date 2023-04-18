import React from 'react';
import { Link } from 'react-router-dom';

function BackButton() {
    return (
        <Link to="/" className="go-back-button">Go back</Link>
    );
}

export default BackButton;
