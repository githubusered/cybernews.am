import React, { useState } from 'react'
import { faEnvelope, faLink } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Btn from '../Btn/Btn'
import './Notification.css';
import { timeAgo } from '../../../assets/utils/HelpUtils';
import { Link } from 'react-router-dom';
import ShareModal from '../../Modals/ShareModal/ShareModal';
import { useTranslation } from 'react-i18next';

const Notification = ({note={}}) => {
    const [isShareOpen, setIsShareOpen]= useState(false);
    const { t } = useTranslation();

    // const notification = {
    //     title: 'New News Post',
    //     subNote1: 'Success! News is live.',
    //     news: {
    //         title: 'Apple Warns Armenian Journalist About Possible Hacking',
    //         slug: "apple-warns-armenian-journalist-about-possible-hacking",
    //         category: "Cybersecurity",
    //     },
    //     isRead: false,
    //     subNote2: 'has been successfully published! Readers can now enjoy the content.',
    //     subNote3: 'Share it now to reach more people!',
    //     publishedAt: '2025-04-17T22:13:38.115Z',
    // }

  return (
    <div className='notificationItem'>
        <div className="notificationLeft">
            <FontAwesomeIcon icon={faEnvelope} className='notificationLeft'/>
        </div>
        <div className="notificationRight">
            <h3>{note.title}</h3>
            <p>{note.subNote1}</p>
            <p>
                <span> {note.news.title} </span>
                {note.subNote2}
            </p>
            <p>{note.subNote3}</p>
            <p className='publishedTime'>{timeAgo(note.publishedAt, t)}</p>
            <div className='notificationIcons'>
                <FontAwesomeIcon icon={faLink} className='linkIcon'/>
                <Link to={`/news/${note.news.category}/${note.news.slug}`}>
                    <Btn btnValue={t('viewNews')}/>
                </Link>
                <Btn btnValue={t('share')} onClick={() => setIsShareOpen(true)} />
                <ShareModal isOpen={isShareOpen}
                    onClose={() => setIsShareOpen(false)}
                    newsUrl={`http://localhost:3000/news/${note.news.category}/${note.news.slug}`}
                />
            </div>
        </div>
        {note.isRead ? null: <div className='absoluteRoundIsRead'></div> }
    </div>
  )
}

export default Notification