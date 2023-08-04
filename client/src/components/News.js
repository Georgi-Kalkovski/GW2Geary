function News() {
    return (
        <div className='flex center column'>
            <h2 style={{ textAlign: 'center' }}>News</h2>

            <div>
                <div className='about-box news-box' style={{ textAlign: 'left', alignItems: 'right' }}>
                    <h3>04.08.2023</h3>
                    <div className="line"></div>
                    <div >
                        Added information about the <span style={{ color: '#ff1e1e' }}>missing prefixes</span>,
                        <span style={{ color: '#ff1e1e' }}> runes</span>,
                        <span style={{ color: '#ff1e1e' }}> sigils</span> and
                         <span style={{ color: '#ff1e1e' }}> infusions </span>
                         to the <span className="yellow-highlight"> Stats </span> menu.
                    </div>
                </div>

                <br />
                <div className='about-box news-box' style={{ textAlign: 'left', alignItems: 'right' }}>
                    <h3>31.07.2023</h3>
                    <div className="line"></div>
                    <div >
                        Now the user can preview the dyes of an item.
                    </div>
                </div>

                <br />
                <div className='about-box news-box' style={{ textAlign: 'left', alignItems: 'right' }}>
                    <h3>24.07.2023</h3>
                    <div className="line"></div>
                    <div >
                        Now the user can have direct link to
                        <span className="yellow-highlight"> GW2 Wiki </span>
                        by clicking on the character's
                        <span className="yellow-highlight"> item</span>
                        , <span className="yellow-highlight">skill </span>
                        or <span className="yellow-highlight">trait</span>.
                    </div>
                </div>

                <br />
                <div className='about-box news-box' style={{ textAlign: 'left', alignItems: 'right' }}>
                    <h3>19.07.2023</h3>
                    <div className="line"></div>
                    <div >Added a switch to <span className="off-text">hide</span>/<span className="yellow-highlight">show </span>
                        character's <span className="yellow-highlight">prefixes</span>, <span className="yellow-highlight">runes</span>
                        , <span className="yellow-highlight">sigils </span>
                        and <span className="yellow-highlight">infusions</span>.</div>
                </div>

                <br />
                <div className='about-box news-box' style={{ textAlign: 'left', alignItems: 'right' }}>
                    <h3>13.07.2023</h3>
                    <div className="line"></div>
                    <div >Added an option to copy specific <span className="yellow-highlight">equipment </span>
                        & <span className="yellow-highlight">build</span>.</div>
                </div>

                <br />
                <div className='about-box news-box' style={{ textAlign: 'left', alignItems: 'right' }}>
                    <h3>11.07.2023</h3>
                    <div className="line"></div>
                    <div >Added an option to make a character
                        <span style={{ color: 'darkgreen' }}> Public </span>
                        /<span style={{ color: '#aa0404' }}> Private</span>.</div>
                </div>


                <br />
                <div className='about-box news-box' style={{ textAlign: 'left', alignItems: 'right' }}>
                    <h3>28.06.2023</h3>
                    <div className="line"></div>
                    <div >
                        The Guild Wars 2 Armory is here!
                        <span className="gw2-logo-style" style={{ fontSize: '20px' }}> GW2</span>
                        <span className="geary-logo-style" style={{ fontSize: '20px' }}>GEARY</span> IS LIVE!!!
                    </div>
                </div>

                <br />
            </div>

        </div>);
}

export default News;