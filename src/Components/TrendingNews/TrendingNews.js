import React, { useEffect, useState } from 'react'
import SectionTitle from '../Common/SectionTitle/SectionTitle'
import News from '../Common/News/News';
import TopSharedNews from '../TopSharedNews/TopSharedNews';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

import './TrendingNews.css';
import Loading from '../Common/Loading/Loading';
import { useTranslation } from 'react-i18next';
import fallbackFetchedNewsEn from '../../data/fetchByInterests.en.json';
import fallbackFetchedNewsHy from '../../data/fetchByInterests.hy.json';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const TrendingNews = ({variant='default',newsByCategory, isFallBack}) => {
  const [newsList, setNewsList] = useState([]);
  const [currentPage, setCurrentPage] =  useState(1);
  const [loading, setLoading] =useState(true);
  const { i18n } = useTranslation();
  const itemsPerPage = 6;
  const fallbackFetchedNews = i18n.language === 'hy' ? fallbackFetchedNewsHy : fallbackFetchedNewsEn;
  useEffect(() => {
    
    const fetchNews = async () => {
      try {
        const response = await axios.get(`${backendUrl}api/newses?locale=${i18n.language}&populate=image`);
        const formattedData = response.data.data.map((item)=> {
          return{
            id: item.id,
            img: item.image.url.startsWith('/') ? item.image.url.slice(1) : item.image.url || '',
            title: item.title || '',
            bodyText: item.bodyText || '',
            postedDate: item.postedDate || '',
            slug: item.slug || '',
            category: item.category || '',
            timeToRead: item.timeToRead || '',
            likeCount: item.likeCount,
            shareCount: item.shareCount,
            viewCount: item.viewCount,
          }})

        setNewsList(formattedData)
        setLoading(false);
      } catch (err) {
        console.log('Failed to load news');
        const formattedData = fallbackFetchedNews.data.map((item)=> {
          return{
            id: item.id,
            img: item.image.url.startsWith('/') ? item.image.url.slice(1) : item.image.url || '',
            title: item.title || '',
            bodyText: item.bodyText || '',
            postedDate: item.postedDate || '',
            slug: item.slug || '',
            category: item.category || '',
            timeToRead: item.timeToRead || '',
            likeCount: item.likeCount,
            shareCount: item.shareCount,
            viewCount: item.viewCount,
          }})

        setNewsList(formattedData)
        setLoading(false);
      }
    }

    fetchNews()
  },[i18n.language,fallbackFetchedNews])
  if (loading) return <Loading />

  const lastIndex = currentPage *  itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;

  const sourceNewsList = variant === 'category' && Array.isArray(newsByCategory) ? newsByCategory : newsList;
  const totalPages = Math.ceil(sourceNewsList.length / itemsPerPage);
  const currentNews = sourceNewsList.slice(firstIndex, lastIndex);

  const nextPage = () => {
    if(currentPage  < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }
  const prevPage = () => {
    if(currentPage > 1){
      setCurrentPage(currentPage - 1)
    }
  }

  if(variant === 'default'){
    return (
      <section className='trendingNews'>
          <SectionTitle value='Trending News' />
          <div className="container">
              {currentNews.map((news,i) => <News key={i} news={news} isFallBack={isFallBack}/>)
              }
            {console.log(isFallBack,'isfallback', currentNews, 'currentNews')}
          </div>
          <div className="container centerCont">
            <div className="trendingNewsControls">
                {currentPage !== 1 && <div className="trendingNewsPrev" onClick={prevPage}><FontAwesomeIcon icon={faArrowLeft}/></div>}
                <div className="trendingNewsPagination">
                  {Array.from({length: totalPages}, (_, i) => (
                    <div key={i} className={`trendingNewsPaginationCol ${currentPage === i + 1 ? 'active' : ''}`} onClick={()=> setCurrentPage(i+1)}>
                      {i+1}
                    </div>
                  ))}
                </div>
                {currentPage < totalPages  && <div className="trendingNewsNext" onClick={nextPage}><FontAwesomeIcon icon={faArrowRight}/></div>}
            </div>
          </div>
      </section>
    )
  }else if(variant === 'category'){
    return (
      <section className='trendingNews'>
          <SectionTitle value='Trending News' />
          <div className="container">
              {currentNews.map((news,i) => <News key={i} news={news} isFallBack={isFallBack}/>)}
          </div>
          <div className="container centerCont">
            <div className="trendingNewsControls">
                {currentPage !== 1 && <div className="trendingNewsPrev" onClick={prevPage}><FontAwesomeIcon icon={faArrowLeft}/></div>}
                <div className="trendingNewsPagination">
                  {Array.from({length: totalPages}, (_, i) => (
                    <div key={i} className={`trendingNewsPaginationCol ${currentPage === i + 1 ? 'active' : ''}`} onClick={()=> setCurrentPage(i+1)}>
                      {i+1}
                    </div>
                  ))}
                </div>
                {currentPage < totalPages  && <div className="trendingNewsNext" onClick={nextPage}><FontAwesomeIcon icon={faArrowRight}/></div>}
            </div>
          </div>
      </section>
      )
  }else if(variant=== 'home'){
    return (
      <section className='trendingNews'>
          <SectionTitle value='Trending News' />
          <div className="container">
             {newsList[newsList.length-1] && <News news={newsList[newsList.length-1]} isFallBack/>}
             {newsList[newsList.length-2] && <News news={newsList[newsList.length-2]} isFallBack/>}
              <TopSharedNews  newsList={newsList}/>
          </div>
      </section>
    )
  }
}

export default TrendingNews
