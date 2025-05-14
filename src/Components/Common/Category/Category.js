import React from 'react'
import './Category.css';

const Category = ({value}) => {
  return (
    <div className='category'>
      <span>{value}</span>
    </div>
  )
}

export default Category
