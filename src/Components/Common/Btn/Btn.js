import React from 'react'
import './Btn.css';


const Btn = ({btnValue, className='', onClick, style}) => {
  return (
    <button className={`btnReusable ${className}`} onClick={onClick} style={style}> 
      {btnValue}
    </button>
  )
}

export default Btn
