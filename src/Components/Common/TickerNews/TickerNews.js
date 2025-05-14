import React, { useEffect, useState } from 'react';
import './TickerNews.css';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import Loading from '../Loading/Loading';

import fallbackTickerNewsEn from '../../../data/fetchTickerNews.en.json';
import fallbackTickerNewsHy from '../../../data/fetchTickerNews.hy.json';

const backendUrl = process.env.REACT_APP_BACKEND_URL

const TickerNews = () => {
    const { i18n } = useTranslation();
    const fallbackTickerNews = i18n.language === 'hy'? fallbackTickerNewsHy : fallbackTickerNewsEn;

    const [tickerNews, setTickerNews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
      const fetchTickerNews = async () => {
      try {
        const res = await axios.get(`${backendUrl}api/running-newses?locale=${i18n.language}`)
        const formattedData = res.data.data.map((item) => {
          return {
            title: item?.title || '',
            bodyText: item?.bodyText || '',
          }
        })
        setTickerNews(formattedData)
        setLoading(false);
       } catch (error) {
          console.log('Failed to load ticker news', error);
          const formattedData = fallbackTickerNews.data.map((item) => {
            return {
              title: item?.title || '',
              bodyText: item?.bodyText || '',
            }
          })
          setTickerNews(formattedData)
        }finally {
         setLoading(false)
       }
      }
      fetchTickerNews()
    },[i18n.language, fallbackTickerNews])

    if(loading) return <Loading />

  return (
    <div className="newsTicker">
    <div className="tickerWrapper">
      <div className="tickerContent">
        {tickerNews.map((news, index) => (
          <span key={index} className="tickerItem">
            <span className='tickerItemTitle'>{news.title}</span>: {news.bodyText}
          </span>
        ))}
      </div>
    </div>
  </div>
  )
}

export default TickerNews

