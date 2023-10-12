import React from 'react';
import { Helmet } from 'react-helmet';
import NewsList from './NewsList';

function News() {
    return (
        <div>
            <Helmet>
                <title>GW2Geary - News</title>
                <meta
                    name="description"
                    content="All the News about GW2Geary are here! 
                             Latest news: Added Relic and Power Core to the character's preview."
                />
                <meta property="og:title" content="GW2Geary - News" />
                <meta
                    name="og:description"
                    content="All the News about GW2Geary are here! 
                             Latest news: Added Relic and Power Core to the character's preview."
                />
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