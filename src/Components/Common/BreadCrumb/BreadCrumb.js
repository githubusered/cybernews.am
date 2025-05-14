import React from 'react'
import './BreadCrumb.css';
import { Link, useLocation } from 'react-router';


const BreadCrumb = () => {
  const location = useLocation();
  
  const pathnames = location.pathname.split('/').filter((x)=> x);
    return (
        <nav className="breadCrumb">
            <Link to='/'>Home</Link>
            {
                pathnames.map((segment, i) => {
                    const pathTo = `/${pathnames.slice(0, i+1).join('/')}`;
                    const isLast = i === pathnames.length - 1;
                    const label = decodeURIComponent(segment).replace(/-/g, ' ')
                    
                    return isLast ? (
                        <span key={i} className='breadCrumbCurrent'>
                            {` / ${label?.split(' ').slice(0, 2).join(' ')}${label?.split(' ').length > 2 ? '...' : ''}`}
                        </span>
                    ) : (
                        <span key={i}>
                            {' / '}
                            <Link to={pathTo} style={{textTransform: 'capitalize'}}>{label}</Link>
                        </span>
                    )
                })
            }
        </nav>
  )
}

export default BreadCrumb