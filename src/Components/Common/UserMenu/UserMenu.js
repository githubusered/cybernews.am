import React, { useEffect, useState } from 'react'
import './UserMenu.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import UserSettings from './UserSettings';
import { useSelector } from 'react-redux';
import noAvatar from '../../../assets/images/noAvatar.png'
import userData from '../../../data/users.json'
import Loading from '../Loading/Loading';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const UserMenu = ({className}) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [fetchedUser,setFetchedUser] = useState(null);
    const [loading,setLoading] = useState(false);

    const user = useSelector((state)=> state.auth.user);

  useEffect(() => {
    const fetchUserAvatar = async () => {
      try {
        const res = await fetch(`${backendUrl}api/users?filters[email][$eq]=${user.email}&populate=*`); 
        const data = await res.json()
        setFetchedUser(data[0]);
      } catch (error) {
        console.log(error);
        const fallbackUser = userData.find(u => u.email === user.email);
        setFetchedUser(fallbackUser || null);
      }finally{
        setLoading(false);
      }
    }
    if(user?.email){
      fetchUserAvatar()
    }
  },[user])
  if(loading)  return <Loading />
  
  return (
    <div className={`userMenu ${className ? className :''}`} >
        <div onClick={()=> setMenuOpen((prev)=>!prev)} className='userProfile'>
            {user && fetchedUser?.avatar?.url ? (
              <div className='profilePhoto' style={{backgroundImage: `url(${backendUrl+fetchedUser?.avatar?.url.slice(1)})`}}></div> 
            ) : (
              <div className='profilePhoto' style={{backgroundImage: `url(${noAvatar})`}}></div>
            )}
            <p className='profileUsername'>{fetchedUser?.profile?.firstname +" "+ fetchedUser?.profile?.lastname}</p>
            <FontAwesomeIcon icon={menuOpen ? faArrowUp : faArrowDown}  className='profileDropDown'/>
        </div>
        {menuOpen && <UserSettings isDropDown/>}
    </div>
  )
}

export default UserMenu