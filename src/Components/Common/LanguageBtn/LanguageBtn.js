import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' 
import { faGlobe } from '@fortawesome/free-solid-svg-icons'

import './LanguageBtn.css';
import LanguagesDropdown from './LanguagesDropdown';

const LanguageBtn = (props) => {
  const [languageOpen, setLanguageOpen] = useState(false);

  const toggleLanguage = () => {
    setLanguageOpen((prev) => !prev)
  }
  if(props.variant=== 'static'){
    return (
      <div className='language'>
        <FontAwesomeIcon  icon={faGlobe} className='languageGlobe' style={languageOpen ? {color: "#44E790", transition: "1s"} : ''} onClick={toggleLanguage}/>
        {languageOpen && <LanguagesDropdown setLanguageOpen={setLanguageOpen}/>}
      </div>
    )
  }else if(props.variant==='absolute'){
    return (
      <div className='language languageAbs'>
        <FontAwesomeIcon  icon={faGlobe} className='languageGlobe' style={languageOpen ? {color: "#44E790", transition: "1s"} : ''} onClick={toggleLanguage}/>
        {languageOpen && <LanguagesDropdown setLanguageOpen={setLanguageOpen}/>}
      </div>
    )
  }
}

export default LanguageBtn
