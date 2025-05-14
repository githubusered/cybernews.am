import React from 'react'
import './Resources.css';
import SectionTitle from '../Common/SectionTitle/SectionTitle';

import books from '../../assets/images/books.svg';
import tutorials from '../../assets/images/tutorials.svg';
import podcasts from '../../assets/images/podcasts.svg';
import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';

const Resources = () => {
    const {t} = useTranslation('resources')
  return (
    <section className='resources'>
        <SectionTitle value='Resources' />
        <div className="container">
            <Link to='/resources/books' className='resourcesColumn columnForBooks' style={{backgroundImage: `url(${books})`}}>
                <div className='columnRoundAndTitle'>
                    <div className='columnRound'></div>
                    <p>{t('books')}</p>
                </div>
            </Link>
            <Link to='/resources/tutorials' className='resourcesColumn columnForTutorials' style={{backgroundImage: `url(${tutorials})`}}>
                <div className='columnRoundAndTitle'>
                    <div className='columnRound'></div>
                    <p>{t('tutorials')}</p>
                </div>
            </Link>
            <Link to='/resources/podcasts' className='resourcesColumn columnForPodcasts' style={{backgroundImage: `url(${podcasts})`}}>
                <div className='columnRoundAndTitle'>
                    <div className='columnRound'></div>
                    <p>{t('podcasts')}</p>
                </div>
            </Link>
        </div>
    </section>
  )
}

export default Resources