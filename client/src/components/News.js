import React from 'react';
import { Helmet } from 'react-helmet';
import NewsList from './NewsList';

function News() {
    return (
        <div>
            <Helmet>
                <title>GW2Geary - News</title>
            </Helmet>
            <div className='flex center column'>
                <h2 style={{ textAlign: 'center' }}>News</h2>
                <div className='about-box news-box' style={{ textAlign: 'left', alignItems: 'right', marginBottom: '20px' }}>
                    <NewsList />
                </div>
            </div>
        </div>

    );
}

export default News;