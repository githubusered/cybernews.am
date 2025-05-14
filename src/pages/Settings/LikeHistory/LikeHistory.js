import React, { useEffect, useState } from 'react'
import Nav from '../../../Components/Nav/Nav';
import UserSettings from '../../../Components/Common/UserMenu/UserSettings';
import './LikeHistory.css';
import axios from 'axios';
import { useSelector } from 'react-redux';
import News from '../../../Components/Common/News/News';
import Loading from '../../../Components/Common/Loading/Loading';
import { useTranslation } from 'react-i18next';
import fetchFallBackLikeHistory from '../../../data/fetchLikeActivityAsUser.json';

const backendUrl = process.env.REACT_APP_BACKEND_URL;
const LikeHistory = () => {

    const [likedNews, setLikedNews] = useState([]);
    const [loading, setLoading] = useState(false);

    
    const user = useSelector((state)=> state.auth.user);
    const token = useSelector((state)=> state.auth.token);
    const {t} = useTranslation('common')

    useEffect(() => {
      const fetchLikedNews = async () => {
        try {
          if (!user?.id) return;
          setLoading(true)
          const query = `?populate[news][populate][image]=true&populate[user]=true&filters[user][id][$eq]=${user.id}`
          
          console.log('User ID:', user?.id);
          const res = await axios.get(
            `${backendUrl}api/likes${query}`
          );
          console.log(`${backendUrl}api/likes${query}`);
          
          const formattedData = res.data.data.map((likeItem)=> {
            const news = likeItem.news;

            return {
                id: likeItem?.id,
                img: news?.image.url.startsWith('/') ? news?.image?.url?.slice(1) : news?.image?.url || '',
                title: news?.title || '',
                bodyText: news?.bodyText || '',
                postedDate: news?.postedDate || '',
                slug: news?.slug || '',
                category: news?.category || '',
                timeToRead: news?.timeToRead || '',
                likeCount: news?.likeCount,
                shareCount: news?.shareCount,
                viewCount: news?.viewCount,
            }
        })

          setLikedNews(formattedData);
        } catch (error) {
          console.error(error);
          
          const formattedData = fetchFallBackLikeHistory.data.map((likeItem)=> {
            const news = likeItem.news;

            return {
                id: likeItem?.id,
                img: news?.image.url.startsWith('/') ? news?.image?.url?.slice(1) : news?.image?.url || '',
                title: news?.title || '',
                bodyText: news?.bodyText || '',
                postedDate: news?.postedDate || '',
                slug: news?.slug || '',
                category: news?.category || '',
                timeToRead: news?.timeToRead || '',
                likeCount: news?.likeCount,
                shareCount: news?.shareCount,
                viewCount: news?.viewCount,
            }
        })

          setLikedNews(formattedData);

        }finally{
          setLoading(false);
        }
      };
    
      fetchLikedNews()
    }, [user, token]);
    
    if(loading) return <Loading />

    return (
      <section className='likeHistory'>
      <Nav />
      <div className="container">
        <div className='likeHistoryWrapper'>
          <p>{t('settings')}</p>
          <div className='settings'>
              <UserSettings  className='settingsLeft'/>
              <div className="settingsRight">
                <p>{t('likeActivity')}</p>
                <div className="likeHistorySettings">
                    {likedNews.map((news)=> (
                      <News news={news} key={news.id}/>
                    ))}
                </div>
              </div>
          </div>
        </div>
      </div>
      </section>
    )
  }



export default LikeHistory