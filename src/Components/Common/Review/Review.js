import React from 'react'
import './Review.css';
import FormattedDate from '../FormattedDate/FormattedDate';

import Samvel_4a1493e68c from '../../../assets/images/reviewers/Samvel_4a1493e68c.svg';
import Hovhannes_24487e5b45 from '../../../assets/images/reviewers/Hovhannes_24487e5b45.svg';
import Edmon_c5ac067696 from '../../../assets/images/reviewers/Edmon_c5ac067696.png';


const backendUrl = process.env.REACT_APP_BACKEND_URL;

const Review = ({reviewData, isFallBack}) => {

    const fallbackImages = {
          "../assets/images/reviewers/Samvel_4a1493e68c.svg": Samvel_4a1493e68c,
          "../assets/images/reviewers/Hovhannes_24487e5b45.svg": Hovhannes_24487e5b45,
          "../assets/images/reviewers/Edmon_c5ac067696.png": Edmon_c5ac067696,
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
  return (
    <div className='reviewsUserAndReview'>
        <div className="reviewsUser">
            <img className="reviewsUserImg" src={getImageUrl(reviewData)} alt='user img'/>
            <div className="reviewUserFullNameAndProfession">
                <p className='reviewUserFullName'>{reviewData.fullname}</p>
                <p className='reviewUserProfession'>{reviewData.reviewerRole}</p>
            </div>
        </div>
        <div className="reviewsReview">
            <h2>{reviewData.title}</h2>
            <p>{reviewData.bodyText}</p>
            <div className="dateAndSubject">
                <span className='reviewsReviewDate'><FormattedDate date={reviewData.postedDate}/></span>
                <span className='reviewsReviewSubject'>{reviewData.category}</span>
            </div>
        </div>
    </div>
  )
}

export default Review