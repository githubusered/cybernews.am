import React from 'react'
import { faArrowRightFromBracket, faBell, faHeart, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {useTranslation} from 'react-i18next'
import { useDispatch } from 'react-redux'
import { clearUser } from '../../../redux/auth/authSlice'
import { Link, useLocation } from 'react-router-dom'

const UserSettings = ({isDropDown, className}) => {
    const {t} = useTranslation("auth");
    const location = useLocation();

    const dispatch = useDispatch();
    const handleLogOut = () => {
        dispatch(clearUser());
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
    }

    const isActive = (path) => location.pathname === path;

  return (
    <div className={`userSettings ${isDropDown ? 'dropdown' :''} ${className}`}>
            <Link className={`userSetting ${isActive("/editprofile") ? 'active' : ''}`} to="/editprofile">
                <FontAwesomeIcon icon={faPenToSquare}  className='userSettingIcon'/>
                <span>{t('editProfile')}</span>
            </Link>
            <Link className={`userSetting ${isActive("/likehistory") ? 'active' : ''}`} to='/likehistory'>
                <FontAwesomeIcon icon={faHeart} className='userSettingIcon'/>
                <span>{t('likeHistory')}</span>
            </Link>
            <Link className={`userSetting ${isActive("/notifications") ? 'active' : ''}`} to='/notifications'>
                <FontAwesomeIcon icon={faBell} className='userSettingIcon'/>
                <span>{t('notifications')}</span>
            </Link>
            <div onClick={handleLogOut} className='userSetting'> 
                <FontAwesomeIcon icon={faArrowRightFromBracket} className='userSettingIcon'/>
                <span>{t('logout')}</span>
            </div>
        </div>
  )
}

export default UserSettings