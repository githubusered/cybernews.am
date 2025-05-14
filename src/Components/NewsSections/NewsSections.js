import React from 'react'
import './NewsSections.css';
import SectionTitle from '../Common/SectionTitle/SectionTitle';
import { useTranslation } from 'react-i18next';
import it_img from '../../assets/images/sections/it.svg'
import ai_img from '../../assets/images/sections/ai.svg'
import government_img from '../../assets/images/sections/government.svg'
import cybersecurity_img from '../../assets/images/sections/cybersecurity.svg'
import others_img from '../../assets/images/sections/others.svg'
import eCommerce_img from '../../assets/images/sections/eCommerce.svg'
import tech_img from '../../assets/images/sections/tech.svg'
import { Link } from 'react-router';

const NewsSections = () => {
  const {t} = useTranslation('common')
  
  return (
    <section className='newsSection'>
        <SectionTitle  value='News Sections'/>
        <div className="container">
            <div className="newsSectionAll">
              <div className='newsSectionAllColumns rowGap'>
                <Link to='/news/it' className='newsSectionAllColumn newsSectionAllColumnIT' style={{backgroundImage: `url(${it_img})`}}>
                  <div className='absoluteSectionColumnTitleAndRound'>
                    <div className='roundColor'></div>
                    <p className='absoluteSectionColumnTitle'>{t('it')}</p>
                  </div>
                </Link>
                <Link to='/news/ai' className='newsSectionAllColumn newsSectionAllColumnAI' style={{backgroundImage: `url(${ai_img})`}}>
                  <div className='absoluteSectionColumnTitleAndRound'>
                    <div className='roundColor'></div>
                    <p className='absoluteSectionColumnTitle'>{t('ai')}</p>
                  </div>
                </Link>
              </div>
              <div className='newsSectionAllColumns'>
                <Link to='/news/government' className='newsSectionAllColumn newsSectionAllColumnGovernment' style={{backgroundImage: `url(${government_img})`}}>
                  <div className='absoluteSectionColumnTitleAndRound'>
                    <div className='roundColor'></div>
                    <p className='absoluteSectionColumnTitle'>{t('government')}</p>
                  </div>
                </Link>
                <Link to='/news/cybersecurity' className='newsSectionAllColumn newsSectionAllColumnCybersecurity' style={{backgroundImage: `url(${cybersecurity_img})`}}>
                <div className='absoluteSectionColumnTitleAndRound'>
                  <div className='roundColor'></div>
                    <p className='absoluteSectionColumnTitle'>{t('cybersecurity')}</p>
                  </div>
                </Link>
                <Link to='/news/others' className='newsSectionAllColumn newsSectionAllColumnOthers' style={{backgroundImage: `url(${others_img})`}}>
                <div className='absoluteSectionColumnTitleAndRound'>
                  <div className='roundColor'></div>
                    <p className='absoluteSectionColumnTitle'>{t('others')}</p>
                  </div>
                </Link>
              </div>
              <div className='newsSectionAllColumns rowGap'>
                <Link to='/news/ecommerce' className='newsSectionAllColumn newsSectionAllColumnECommerce' style={{backgroundImage: `url(${eCommerce_img})`}}>
                  <div className='absoluteSectionColumnTitleAndRound'>
                    <div className='roundColor'></div>
                    <p className='absoluteSectionColumnTitle'>{t('ecommerce')}</p>
                  </div>
                </Link>
                <Link to='/news/tech' className='newsSectionAllColumn newsSectionAllColumnTech' style={{backgroundImage: `url(${tech_img})`}}>
                <div className='absoluteSectionColumnTitleAndRound'>
                  <div className='roundColor'></div>
                    <p className='absoluteSectionColumnTitle'>{t('tech')}</p>
                  </div>
                </Link>
              </div>
              
            </div>
        </div>
    </section>
  )
}

export default NewsSections