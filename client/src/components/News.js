import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import NewsList from './NewsList';

function News() {
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
                <title>GW2Geary - News</title>
            </Helmet>
            <div className='flex center column'>
                <h2 style={{ textAlign: 'center' }}>News</h2>
                <div className='about-box news-box custom-scrollbar' style={{ textAlign: 'left', justifyContent: 'right', marginBottom: '20px', maxHeight: `${maxHeight}px`, overflow: 'auto' }}>
                    <NewsList />
                </div>
            </div>
        </div>

    );
}

export default News;