import React, { useEffect, useState } from 'react'
import Nav from '../../../Components/Nav/Nav';
import UserSettings from '../../../Components/Common/UserMenu/UserSettings';
import './Notifications.css';
import Notification from '../../../Components/Common/Notification/Notification';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import Loading from '../../../Components/Common/Loading/Loading';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
 const { t, i18n } = useTranslation("common");
 const locale = i18n.language;

 const noNotification = {
        title: 'No Notifications Yet',
        subNote1: `You're All Caught Up!`,
        news: {
            title: 'Looks like you have no new notifications at the moment. Stay tuned for updates on your favorite blogs, comments, and more!',
            slug: "apple-warns-armenian-journalist-about-possible-hacking",
            category: "Cybersecurity",
        },
        isRead: false,
        subNote2: '',
        subNote3: 'Start exploring new content now!',
        publishedAt: '2025-05-07T22:13:38.115Z',
    }
const translatedNoNotification = {
        title: 'Դեռևս ծանուցումներ չկան',
        subNote1: `Դուք ամբողջովին տեղեկացված եք։`,
        news: {
            title: 'Հայտնվում է, որ այս պահին չունեք նոր ծանուցումներ։ Շարունակեք հետևել ձեր սիրած բլոգներին, մեկնաբանություններին և ավելին։',
            slug: "apple-warns-armenian-journalist-about-possible-hacking",
            category: "Cybersecurity",
        },
        isRead: false,
        subNote2: '',
        subNote3: 'Սկսեք ուսումնասիրել նոր բովանդակություն հենց հիմա։',
        publishedAt: '2025-05-07T22:13:38.115Z',
}

  useEffect(() => {
      const fetchNotifications = async () => {
        try {
          setLoading(true)
            const res = await axios.get(`${backendUrl}api/notifications?locale=${i18n.language}&populate=*`);
            const formattedData = res.data.data.map((item)=> {
                return {
                    id: item.id,
                    title: item.title || '',
                    subNote1: item.subNote1 || '',
                    subNote2: item.subNote2 || '',
                    subNote3: item.subNote3 || '',
                    news: {
                        title: item.news.title || '',
                        slug: item.news.slug || '',
                        category: item.news.category || '',
                    },
                    isRead: item.isRead,
                    publishedAt: item.publishedAt,
                }
            })

            setNotifications(formattedData);
            setLoading(false);
        } catch (error) {
            // setError("Failed to load news");
            console.log('Failed to load news');
        }finally{
            setLoading(false);
        }
      }
      fetchNotifications();
    }, [ i18n.language])


  if(loading) return <Loading />

  return (
    <section className='notifications'>
      <Nav />
      <div className="container">
        <div className='notificationsWrapper'>
          <p>{t('settings')}</p>
          <div className='settings'>
              <UserSettings  className='settingsLeft'/>
              <div className="settingsRight">
                <p>Notifications</p>
                <div className="notificationsSettings">
                  <div className="notificationsSetting">
                    <ul className='notificationsFilter'>
                      <li>{t('all')}</li>
                      <li>{t('unRead')}</li>
                      <li>{t('others')}</li>
                    </ul>
                    {
                      notifications && notifications.length > 0 ? (
                        notifications.map((note) => (
                          <Notification note={note} key={note.id}/>
                        ))
                      ) : (
                        <Notification  note={ locale === 'hy' ? translatedNoNotification : noNotification}/>
                      )
                     
                    }
                
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
      </section>
  )
}

export default Notifications