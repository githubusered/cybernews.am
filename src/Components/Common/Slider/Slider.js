import React from 'react'
import {
    Swiper,
    SwiperSlide
} from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation"; /* Import navigation styles */
import {
    Pagination,
    Navigation,
    Autoplay
} from "swiper/modules";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faClock, faDollar, faHashtag, faLocation} from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft} from '@fortawesome/free-solid-svg-icons';

import image1 from "../../../assets/images/Screenshot_4.png";
import image2 from "../../../assets/images/nkar2.png";
import image3 from "../../../assets/images/Google-Cloud-leak-.avif";

import event1Img from "../../../assets/images/events/blob.jpg";
import event2Img from "../../../assets/images/events/cascade.png";
import publisherImg from '../../../assets/images/noAvatar.png';

import nkar1_8e8a9484e6 from '../../../assets/images/newsImagesFallBack/nkar1_8e8a9484e6.png';
import Astghik_4ecb589edb from '../../../assets/images/newsImagesFallBack/Astghik_4ecb589edb.png';
import wifi_Vulners_78823037dc from '../../../assets/images/newsImagesFallBack/wifi_Vulners_78823037dc.png';
import i_OS_15_interface_highlighting_new_privacy_features_7ebbbc8c73 from '../../../assets/images/newsImagesFallBack/i_OS_15_interface_highlighting_new_privacy_features_7ebbbc8c73.png';
import mike_lynch_british_tech_trailblazer_dies_at_sea_7245fd2112 from '../../../assets/images/newsImagesFallBack/mike_lynch_british_tech_trailblazer_dies_at_sea_7245fd2112.png';

