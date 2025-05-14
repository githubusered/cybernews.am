import React from 'react'

import usaFlag from '../../../assets/images/🦆 icon _United States_.png';
import armFlag from '../../../assets/images/🦆 icon _Armenia_.png';
import { useTranslation } from 'react-i18next';


const LanguagesDropdown = ({setLanguageOpen }) => {

    const {i18n} = useTranslation("news");
  
  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
      setLanguageOpen(false);
  };

  return (
    <div className='languages' style={{left: i18n.language === 'hy' ? '-9px' : ''}}>
        <div className='languagesIcon' onClick={()=> changeLanguage("hy")}><img src={armFlag} alt="Armenian flag" /></div>
        <div className='languagesIcon' onClick={()=> changeLanguage("en")}><img src={usaFlag} alt="USA flag" /></div>
    </div>
  )
}

export default LanguagesDropdown
