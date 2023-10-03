import React from 'react';
import NewsList from '../NewsList';

function SearchNews() {
  return (
    <div className='flex center'>
      <div className='home-empty-search-box'>
        <div className='home-welcome' style={{ fontSize: '25px' }}>
          Latest News
        </div>
        <div className='search-news'>
          <NewsList isSearchNews limit={6}/>
        </div>
      </div>
    </div>
  );
}

export default SearchNews;