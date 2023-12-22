import React from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowBack from './arrow-back.png';

const BackButton = () => {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };

    return (
        <button
            onClick={goBack}
            style={{
                position: 'absolute',
                left: '15px',
                top: '-10px',
                width: '40px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '0',
            }}
        >
            <img
                className='game-button'
                style={{ width: '40px' }}
                src={ArrowBack}
                title='Back'
                alt="Back"
            />
            <div
                className='nav-a'
                style={{ marginTop: '-5px', marginLeft: '6px' }}
            >
                Back
            </div>
        </button>
    );
};

export default BackButton;