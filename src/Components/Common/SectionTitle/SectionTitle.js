import React from 'react'
import './SectionTitle.css';

const SectionTitle = ({value}) => {
  return (
    <div className='sectionTitle'>
      <div className='line'></div>
      <p>{value}</p>
      <div className='line'></div>
    </div>
  )
}

export default SectionTitle
