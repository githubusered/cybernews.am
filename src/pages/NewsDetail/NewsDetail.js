import React, { useEffect, useState }  from 'react'
import './NewsDetail.css';
import NoMatch from '../NoMatch/NoMatch';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import BreadCrumb from '../../Components/Common/BreadCrumb/BreadCrumb';
import Nav  from '../../Components/Nav/Nav';
import Footer  from '../../Components/Footer/Footer';
import FormattedDate from '../../Components/Common/FormattedDate/FormattedDate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import Loading from '../../Components/Common/Loading/Loading';
import { useTranslation } from 'react-i18next';
import fallBackNewsEn from '../../data/fetchByInterests.en.json';
import fallBackNewsHy from '../../data/fetchByInterests.hy.json';
    import nkar1_8e8a9484e6 from '../../assets/images/newsImagesFallBack/nkar1_8e8a9484e6.png';
    import Astghik_4ecb589edb from '../../assets/images/newsImagesFallBack/Astghik_4ecb589edb.png';
    import wifi_Vulners_78823037dc from '../../assets/images/newsImagesFallBack/wifi_Vulners_78823037dc.png';
    import i_OS_15_interface_highlighting_new_privacy_features_7ebbbc8c73 from '../../assets/images/newsImagesFallBack/i_OS_15_interface_highlighting_new_privacy_features_7ebbbc8c73.png';
    import mike_lynch_british_tech_trailblazer_dies_at_sea_7245fd2112 from '../../assets/images/newsImagesFallBack/mike_lynch_british_tech_trailblazer_dies_at_sea_7245fd2112.png';      

const allowedCategories = ['tech', 'it', 'ai', 'government','cybersecurity', 'ecommerce', 'others'];
const backendUrl = process.env.REACT_APP_BACKEND_URL;

const NewsDetail = () => {
    const location = useLocation();
    const { state } = location;
    const { category, slug } = useParams();
    
    const { i18n } = useTranslation();
    const [newsInstance, setNewsInstance] = useState(state?.newsInstance || null)
    const [loading, setLoading] = useState(!state?.newsInstance)
    const [isFallBack, setIsFallBack]= useState(false);

    const fallbackImages = {
        "../assets/images/newsImagesFallBack/nkar1_8e8a9484e6.png": nkar1_8e8a9484e6,
        "../assets/images/newsImagesFallBack/Astghik_4ecb589edb.png": Astghik_4ecb589edb,
        "../assets/images/newsImagesFallBack/i_OS_15_interface_highlighting_new_privacy_features_7ebbbc8c73.png": i_OS_15_interface_highlighting_new_privacy_features_7ebbbc8c73,
        "../assets/images/newsImagesFallBack/wifi_Vulners_78823037dc.png": wifi_Vulners_78823037dc,
        "../assets/images/newsImagesFallBack/mike_lynch_british_tech_trailblazer_dies_at_sea_7245fd2112.png": mike_lynch_british_tech_trailblazer_dies_at_sea_7245fd2112
    };
        const getImageUrl = (news) => {
        if (news.img?.startsWith('http')) {
            return news.img;
        } else if (isFallBack && fallbackImages[news.img]) {
            return fallbackImages[news.img];
      } else {
        return backendUrl + news.img;
      }
    };
    useEffect(() => {
        
        if(!newsInstance && i18n.language){
            const fetchNews = async () => {
                try{
                    const res = await axios.get(`${backendUrl}api/newses?filters[slug][$eq]=${slug}&locale=${i18n.language}&populate=image`)
                    const item = res.data.data[0];
                    const formattedData = {
                        id:item.id,
                        img: item.image.url.startsWith('/') ? item.image.url.slice(1) : item.image.url || '',
                        title: item.title || '',
                        bodyText: item.bodyText || '',
                        postedDate: item.postedDate || '',
                        slug: item.slug || '',
                        category: item.category || '',
                        timeToRead: item.timeToRead || '',
                        likeCount: item.likeCount,
                        shareCount: item.shareCount,
                        viewCount: item.viewCount,
                    }

                    setNewsInstance(formattedData);
                    setLoading(false);
                }catch(err){
                    console.log('News Not Found. Trying local fallback.');

                    const fallBackNews = i18n.language === 'hy' ? fallBackNewsHy : fallBackNewsEn;
                    const fallbackItem = fallBackNews.data.find(item => 
                        item.slug?.toLowerCase() === slug?.toLowerCase() && 
                        item.category?.toLowerCase() === category?.toLowerCase()
                    );

                    if (fallbackItem) {
                        const formattedData = {
                            id: fallbackItem.id,
                            img: fallbackItem.image.url.startsWith('/') ? fallbackItem.image.url.slice(1) : fallbackItem.image.url || '',
                            title: fallbackItem.title || '',
                            bodyText: fallbackItem.bodyText || '',
                            postedDate: fallbackItem.postedDate || '',
                            slug: fallbackItem.slug || '',
                            category: fallbackItem.category || '',
                            timeToRead: fallbackItem.timeToRead || '',
                            likeCount: fallbackItem.likeCount,
                            shareCount: fallbackItem.shareCount,
                            viewCount: fallbackItem.viewCount,
                        };
                        setNewsInstance(formattedData);
                        setIsFallBack(true);

                         console.log(newsInstance, isFallBack,fallbackImages );

                    }
                }finally {
                    setLoading(false);
                }
            }
            fetchNews()
        }
    }, [i18n.language, category, slug, newsInstance, isFallBack, fallbackImages])
    useEffect(() => {
        setNewsInstance(null); // force refetch when language changes
    }, [i18n.language]);
    
    if (loading) return <Loading />
    if (!newsInstance) return <div style={{textAlign:'center',fontSize:'44px'}}>Server is answering.</div>
    if (!newsInstance) return <div style={{textAlign:'center',fontSize:'44px'}}>No data found</div>

    const isValidCategory = allowedCategories.includes(newsInstance?.category?.toLowerCase());
    if(!isValidCategory) return <NoMatch />


    return (
    <section className='newsDetails'>
        <div className="container">
            <Nav />
            <BreadCrumb/>
            <h1>{newsInstance.title}</h1>
            <img src={getImageUrl(newsInstance)} alt="newsImage"  className='newsDetailsImg'/>
            <div className="newsDetail">
                <div className="newsDetailLeft">
                    <div className='newsDetailLeftPublishedInfo'>
                        <span>Published on:</span>
                        <FormattedDate date={newsInstance.postedDate} className='newsDetailLeftPublishedInfo'/>
                    </div>
                    <p className='newsDetailLeftCategoryInfo'>Category: {newsInstance.category}</p>
                </div>
                <div className="newsDetailRight">
                    <p className='newsDetailRightReadingTime'>Reading Time: {newsInstance.timeToRead} min read</p>
                    <div className='newsDetailRightViewCount'>
                        <FontAwesomeIcon  icon={faEye} className='viewCountIcon'/>
                        <p>{newsInstance.viewCount}</p>
                    </div>
                </div>
            </div>
            <div className='bodyTextParagraphs'>
                {Array.isArray(newsInstance?.bodyText) && newsInstance.bodyText.map((p, i) => {
                    // Check the type of the element and render accordingly
                    if (p.type === 'paragraph' && Array.isArray(p.children)) {
                        return (
                          <p key={i} className='bodyTextParagraph' style={{ margin: '20px 0' }}>
                            {p.children.map((child, j) =>
                              child.type === 'text' ? <span key={j}>{child.text}</span> : null
                            )}
                          </p>
                        );
                      }
                      return null;
                })}
            </div>

            <Footer />
        </div>
    </section>
  )
}

export default NewsDetail