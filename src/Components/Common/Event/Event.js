import React from 'react'
import Btn from '../Btn/Btn'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChalkboardUser, faLaptopCode, faLocationDot, faPeopleGroup, faScrewdriverWrench, faStar } from '@fortawesome/free-solid-svg-icons'
import './Event.css';
import { useTranslation } from 'react-i18next';

const Event = ({event}) => {
const categoryIconMap = {
  'Conference': faPeopleGroup,
  'Workshop': faScrewdriverWrench,
  'Hackathon': faLaptopCode,
  'Seminar/Webinar': faChalkboardUser,
};
const categoryIcon = categoryIconMap[event?.category] || faStar;
  const {t}= useTranslation('common');

  return (
    <>
    <div className="event">
        <div className='eventImageAndTitle'>
            <img src={event.img} alt={event.publisherImgAlt} />
            <div className="eventTitleAndPublisher">
              <p className='eventPublisher'>{event.publisher}</p>
              <p className='eventTitle'>{event.title}</p>
              <p className='eventRating'><FontAwesomeIcon icon={faStar} /> {event.rating}</p>
            </div>
        </div>
        <div className='eventLocation'> <FontAwesomeIcon icon={faLocationDot} />{event.location}</div>
        <div className='eventCategory'> {categoryIcon && <FontAwesomeIcon icon={categoryIcon}/>} {event.category}</div>
        <div className='eventInfo'>
          <div className="eventDate">
            <p className='eventInfoPgf'>{event.date.split(' ').slice(0, 2).join(' ')}</p>
            <span>{t('date')}</span>
          </div>
          <div className="eventHour">
            <p className='eventInfoPgf'>{event.hour.split(' ').slice(0, 1).join(' ')}</p>
            <span>{t('hour')}</span>
          </div>
          <div className="eventIsPaid">
            <p  className='eventInfoPgf'>{event.isPaid ? t('paid') : t('free')}</p>
            <span>{t('price')}</span>
          </div>
        </div>
        <Btn btnValue={t('attend')} style={{width:'100%'}}/>
    </div>
    </>
  )
}

export default Event