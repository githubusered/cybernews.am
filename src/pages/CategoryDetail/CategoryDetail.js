import React, { useEffect, useState } from 'react'
import './CategoryDetail.css';
import { useParams } from 'react-router-dom';
import Nav from '../../Components/Nav/Nav';
import BreadCrumb from '../../Components/Common/BreadCrumb/BreadCrumb';
import Slider from '../../Components/Common/Slider/Slider';
import TickerNews from '../../Components/Common/TickerNews/TickerNews';
import TrendingNews from '../../Components/TrendingNews/TrendingNews';
import Reviews from '../../Components/Reviews/Reviews';
import Footer from '../../Components/Footer/Footer';
import axios from 'axios';
import Loading from '../../Components/Common/Loading/Loading';
import { useTranslation } from 'react-i18next';
import fallBackFetchByCategoryEn from '../../data/fetchByInterests.en.json';
import fallBackFetchByCategoryHy from '../../data/fetchByInterests.hy.json';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const CategoryDetail = () => {
    const { category } = useParams();
    const {i18n} = useTranslation();
    const [categoryNews, setCategoryNews] = useState([]);
    const [isFallBack,setIsFallBack] = useState(false);
    const [loading, setLoading] = useState(true);
    const fallBackFetchByCategory = i18n.language === 'hy' ? fallBackFetchByCategoryHy : fallBackFetchByCategoryEn;

    useEffect(() => {
      const fetchByCategory = async () => {
        try {
            const res = await axios.get(`${backendUrl}api/newses?filters[category][$eqi]=${category}&locale=${i18n.language}&populate=image`);
            const formattedData = res.data.data.map((item)=> {
                return {
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
            setCategoryNews(formattedData);
            setLoading(false);
        } catch (error) {
            console.log("Failed to load news");

            const formattedData = fallBackFetchByCategory.data
            .filter(item => item.category?.toLowerCase() === category?.toLowerCase())
            .map((item)=> {
                return {
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
            setCategoryNews(formattedData);
            setIsFallBack(true);
        }finally{
            setLoading(false);
        }
      }
        fetchByCategory();
    }, [category, i18n.language, fallBackFetchByCategory])

    if(loading) return  <Loading />
    if(!categoryNews || categoryNews.length === 0) return  <div  style={{textAlign:'center',fontSize:'44px'}}>No news in this category.</div>

  return (
    <>
    <Nav />
    <section className='generalSlider'>
      <div className="container">
        <BreadCrumb />
        <Slider newsByCategory={categoryNews} isFallBack={isFallBack}/>
      </div>
      <TickerNews />
      <TrendingNews newsByCategory={categoryNews} variant='category' isFallBack={isFallBack}/>
      <Reviews />
    </section>
    <Footer />
  </>
  )
}

export default CategoryDetail