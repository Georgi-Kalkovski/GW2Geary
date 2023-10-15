import React from 'react';

function NewsList({ isSearchNews, limit }) {
    const newsData = [
        {
            date: '15.10.2023',
            content: (
                <span>
                    Worked on the sharing system. Now the shared links will carry additional information with them.
                </span>
            ),
        },
        {
            date: '02.10.2023',
            content: (
                <span>
                    Added <span className="yellow-highlight"> Relic </span> and
                    <span className="yellow-highlight"> Power Core </span> to the character's preview.
                </span>
            ),
        },
        {
            date: '28.09.2023',
            content: (
                <span>
                    <span style={{ color: '#aa0404' }}> Removed invalid old API keys</span>.
                    If anyone is affected please register a new API key.
                </span>
            ),
        },
        {
            date: '26.09.2023',
            content: (
                <span>
                    Added a <span className="yellow-highlight"> button </span>
                    on the right of the <span className="yellow-highlight"> search bar </span>
                    allowing the users to search by
                    <span className="yellow-highlight"> gender</span>,
                    <span className="yellow-highlight"> race</span> and
                    <span className="yellow-highlight"> profession</span>.
                </span>
            ),
        },
        {
            date: '30.08.2023',
            content: (
                <span>
                    Added a button/s allowing the users to
                    <span className="yellow-highlight"> copy</span> the
                    <span className="yellow-highlight"> chat codes</span> of the
                    <span className="yellow-highlight"> items </span>
                    or their <span className="yellow-highlight">skins</span>.
                </span>
            ),
        },
        {
            date: '28.08.2023',
            content: (
                <span>
                    Now the <span className="yellow-highlight"> fashion mode </span> can preview <span className="yellow-highlight"> wiki images</span>.
                </span>
            ),
        },
        {
            date: '18.08.2023',
            content: (
                <span>
                    Now the user can choose between fashion mode or normal mode preview on the characters.
                    Happy Fashion Wars everybody! <span style={{ color: '#9fc3f0' }}>o/</span>
                </span>
            ),
        },
        {
            date: '04.08.2023',
            content: (
                <span>
                    Added information about the <span style={{ color: '#ff1e1e' }}>missing prefixes</span>,
                    <span style={{ color: '#ff1e1e' }}> runes</span>,
                    <span style={{ color: '#ff1e1e' }}> sigils</span> and
                    <span style={{ color: '#ff1e1e' }}> infusions </span>
                    to the <span className="yellow-highlight"> Stats </span> menu.
                </span>
            ),
        },
        {
            date: '31.07.2023',
            content: (
                <span>
                    Now the user can preview the dyes of an item.
                </span>
            ),
        },
        {
            date: '24.07.2023',
            content: (
                <span>
                    Now the user can have direct link to
                    <span className="yellow-highlight"> GW2 Wiki </span>
                    by clicking on the character's
                    <span className="yellow-highlight"> item</span>
                    , <span className="yellow-highlight">skill </span>
                    or <span className="yellow-highlight">trait</span>.
                </span>
            ),
        },
        {
            date: '19.07.2023',
            content: (
                <span>
                    Added a switch to <span className="off-text">hide</span>/<span className="yellow-highlight">show </span>
                    character's <span className="yellow-highlight">prefixes</span>, <span className="yellow-highlight">runes</span>
                    , <span className="yellow-highlight">sigils </span>
                    and <span className="yellow-highlight">infusions</span>.
                </span>
            ),
        },
        {
            date: '13.07.2023',
            content: (
                <span>
                    Added an option to copy specific <span className="yellow-highlight">equipment </span>
                    & <span className="yellow-highlight">build</span>.
                </span>
            ),
        },
        {
            date: '11.07.2023',
            content: (
                <span>
                    Added an option to make a character
                    <span style={{ color: 'darkgreen' }}> Public </span>
                    /<span style={{ color: '#aa0404' }}> Private</span>.
                </span>
            ),
        },
        {
            date: '28.06.2023',
            content: (
                <span>
                    The Guild Wars 2 Armory is here!
                    <span className="gw2-logo-style" style={{ fontSize: '20px' }}> GW2</span>
                    <span className="geary-logo-style" style={{ fontSize: '20px' }}>GEARY</span> IS LIVE!!!
                </span>
            ),
        },
    ];

    const truncatedNewsData = limit ? newsData.slice(0, limit) : newsData;
    return (
        <div>
            {truncatedNewsData.map((newsItem) => (
                <div key={newsItem.date} className='news-item'>
                    {isSearchNews ? (
                        <div>
                            <span className='yellow-highlight' style={{ marginBlockEnd: 'em', marginBlockStart: '0em' }}>
                                {newsItem.date}
                            </span>{' '}
                            - {newsItem.content}
                        </div>
                    ) : (
                        <div>
                            <h3>{newsItem.date}</h3>
                            <div className='line'></div>
                            <div>{newsItem.content}</div>
                            <br />
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default NewsList;