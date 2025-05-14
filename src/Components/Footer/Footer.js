import React from 'react'
import './Footer.css';
import cyberNewsLogo from '../../assets/images/CyberNews Logo.svg';
import instaImg from '../../assets/images/insta icon.svg';
import facebookImg from '../../assets/images/fb icon.svg';
import linkdinImg from '../../assets/images/linkedin icon.svg';
import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';

const Footer = () => {
    const {t: tA} = useTranslation('news');
    const {t: tC} = useTranslation('common');

  return (
    <footer>
        <div className="footerContainer">
            <div className='footerColumns logoAndSocIcons'>
                <img src={cyberNewsLogo} alt="logo" className='websiteLogo'/>
                <div className="footerSocialIcons">
                    <img src={instaImg} alt="Instagram"  className='footerSocialIcon'/>
                    <img src={facebookImg} alt="Facebook" className='footerSocialIcon' />
                    <img src={linkdinImg} alt="LinkedIn"  className='footerSocialIcon'/>
                </div>
            </div>
            <div className='footerColumns categoriesAndTitle'>
                <h2>{tC('categories')}</h2>
                <div className="categories">
                    <Link className='footerColumn' to='/news'>{tA('news')}</Link>
                    <Link className='footerColumn' to='/blog'>{tA('blog')}</Link>
                    {/* <Link className='footerColumn'>Cyberlaws</Link> */}
                    <Link className='footerColumn' to='/events'>{tA('events')}</Link>
                    <Link className='footerColumn' to='/resources'>{tA('resources')}</Link>
                    {/* <Link className='footerColumn'>Chronicles</Link> */}
                </div>
            </div>
            <div className='footerColumns takeALookAtAll'>
                <h2>{tC('takeALookTitle')}</h2>
                <div className='takeALookAt'>
                    <div className="takeALookAtLeft">
                        <Link to='/news/ai' className='footerColumn'>{tC('ai')}</Link>
                        <Link to='/news/cybersecurity' className='footerColumn'>{tC('cybersecurity')}</Link>
                        <Link to='/news/it' className='footerColumn'>{tC('it')}</Link>
                        <Link to='/news/tech' className='footerColumn'>{tC('tech')}</Link>
                        <Link to='/resources/podcasts' className='footerColumn'>{tC('podcasts')}</Link>
                        <Link to='/resources/tutorials' className='footerColumn'>{tC('tutorials')}</Link>
                        <Link to='/resources/books' className='footerColumn'>{tC('books')}</Link>
                    </div>
                    <div className="takeALookAtRight">
                        <Link to='/news/government' className='footerColumn'>{tC('government')}</Link>
                        <Link to='/news/ecommerce' className='footerColumn'>{tC('ecommerce')}</Link>
                        <Link to='/news/others' className='footerColumn'>{tC('others')}</Link>
                        <Link to='/sitemap.xml' className='footerColumn'>{tC('sitemap')}</Link>
                        {/* <p className='footerColumn'>History</p> */}
                        {/* <p className='footerColumn'>Holidays</p> */}
                        {/* <p className='footerColumn'>Events</p> */}
                    </div>
                </div>
            </div>
            <div className='footerColumns engages'>
                <h2>{tC('engageTitle')}</h2>
                <div className="engage">
                    <Link to='/about' className='footerColumn'>{tA('aboutUs')}</Link>
                    <p className='footerColumn'>{tC('bugReport')}</p>
                    <p className='footerColumn'>{tC('sponsores')}</p>
                    <Link to='/about' className='footerColumn'>{tC('contactUs')}</Link>
                    <Link to='/about' className='footerColumn'>{tC("faqs")}</Link>
                    <p className='footerColumn'>{tC('helpSupport')}</p>
                    <p className='footerColumn'>{tC('cyberwiki')}</p>
                </div>
            </div>
        </div>
    </footer>
  )
}

export default Footer