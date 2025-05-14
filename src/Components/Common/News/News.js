import React, { useEffect, useState } from 'react'
import './News.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faComment, faShare } from '@fortawesome/free-solid-svg-icons'
import Category from '../Category/Category';
import { Link, useNavigate } from 'react-router-dom'
import { getShortText } from '../../../assets/utils/HelpUtils';
import FormattedDate from '../FormattedDate/FormattedDate';
import { useSelector } from 'react-redux';
import ShareModal from '../../Modals/ShareModal/ShareModal';

import nkar1_8e8a9484e6 from '../../../assets/images/newsImagesFallBack/nkar1_8e8a9484e6.png';
import Astghik_4ecb589edb from '../../../assets/images/newsImagesFallBack/Astghik_4ecb589edb.png';
import wifi_Vulners_78823037dc from '../../../assets/images/newsImagesFallBack/wifi_Vulners_78823037dc.png';
import i_OS_15_interface_highlighting_new_privacy_features_7ebbbc8c73 from '../../../assets/images/newsImagesFallBack/i_OS_15_interface_highlighting_new_privacy_features_7ebbbc8c73.png';
import mike_lynch_british_tech_trailblazer_dies_at_sea_7245fd2112 from '../../../assets/images/newsImagesFallBack/mike_lynch_british_tech_trailblazer_dies_at_sea_7245fd2112.png';


const backendUrl = process.env.REACT_APP_BACKEND_URL;

const News = ({news, isFallBack}) => {
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(news.likeCount || 0);
    const [isShareOpen, setIsShareOpen]= useState(false);

    const user = useSelector((state)=> state.auth.user);
    const token = useSelector((state)=> state.auth.token);
    
    const navigate = useNavigate();
    const fallbackImages = {
      "../assets/images/newsImagesFallBack/nkar1_8e8a9484e6.png": nkar1_8e8a9484e6,
      "../assets/images/newsImagesFallBack/Astghik_4ecb589edb.png": Astghik_4ecb589edb,
      "../assets/images/newsImagesFallBack/i_OS_15_interface_highlighting_new_privacy_features_7ebbbc8c73.png": i_OS_15_interface_highlighting_new_privacy_features_7ebbbc8c73,
      "../assets/images/newsImagesFallBack/wifi_Vulners_78823037dc.png": wifi_Vulners_78823037dc,
      "../assets/images/newsImagesFallBack/mike_lynch_british_tech_trailblazer_dies_at_sea_7245fd2112.png": mike_lynch_british_tech_trailblazer_dies_at_sea_7245fd2112
    }; 
    const getImageUrl = (news) => {
          if (news.img?.startsWith('http')) {
            return news.img;
          } else if (isFallBack && fallbackImages[news.img]) {
            return fallbackImages[news.img];
          } else {
            return backendUrl + news.img;
          }
        };
    useEffect(() => {
      // Check if the user has already liked the news
      const checkLikeStatus = async () => {
        try {
          if (!user || !news?.id) return;
  
          const response = await fetch(`${backendUrl}api/likes?populate=*&filters[user][id][$eq]=${user.id}&filters[news][id][$eq]=${news.id}`);
          const data = await response.json();
      
          setIsLiked(data.data && data.data.length > 0);
          
        } catch (error) {
          console.log(error,'Error Checking like status')
        }
      };
      checkLikeStatus();
    }, [user, news?.id]);
    
    const handleLike = async (e) => {
      e.preventDefault();
      e.stopPropagation()
      try {
        if (!token) {
          // Redirect to login if not authenticated
          navigate('/login');
          return;
        }
        
        const response = await fetch(`${backendUrl}api/likes/toggle`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            newsId: news?.id,
          }),
        });
        const data = await response.json();
        if (data.message === 'Like added') {
          setIsLiked(true);
          setLikeCount(prevCount => prevCount + 1);  // Increment by 1
        } else if (data.message === 'Like removed') {
          setIsLiked(false);
          setLikeCount(prevCount => Math.max(prevCount - 1, 0));  // Decrement by 1
        }
      } catch (error) {
        console.error('Error toggling like:', error);
      }
    };

  return (
    <>
    <Link className='news' to={`/news/${news.category.toLowerCase()}/${news.slug}`} state={{newsInstance: news}}>
      <img src={getImageUrl(news)} alt={news.title} />
      <h2 className='newsCompTitle'>{news.title}</h2>
      <p className='newsCompBodyText'>
        {getShortText(news.bodyText)}
      </p>
      <FormattedDate date={news.postedDate} />
      <Category value={news.category} />
      <div className="newsCompHowMinutesRead">
        <div className='line'></div>
        <span>{news.timeToRead} Minutes Read</span>
      </div>
      <div className="newsCompInteractionIcons">
        <div className="likeSection">
          <FontAwesomeIcon icon={faHeart} className={`newsCompInteractionIcon newsLike ${isLiked? 'liked':''}`} onClick={handleLike}/>
          <span className="likeCount">{likeCount}</span>
        </div>
        <FontAwesomeIcon icon={faComment} className='newsCompInteractionIcon newsComment'/>
        <FontAwesomeIcon icon={faShare} className='newsCompInteractionIcon newsShare' onClick={(e) => {e.preventDefault();e.stopPropagation();setIsShareOpen(true)}}/>
      </div>
    </Link>
        <ShareModal isOpen={isShareOpen}
                    onClose={() => setIsShareOpen(false)}
                    newsUrl={`http://localhost:3000/news/${news.category}/${news.slug}`}
        />   
        </>
  )
}

export default News
