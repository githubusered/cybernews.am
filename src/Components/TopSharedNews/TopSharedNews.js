import React from 'react'
import TopSharedNewsComp from '../Common/TopSharedNewsComp/TopSharedNewsComp';
import './TopSharedNews.css';

const TopSharedNews = ({newsList}) => {
  const sortedNews = newsList.sort((a, b) => b.shareCount - a.shareCount).slice(0,4);
  
  return (
    <div className='topSharedNewsComp'>
        <h2 className='topSharedNewsTitle'>Top Shared News</h2>
        <div className='topSharedNewsAll'>
          {
            sortedNews.map((news,i) => (
              <TopSharedNewsComp news={news} key={news.slug} index={i}/>
            ))
          }
        </div>
    </div>
  )
}

export default TopSharedNews