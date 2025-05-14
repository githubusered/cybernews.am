import React, { useEffect, useState } from 'react'

import './Home.css';
import Nav from '../../Components/Nav/Nav';
import FormattedDate from '../../Components/Common/FormattedDate/FormattedDate';
import Slider from '../../Components/Common/Slider/Slider';
import TickerNews from '../../Components/Common/TickerNews/TickerNews';
import TrendingNews from '../../Components/TrendingNews/TrendingNews';
import Footer from '../../Components/Footer/Footer';
import Resources from '../../Components/Resources/Resources';
import Reviews from '../../Components/Reviews/Reviews';
import Loading from '../../Components/Common/Loading/Loading';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import InterestsModal from '../../Components/Modals/InterestsModal/InterestsModal';
// import { generateAndPostNews } from '../../Components/GenerateNewsWithAI/GenerateNewsWithAI';
import fallbackNewsByInterestsEn from '../../data/fetchByInterests.en.json';
import fallbackNewsByInterestsHy from '../../data/fetchByInterests.hy.json';
import fallbackUser from '../../data/user.json';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const Home = () => {
  
  const {i18n} = useTranslation();
  const fallbackNewsByInterests = i18n.language === 'hy' ? fallbackNewsByInterestsHy : fallbackNewsByInterestsEn;
  const [randomNews, setRandomNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFallBack, setIsFallBack] = useState(false);
 
  const [showModal, setShowModal] = useState(false);
  const user = useSelector((state)=> state.auth.user) || fallbackUser;

  useEffect(() => {
    const fetchNewsByInterests = async (interests) => {
      try {
        const query = interests.map((i, index) => `filters[category][$in][${index}]=${encodeURIComponent(i)}`).join('&');

        const res = await axios.get(`${backendUrl}api/newses?locale=${i18n.language}&${query}&populate=*`);
        
        const formattedData = res.data.data.map((item) => ({
          id: item.id,
          img: item.image.url?.startsWith('/') ? item.image.url.slice(1) : item.image.url || '',
          title: item.title || '',
          bodyText: item.bodyText || '',
          postedDate: item.postedDate || '',
          slug: item.slug || '',
          category: item.category || '',
          timeToRead: item.timeToRead || '',
          likeCount: item.likeCount,
          shareCount: item.shareCount,
          viewCount: item.viewCount,
        }));

        const selectedFive = formattedData.slice(0, 5);

        setRandomNews(selectedFive);
      } catch (error) {
          console.log("Failed to load personalized news",error);
          const formattedData = fallbackNewsByInterests.data.map((item) => ({
            id: item.id,
            img: item.image.url?.startsWith('/') ? item.image.url.slice(1) : item.image.url || '',
            title: item.title || '',
            bodyText: item.bodyText || '',
            postedDate: item.postedDate || '',
            slug: item.slug || '',
            category: item.category || '',
            timeToRead: item.timeToRead || '',
            likeCount: item.likeCount,
            shareCount: item.shareCount,
            viewCount: item.viewCount,
          }));
             const selectedFive = formattedData.slice(0, 5);

             setRandomNews(selectedFive);
             setIsFallBack(true)
      } finally {
        setLoading(false);
      }
    };

    const fetchByRandomFive = async () => {
         try {
             const res = await axios.get(`${backendUrl}api/newses?locale=${i18n.language}&populate=*`);

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
             const selectedFive = shuffled.slice(0, 5);
             
             setRandomNews(selectedFive);
             setLoading(false);
         } catch (error) {
             console.log("Failed to load news");
             const formattedData = fallbackNewsByInterests.data.map((item)=> {
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
             const selectedFive = shuffled.slice(0, 5);
             
             setRandomNews(selectedFive);
             setIsFallBack(true)
         }finally{
             setLoading(false);
         }
    }

    if (user?.interests) {
      const interestsArray = user.interests.split(',').map(i => i.trim());
      fetchNewsByInterests(interestsArray);
    } else {
      fetchByRandomFive();
    }
    }, [user, i18n.language, fallbackNewsByInterests])

    useEffect(() => {
      if (user && user.interests === null) {
        setShowModal(true);
      }
    }, [user]);

    if(loading) return  <Loading />

  return (
    <>
      <Nav />
      {/* <button onClick={generateAndPostNews}>Click to generate real news using AI</button> */}
      {showModal && <InterestsModal onClose={() => setShowModal(false)} />}
      <section className='generalSlider'>
        <div className="container">
          <FormattedDate />
          <Slider  newsByCategory={randomNews} isFallBack={isFallBack}/>
        </div>
        <TickerNews />
        <TrendingNews  variant='home' isFallBack={isFallBack}/>
        <Resources />
        <Reviews isFallback={isFallBack} />
      </section>
      <Footer />
    </>
  )
}

export default Home
