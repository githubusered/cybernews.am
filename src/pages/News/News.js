import React, { useEffect, useState } from 'react'
import Nav from '../../Components/Nav/Nav';
import Footer from '../../Components/Footer/Footer';
import TrendingNews from '../../Components/TrendingNews/TrendingNews';
import Reviews from '../../Components/Reviews/Reviews';
import NewsSections from '../../Components/NewsSections/NewsSections';
import TickerNews from '../../Components/Common/TickerNews/TickerNews';
import Slider from '../../Components/Common/Slider/Slider';
import BreadCrumb from '../../Components/Common/BreadCrumb/BreadCrumb';
import Loading from '../../Components/Common/Loading/Loading';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import fallbackFetchByRandomFiveEn from '../../data/fetchByInterests.en.json';
import fallbackFetchByRandomFiveHy from '../../data/fetchByInterests.hy.json';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const News = () => {
    const {i18n} = useTranslation();
    const [randomNews, setRandomNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isFallBack, setIsFallBack] = useState(false);

    const fallbackFetchByRandomFive = i18n.language === 'hy' ? fallbackFetchByRandomFiveHy : fallbackFetchByRandomFiveEn;
  
    useEffect(() => {
      const fetchByRandomFive = async () => {
        try {
            const res = await axios.get(`${backendUrl}api/newses?locale=${i18n.language}&populate=image`);
            const formattedData = res.data.data.map((item)=> {
                return {
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
                }
            })
            const shuffled = formattedData.sort(() => 0.5 - Math.random());
            const selectedFive = shuffled.slice(0, 4);
            
            setRandomNews(selectedFive);
            setLoading(false);
        } catch (error) {
            console.log("Failed to load news");
            const formattedData = fallbackFetchByRandomFive.data.map((item)=> {
                return {
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
                }
            })
            const shuffled = formattedData.sort(() => 0.5 - Math.random());
            const selectedFive = shuffled.slice(0, 4);
            
            setRandomNews(selectedFive);
            setLoading(false);
            setIsFallBack(true);
        }finally{
            setLoading(false);
        }
      }
      fetchByRandomFive();
    }, [ i18n.language, fallbackFetchByRandomFive])

    if(loading) return  <Loading />

  return (
    <>
    <Nav />
    <section className='generalSlider'>
      <div className="container">
        <BreadCrumb />
        <Slider newsByCategory={randomNews} isFallBack={isFallBack}/>
      </div>
      <TickerNews />
      <NewsSections />
      <TrendingNews isFallBack={isFallBack}/>
      <Reviews isFallBack={isFallBack}/>
    </section>
    <Footer />
  </>
  )
}

export default News