import './Slider.css';
import Btn from '../Btn/Btn';
import { Link } from 'react-router';
import { getShortText } from '../../../assets/utils/HelpUtils';
import { useTranslation } from 'react-i18next';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const newsData = [{
        id: 1,
        title: "Mike Lynch, British Tech Trailblazer Who Died at Sea After US Trial Acquittal",
        body: `Tech tycoon Mike Lynch, known as "Britain's Bill Gates," was found dead after his yacht sank off Sicily. Lynch founded Autonomy, sold to HP for $11 billion before facing legal battles over alleged fraud. He was recently acquitted of charges. His yacht sank during a storm, killing multiple passengers, with his daughter still missing.`,
        image: image2,
        url:"/news/Tech/mike-lynch-british-tech-trailblazer-who-died-at-sea-after-us-trial-acquittal"
    },
    {
        id: 2,
        title: "Data of more than half of Chile’s population exposed in massive leak",
        body: "Caja Los Andes, Chile's largest pension fund, exposed data of over 10 million Chileans due to poor database security. The leak included personal details like addresses and financial info, risking identity theft and fraud. The company denies the leak, citing ongoing investigations.",
        image: image1,
    },
    {
        id: 3,
        title: "Google Cloud leak linked to Shark Tank contestant exposes 83,000",
        body: "A leaking Google Cloud Storage bucket linked to Alice’s Table exposed the personal data of over 83,000 customers, including emails and home addresses. The breach involved both personal and professional emails from companies like BCG and Pfizer. Experts recommend revoking public access and enabling encryption to mitigate risks.",
        image: image3,
        url: `/news/cybersecurity/google-cloud-leak-linked-to-shark-tank-contestant-exposes-83-000`
    },
];
const eventsData = [
  {
        id:1,
        img: event1Img,
        publisher: 'Advertising Week',
        publisherImg: publisherImg,
        publisherImgAlt: 'Advertising Week',
        title: 'Advertising Week Europe 2024',
        rating: '4.27', // 0-5
        location: 'United Kingdom',
        street: '',
        category: 'Seminar/Webinar',// Seminar/Webinar, Conference, Workshop, Hackathons
        date: '14 May 2025',
        hour: '10:00 AM', // or PM
        isPaid: true, //false
        url: '', //url of the event from source
    },
    {
        id:2,
        img: event2Img,
        publisher: 'DataFest Yerevan',
        publisherImg: publisherImg,
        publisherImgAlt: 'DataFest Yerevan',
        title: 'DataFest Yerevan 2024',
        rating: '4.0', // 0-5
        location: 'Yerevan, Armenia',
        street: 'Cascade Street',
        category: 'Conference',// Seminar/Webinar, Conference, Workshop, Hackathons
        date: '7 Sep 2025',
        hour: '09:00 AM', // or PM
        isPaid: false,
        url: '', //url of the event from source
    },
]
const fallbackImages = {
  "../assets/images/newsImagesFallBack/nkar1_8e8a9484e6.png": nkar1_8e8a9484e6,
  "../assets/images/newsImagesFallBack/Astghik_4ecb589edb.png": Astghik_4ecb589edb,
  "../assets/images/newsImagesFallBack/i_OS_15_interface_highlighting_new_privacy_features_7ebbbc8c73.png": i_OS_15_interface_highlighting_new_privacy_features_7ebbbc8c73,
  "../assets/images/newsImagesFallBack/wifi_Vulners_78823037dc.png": wifi_Vulners_78823037dc,
  "../assets/images/newsImagesFallBack/mike_lynch_british_tech_trailblazer_dies_at_sea_7245fd2112.png": mike_lynch_british_tech_trailblazer_dies_at_sea_7245fd2112
};
const Slider = ({newsByCategory, eventsByCategory, isFallBack}) => {
    const {t} = useTranslation('common');  
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
        <>

        { newsByCategory && <div className="sliderContainer">
      <Swiper
        modules={[Pagination, Navigation, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        pagination={{ clickable: true, el: ".customPagination",type: "bullets" }}
        navigation={{ nextEl: ".customNext", prevEl: ".customPrev" }}
        autoplay={{ delay: 30000, disableOnInteraction: false }}
        loop={true}
        style={{marginRight:'0px'}}
        breakpoints={{
          768: { slidesPerView: 1 },
          1024: { slidesPerView: 1 }
        }}
        autoHeight={true}
      >
        {Array.isArray(newsByCategory) && newsByCategory.length > 0 ? newsByCategory.slice().reverse().map((news) => (
          <SwiperSlide key={news.slug}>
            <div className="newsSlide">
              <div className="newsContent">
                <h2 className="newsTitle">{news.title}</h2>
                <div className="newsBody">
                  {getShortText(news.bodyText)}
                </div>
               <Link to={`/news/${news.category.toLowerCase()}/${news.slug}`}>
                  <Btn btnValue="Read More" className='btnReadMore'/>
               </Link> 
              </div>
              <div className="imageContainer" style={{backgroundImage: `url(${getImageUrl(news)})`}}></div>
            </div>
          </SwiperSlide>
        )) : newsData.map((news) => (
          <SwiperSlide key={news.id}>
            <div className="newsSlide">
              <div className="newsContent">
                <h2 className="newsTitle">{news.title}</h2>
                <p className="newsBody">{news.body}</p>
                <Link to={news.url}>
                  <Btn btnValue="Read More" className='btnReadMore' />
                </Link>
              </div>
              <div className="imageContainer" style={{backgroundImage: `url(${news.image})`}}></div>
            </div>
          </SwiperSlide>
        ))}

      {/* Custom Navigation & Pagination Container */}
      <div className="customControls">
        <div className="customPrev"><FontAwesomeIcon icon={faArrowLeft}/></div>
        <div className="customPagination"></div>
        <div className="customNext"><FontAwesomeIcon icon={faArrowRight}/></div>
      </div>
      </Swiper>
      </div>}
        {eventsByCategory && <div className="sliderContainer">
      <Swiper
        modules={[Pagination, Navigation, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        pagination={{ clickable: true, el: ".customPagination",type: "bullets" }}
        navigation={{ nextEl: ".customNext", prevEl: ".customPrev" }}
        autoplay={{ delay: 30000, disableOnInteraction: false }} 
        loop={true}
        style={{marginRight:'0px'}}
        breakpoints={{
          768: { slidesPerView: 1 },
          1024: { slidesPerView: 1 }
        }}
        autoHeight={true}
      >
        {Array.isArray(eventsByCategory) && eventsByCategory.length > 0 ? eventsByCategory.slice().reverse().map((event) => (
          <SwiperSlide key={event.id}>
            <div className='eventSlide' style={{backgroundImage: `url(${event.img})`}}>
              <div className="eventLeft">
                <div className="eventData">
                  <div className="eventHour">
                    <FontAwesomeIcon icon={faClock} className='eventDataIcons'/>
                    <p>{event.hour}</p>
                  </div>
                  <div className="eventCategory">
                    <FontAwesomeIcon icon={faHashtag}  className='eventDataIcons'/>
                    <p>{event.category}</p>
                  </div>
                </div>
                <div className="eventPublisherAndBtnToAttend">
                    <div className="eventPublisher">
                        <img src={event.publisherImg} alt={event.publisherImgAlt} className='eventPublisherImg' />
                        <div className='eventPublisherData'>
                          <p>{event.publisher}</p>
                          <p>{event.date}</p>
                        </div>
                    </div>
                    <Btn btnValue={t('attend')}/>
                </div>
              </div>
              <div className="eventRight">
                <div className="eventData">
                  <div className="eventStreet">
                    <FontAwesomeIcon icon={faLocation} className='eventDataIcons'/>
                    <p>{event.location}</p>
                  </div>
                  <div className="eventIsPaid">
                    <FontAwesomeIcon icon={faDollar} className='eventDataIcons'/>
                    <p>{event.isPaid ? 'PAID' : 'FREE'}</p>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        )) : eventsData.map((event) => (
          <SwiperSlide key={event.id}>
            <div className='eventSlide' style={{backgroundImage: `url("${event.img}")`,backgroundSize:"cover"}}>
              <div className="eventLeft">
                <div className="eventData">
                  <div className="eventHour">
                    <FontAwesomeIcon icon={faClock} />
                    <p>{event.hour}</p>
                  </div>
                  <div className="eventCategory">
                    <FontAwesomeIcon icon={faHashtag} />
                    <p>{event.category}</p>
                  </div>
                </div>
                <div className="eventPublisherAndBtnToAttend">
                    <div className="eventPublisher">
                        <img src={event.publisherImg} alt={event.publisherImgAlt} className='eventPublisherImg' />
                        <div className='eventPublisherData'>
                          <p>{event.publisher}</p>
                          <p>{event.date}</p>
                        </div>
                    </div>
                    <Btn btnValue='Attend'/>
                </div>
              </div>
              <div className="eventRight">
                <div className="eventData">
                  <div className="eventStreet">
                    <FontAwesomeIcon icon={faLocation} />
                    <p>{event.location}</p>
                  </div>
                  <div className="eventIsPaid">
                    <FontAwesomeIcon icon={faDollar} />
                    <p>{event.isPaid ? 'PAID' : 'FREE'}</p>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}

      {/* Custom Navigation & Pagination Container */}
      <div className="customControls">
        <div className="customPrev"><FontAwesomeIcon icon={faArrowLeft}/></div>
        <div className="customPagination"></div>
        <div className="customNext"><FontAwesomeIcon icon={faArrowRight}/></div>
      </div>
      </Swiper>
      </div>}
        </>
      );
}

export default Slider