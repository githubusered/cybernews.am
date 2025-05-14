import React, { useEffect, useState } from 'react'
import Event from '../../Components/Common/Event/Event';
import Nav from '../../Components/Nav/Nav';
import Slider from '../../Components/Common/Slider/Slider';
import Footer from '../../Components/Footer/Footer';
import './Events.css';
import event1Img from "../../assets/images/events/blob.jpg";
import event2Img from "../../assets/images/events/cascade.png";
import event3Img from "../../assets/images/events/Digitec.png";
import event4Img from "../../assets/images/events/CloudSecurity.png";
import event5Img from "../../assets/images/events/ECDMA.png";
import event6Img from "../../assets/images/events/ScienceFestival.png";
import event7Img from "../../assets/images/events/ScienceArmenia.png";

import publisherImg from '../../assets/images/noAvatar.png';
import Btn from '../../Components/Common/Btn/Btn';
import Search from '../../Components/Common/Search/Search';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const backendUrl = process.env.REACT_APP_BACKEND_URL;
const eventsArr = [
    {
            id:1,
            img: event1Img,
            publisher: 'Advertising Week',
            publisherImg: publisherImg,
            publisherImgAlt: 'Advertising Week',
            title: 'Advertising Week Europe',
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
         {
            id:3,
            img: event3Img,
            publisher: 'Digitec',
            publisherImg: null,
            publisherImgAlt: 'Digitec',
            title: 'World Congress on Ino...',
            rating: '3.0', // 0-5
            location: 'Yerevan, Armenia',
            street: 'Cascade Street',
            category: 'Conference',// Seminar/Webinar, Conference, Workshop, Hackathons
            date: '4 Oct 2025',
            hour: '12:00 AM', // or PM
            isPaid: false,
            url: '', //url of the event from source
        },
         {
            id:4,
            img: event4Img,
            publisher: 'SANS',
            publisherImg: publisherImg,
            publisherImgAlt: 'SANS',
            title: 'Cloud Security Exchange',
            rating: '2.0', // 0-5
            location: 'Yerevan, Armenia',
            street: 'Cascade Street',
            category: 'Seminar/Webinar',// Seminar/Webinar, Conference, Workshop, Hackathons
            date: '27 Aug 2025',
            hour: '11:00 AM', // or PM
            isPaid: false,
            url: '', //url of the event from source
        },
         {
            id:5,
            img: event5Img,
            publisher: 'ECDMA',
            publisherImg: publisherImg,
            publisherImgAlt: 'DataFest Yerevan',
            title: 'Armenia Digital Awards 2024',
            rating: '3.7', // 0-5
            location: 'Yerevan, Armenia',
            street: 'Cascade Street',
            category: 'Workshop',// Seminar/Webinar, Conference, Workshop, Hackathon
            date: '17 Sep 2025',
            hour: '15:00 PM', // or PM
            isPaid: false,
            url: '', //url of the event from source
        },
         {
            id:6,
            img: event6Img,
            publisher: 'Gituzh',
            publisherImg: publisherImg,
            publisherImgAlt: 'DataFest Yerevan',
            title: 'Science Festival 2024',
            rating: '4.0', // 0-5
            location: 'Yerevan, Armenia',
            street: 'Cascade Street',
            category: 'Conference',// Seminar/Webinar, Conference, Workshop, Hackathon
            date: '8 Oct 2025',
            hour: '08:00 AM', // or PM
            isPaid: false,
            url: '', //url of the event from source
        },
         {
            id:7,
            img: event7Img,
            publisher: 'Gituzh',
            publisherImg: publisherImg,
            publisherImgAlt: 'DataFest Yerevan',
            title: 'Science Week Armenia 2025',
            rating: '4.0', // 0-5
            location: 'Yerevan, Armenia',
            street: 'Cascade Street',
            category: 'Conference',// Seminar/Webinar, Conference, Workshop, Hackathons
            date: '6 Oct 2025',
            hour: '12:00 AM', // or PM
            isPaid: false,
            url: '', //url of the event from source
        },
]
const eventsArrHy = [
    {
        id: 1,
        img: event1Img,
        publisher: 'Գովազդային Շաբաթ',
        publisherImg: publisherImg,
        publisherImgAlt: 'Գովազդային Շաբաթ',
        title: 'Եվրոպայի Գովազդային Շաբաթ',
        rating: '4.27',
        location: 'Միացյալ Թագավորություն',
        street: '',
        category: 'Սեմինար/Վեբինար',
        date: '14 Մայիս 2025',
        hour: '10:00 ԱՄ',
        isPaid: true,
        url: '',
    },
    {
        id: 2,
        img: event2Img,
        publisher: 'DataFest Երևան',
        publisherImg: publisherImg,
        publisherImgAlt: 'DataFest Երևան',
        title: 'DataFest Երևան 2024',
        rating: '4.0',
        location: 'Երևան, Հայաստան',
        street: 'Կասկադ փողոց',
        category: 'Կոնֆերանս',
        date: '7 Սեպտեմբեր 2025',
        hour: '09:00 ԱՄ',
        isPaid: false,
        url: '',
    },
    {
        id: 3,
        img: event3Img,
        publisher: 'Digitec',
        publisherImg: null,
        publisherImgAlt: 'Digitec',
        title: 'Նորարարության Համաշխարհային Կոնգրես...',
        rating: '3.0',
        location: 'Երևան, Հայաստան',
        street: 'Կասկադ փողոց',
        category: 'Կոնֆերանս',
        date: '4 Հոկտեմբեր 2025',
        hour: '12:00 ԱՄ',
        isPaid: false,
        url: '',
    },
    {
        id: 4,
        img: event4Img,
        publisher: 'SANS',
        publisherImg: publisherImg,
        publisherImgAlt: 'SANS',
        title: 'Ապահովության Փոխանակում Ամպում',
        rating: '2.0',
        location: 'Երևան, Հայաստան',
        street: 'Կասկադ փողոց',
        category: 'Սեմինար/Վեբինար',
        date: '27 Օգոստոս 2025',
        hour: '11:00 ԱՄ',
        isPaid: false,
        url: '',
    },
    {
        id: 5,
        img: event5Img,
        publisher: 'ECDMA',
        publisherImg: publisherImg,
        publisherImgAlt: 'DataFest Երևան',
        title: 'Հայաստանի Թվային Մրցանակներ 2024',
        rating: '3.7',
        location: 'Երևան, Հայաստան',
        street: 'Կասկադ փողոց',
        category: 'Վարպետաց դաս',
        date: '17 Սեպտեմբեր 2025',
        hour: '15:00 ՀՄ',
        isPaid: false,
        url: '',
    },
    {
        id: 6,
        img: event6Img,
        publisher: 'Gituzh',
        publisherImg: publisherImg,
        publisherImgAlt: 'DataFest Երևան',
        title: 'Գիտության Փառատոն 2024',
        rating: '4.0',
        location: 'Երևան, Հայաստան',
        street: 'Կասկադ փողոց',
        category: 'Կոնֆերանս',
        date: '8 Հոկտեմբեր 2025',
        hour: '08:00 ԱՄ',
        isPaid: false,
        url: '',
    },
    {
        id: 7,
        img: event7Img,
        publisher: 'Gituzh',
        publisherImg: publisherImg,
        publisherImgAlt: 'DataFest Երևան',
        title: 'Գիտության Շաբաթ Հայաստան 2025',
        rating: '4.0',
        location: 'Երևան, Հայաստան',
        street: 'Կասկադ փողոց',
        category: 'Կոնֆերանս',
        date: '6 Հոկտեմբեր 2025',
        hour: '12:00 ԱՄ',
        isPaid: false,
        url: '',
    },
];

const Events = () => {
    const [activeType, setActiveType] = useState('All Events');

    const [events, setEvents] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
  
    const {i18n, t} = useTranslation('common');

    useEffect(() => {
      const fetchEvents = async () => {
        try {
          const res = await axios.get(`${backendUrl}api/events?populate=*&locale=${i18n.language}`)
          const data = res?.data
          if (Array.isArray(data) && data.length > 0) {
            setEvents(data);
          } else {
            setEvents(eventsArr);
          }
        } catch (error) {
          console.log('Error Fetching Events',error);
          if(i18n.language === 'hy'){
              setEvents(eventsArrHy)
            }else{
              setEvents(eventsArr);
            }
        }
      }

      fetchEvents()
    }, [i18n.language])
    
    const styleBtn = {borderRadius: '30px',padding: "7px 24px", backgroundColor: 'white', color:'black' };
    // const eventsCategories = ['All Events', 'Conference', 'Workshop', 'Hackathon', 'Seminar/Webinar']
    const eventsCategories = [
      'All Events',
      'Conference',
      'Workshop',
      'Hackathon',
      'Seminar/Webinar'
    ];

    const eventTypeTranslations = {
      'All Events': t('allEvents'),
      'Conference':   t('conference'),
      'Workshop':     t('workshop'),
      'Hackathon':    t('hackathon'),
      'Seminar/Webinar': t('semWebiNar'),
    };
    // const activeCategoryLabel = 
    //   i18n.language === 'hy'
    //     ? eventTypeTranslations[activeType]
    //     : activeType;

  return (
    <>
    <Nav />
      <section className='eventsSlider'>
        <div className="container">
          <p>{t('weeklyEvents')}</p>
          <Slider  eventsByCategory={events}/>
        </div>
        <div className="container">
          <p>{t('welcomeToTheEvents')}</p>
          <section className='eventsAndFilter'>
              <div className='eventsFilter'>
                {
                  eventsCategories.map((eventType, i) => (
                    <Btn btnValue={i18n.language === 'hy' ? eventTypeTranslations[eventType] : eventType}
                        key={i} className={`${activeType === eventType ? 'eventBtnActive' : ''}`} style={styleBtn} onClick={()=> setActiveType(eventType)}/>
                  ))
                }
                <Search type='events'
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  setSearchResults={setSearchResults}
                  searchResults={searchResults}
                  className='searchComponent'
                  events={events}
                />
              </div>
            <div className='searchResultOrEventList'>
                {
                  searchQuery
                    ? searchResults.map((item) => <Event key={item.id} event={item} />)
                    : events
                        .filter(event => activeType === 'All Events'|| activeType === 'Բոլոր իրադարձությունները' || event.category === activeType)
                        .map((item) => <Event key={item.id} event={item} />)
                }
            </div>
          </section>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default Events