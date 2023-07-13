function News() {
    return (
        <div className='flex center column'>

            <div className='about-box news-box' style={{ textAlign: 'left', alignItems: 'right' }}>
                <h3>13.07.2023</h3>
                <div className="line"></div>
                <div >Added an option to copy specific <span className="yellow-highlight">equipment</span> & <span className="yellow-highlight">build</span></div>
            </div>

            <br />
            <div className='about-box news-box' style={{ textAlign: 'left', alignItems: 'right' }}>
                <h3>11.07.2023</h3>
                <div className="line"></div>
                <div >Added an option to make a character
                    <span style={{ color: 'darkgreen' }}> Public </span>
                    /<span style={{ color: '#aa0404' }}> Private </span></div>
            </div>


            <br />
            <div className='about-box news-box' style={{ textAlign: 'left', alignItems: 'right' }}>
                <h3>28.06.2023</h3>
                <div className="line"></div>
                <div ><span className="gw2-logo-style" style={{ fontSize: '20px' }}>GW2</span><span className="geary-logo-style" style={{ fontSize: '20px' }}>GEARY</span> IS LIVE!!!</div>
            </div>

        </div>);
}

export default News;