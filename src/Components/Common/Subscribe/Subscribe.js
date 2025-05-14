import React from 'react'
import Btn from '../Btn/Btn';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEnvelope} from '@fortawesome/free-solid-svg-icons'
import './Subscribe.css';

const Subscribe = () => {
  return (
    <div className='subscribe'>
        <p className='subscribeTitle'><FontAwesomeIcon icon={faEnvelope} className='subscribeIcon'/> Stay Updated</p>
        <p className='subscribeText'>Get the latest events and offers straight to your inbox.</p>
        <input type="text" placeholder='Enter your email address'/>
        <Btn btnValue="Subscribe" className='subBtn'/>
    </div>
  )
}

export default Subscribe