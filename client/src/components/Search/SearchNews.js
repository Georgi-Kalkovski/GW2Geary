import React from 'react';
import NewsList from '../NewsList';
import NewsSvg from './news.svg'
function SearchNews() {
  return (
    <div className='flex center'>
      <div className='home-empty-search-box'>
        {/* <div className='home-welcome flex news-svg' style={{ fontSize: '25px', justifyContent: 'space-between' }}>
          <img className='' style={{ marginLeft: '-3px', marginTop: '-20px', width: '35px', position: 'relative', left: '0' }} src={NewsSvg} alt="" />
          <div className='flex center'>Latest News</div>
          <div style={{ width: '35px' }}></div>
        </div> */}
        <div className='home-welcome' style={{ fontSize: '25px' }}>
          <div className='flex center'>Latest News</div>
        </div>
        <div className='search-news'>
          <NewsList isSearchNews limit={6} />
        </div>
      </div>
    </div>
  );
}

export default SearchNews;