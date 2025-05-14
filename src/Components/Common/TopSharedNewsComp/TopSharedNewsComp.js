import { faShare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'
import './TopSharedNewsComp.css'
import { getShortText } from '../../../assets/utils/HelpUtils'

const TopSharedNewsComp = ({news,index}) => {
  // const topSharedNews = {
  //   bodyText: 'Cyber Warfare Alert: Major Corporations Rally Behind AI-PoweredDefense Network to Combat Rising Cyber Threats',
  //   sharesQnt: '1,538',
  // }
  return (
    <Link className="topSharedNews" to={`/news/${news.category}/${news.slug}`}>
       <div className="topSharedNewsLeft">
          <div>{index+1}</div>
      </div>
      <div className="topSharedNewsRight">
        <div className="topSharedNewsRightBodyText">
            {getShortText(news.bodyText)}
        </div>
        <div className="topSharedNewsRightShares">
            <FontAwesomeIcon icon={faShare} className='topSharedNewsRightSharesIcon'/>
            <p>{news.shareCount} <span> Shares</span></p>
        </div>
     </div>         
    </Link>
  )
}

export default TopSharedNewsComp