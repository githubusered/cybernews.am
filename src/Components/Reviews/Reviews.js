import React, { useEffect, useState } from 'react'
import './Reviews.css';
import SectionTitle from '../Common/SectionTitle/SectionTitle';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Review from '../Common/Review/Review';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import Loading from '../Common/Loading/Loading';
import fallbackReviewsEn from '../../data/reviews.en.json';
import fallbackReviewsHy from '../../data/reviews.hy.json';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const Reviews = ({isFallBack}) => {
    const { i18n } = useTranslation()
    const [loading, setLoading] = useState(true);
    const [reviewInstance, setReviewInstance] = useState([])
    const fallbackReviews = i18n.language === 'hy' ? fallbackReviewsHy : fallbackReviewsEn;
            useEffect(() => {
                const fetchNews = async () => {
                    try{
                        const res = await axios.get(`${backendUrl}api/reviews?locale=${i18n.language}&populate=reviewer`)

                        const formattedData = res.data.data.map((item) => ({
                            img: item.reviewer?.url ? item.reviewer.url.replace(/^\//, '') : '',
                            title: item.title || '',
                            bodyText: item.review || '',
                            postedDate: item.postedDate || '',
                            slug: item.documentId || '',
                            category: item.category || '',
                            fullname: item.fullName || '',
                            reviewerRole: item.reviewerRole || '',
                            timeToRead: '',
                            likeCount: 0,
                            shareCount: 0,
                            viewCount: 0,
                        }));

                        setReviewInstance(formattedData);
                        setLoading(false);
                    }catch(err){
                        console.log('News Not Found');
                        
                        const formattedData = fallbackReviews.data.map((item) => ({
                            img: item.reviewer?.url ? item.reviewer.url.replace(/^\//, '') : '',
                            title: item.title || '',
                            bodyText: item.review || '',
                            postedDate: item.postedDate || '',
                            slug: item.documentId || '',
                            category: item.category || '',
                            fullname: item.fullName || '',
                            reviewerRole: item.reviewerRole || '',
                            timeToRead: '',
                            likeCount: 0,
                            shareCount: 0,
                            viewCount: 0,
                        }));

                        setReviewInstance(formattedData);
                    }finally {
                        setLoading(false);
                    }
                }
                fetchNews()
            }, [i18n.language, fallbackReviews])

            if (loading) return <Loading />
  return (
    <section className='reviewsSection'>
        <SectionTitle value='Review'/>
        <div className="container">
            <Swiper
            modules={[Pagination, Navigation, Autoplay]}
            spaceBetween={20}
            slidesPerView={2}
            pagination={{ clickable: true, el: ".customPagination" }}
            navigation={{ nextEl: ".customNext", prevEl: ".customPrev" }}
            autoplay={{ delay: 30000, disableOnInteraction: false }} 
            loop={true}
            style={{marginRight:'0px'}}
            breakpoints={{
                380: { slidesPerView: 1 },
                768: { slidesPerView: 1 },
                1024: { slidesPerView: 2 }
            }}
            autoHeight={true}
        >
            {reviewInstance.length === 0 ? (
                <div>No reviews found.</div>
            ) : (reviewInstance.map((news) => (
                <SwiperSlide key={news.slug}>
                    <Review  reviewData={news} isFallBack/>
                </SwiperSlide>
                ))
            )}

        {/* Custom Navigation & Pagination Container */}
            <div className="customControls">
                <div className="customPrev"><FontAwesomeIcon icon={faArrowLeft}/></div>
                <div className="customPagination"></div>
                <div className="customNext"><FontAwesomeIcon icon={faArrowRight}/></div>
            </div>
        </Swiper>
        </div>
    </section>
  )
}

export default Reviews