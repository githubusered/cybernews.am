import React, { useState } from 'react'
import {NavLink} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' 

import './Nav.css'
import { faBars, faBitcoinSign, 
  // faSearch 
} from '@fortawesome/free-solid-svg-icons'
import SignInBtn from '../Common/SignInUpBtn/SignInBtn';
import LanguageBtn from '../Common/LanguageBtn/LanguageBtn'
import LightDarkMode from '../Common/LightDarkMode/LightDarkMode'
import cyberNewsLogo from '../../assets/images/CyberNews Logo.svg';
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import UserMenu from '../Common/UserMenu/UserMenu'
import Search from '../Common/Search/Search'

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const {t, i18n} = useTranslation("news");


  const isAuthenticated = useSelector((state)=> state.auth.isAuthenticated);


  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  }

  return (
    <nav className='navbar'>
      <div className="container">
      <div className='navbarTop'>
        <div className='iconAndSearch'>
          <div className='logo'>
            <img src={cyberNewsLogo} alt="cybernewsLogo"/>
          </div>
          <Search type='newses'
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            searchResults={searchResults}
            setSearchResults={setSearchResults}
          />
        </div>
        <div className='btcLightModeLanguageLoginSignUp'>
          <div className='btc'>
            <FontAwesomeIcon  icon={faBitcoinSign} className='btcIcon'/>
            <span>103,516.30 $</span>
          </div>
          <LightDarkMode />
          <LanguageBtn  variant='static' />
          {!isAuthenticated && <SignInBtn  variant='static'/>}
          {isAuthenticated && <UserMenu className='dispNoneWhenMaxWidth768'/>}
          <div className='hamburgerMenu' onClick={toggleMenu}>
            <FontAwesomeIcon  icon={faBars} className='hamburgerMenuIcon'/>
          </div>
          {menuOpen && <div className="absoluteMenu" style={{left: i18n.language === 'hy' ? "-410%" : ''} }>
            <div className='btc'>
              <FontAwesomeIcon  icon={faBitcoinSign} className='btcIcon'/>
              <span>103,516.30 $</span>
            </div>
            <div className='absoluteIcons'>
              <LanguageBtn variant='absolute'/>
              <LightDarkMode />
            </div>
            {!isAuthenticated && <SignInBtn  variant='absolute'/>}
            {isAuthenticated && <UserMenu />}
          </div>}
        </div>
      </div>
      <div className='navbarBottom'>
        <div className='menu'>
          <NavLink className='menuItem' to='/'>{t('home')}</NavLink>
          <NavLink className='menuItem'to='/news'>{t('news')}</NavLink>
          {/* <NavLink className='menuItem' to='/blog'>{t('blog')}</NavLink> */}
          {/* <NavLink className='menuItem cyberlaws' to='/cyberlaws'>Cyberlaws</NavLink> */}
          <NavLink className='menuItem' to='/events'>{t('events')}</NavLink>
          {/* <NavLink className='menuItem cronicles' to='/cronicles'>Cronicles</NavLink> */}
          <NavLink className='menuItem' to='/about'>{t('aboutUs')}</NavLink>
        </div>
      </div>
      </div>
    </nav>
  )
}

export default Nav
