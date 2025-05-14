import React, { useEffect, useState } from 'react'
import './LightDarkMode.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

const LightDarkMode = () => {
  const [isDark, setIsDark] = useState(
    localStorage.getItem('theme') === 'dark'
  );

  useEffect(() => {
    if(isDark) {
      document.body.classList.add('dark');
      localStorage.setItem('theme','dark')
    }else{
      document.body.classList.remove('dark');
      localStorage.setItem('theme','light')
    }
  }, [isDark])
  
  return (
    <div className='lightMode' onClick={() => setIsDark(!isDark)}>
        <FontAwesomeIcon  icon={isDark ? faSun : faMoon} className='lightModeIcon'/>
    </div>
  )
}

export default LightDarkMode
