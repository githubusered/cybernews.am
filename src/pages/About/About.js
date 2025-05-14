import React, { useState } from 'react'
import './About.css';
import SectionTitle from '../../Components/Common/SectionTitle/SectionTitle';
import ourMissionImg from '../../assets/images/ourMission.png';
import contactUsImg from '../../assets/images/contactUs.png';
import Subscribe from '../../Components/Common/Subscribe/Subscribe';
import Footer from '../../Components/Footer/Footer';
import NewsFAQ from '../../Components/Common/NewsFAQ/NewsFAQ';
import Nav from '../../Components/Nav/Nav';
const stories = [
  { year: '2024', text: 'Establish a strong IT news presence by launching our website, social channels, and delivering expert insights on cybersecurity and emerging tech'},
  { year: '2025', text: 'Expanded team' }, 
  { year: '2026', text: 'Launched beta' }, 
  { year: '2027', text: 'Reached goals' }, 
];

const About = () => {
    const [activeIndex, setActiveIndex] = useState(1);
   

    return (
      <>
      <Nav/>
    <section className='about'>
            <div className="ourMission">
                <SectionTitle value='Our Mission'/>
                <div className="container">
                    <img src={ourMissionImg} alt="Our Mission" />
                    <p>Our mission is to empower IT professionals and tech enthusiasts by delivering accurate, timely, and insightful news on cybersecurity, emerging technologies, and industry trends. 
                    We strive to be the go-to source for reliable information, helping our readers stay ahead in the fast-evolving world of technology.</p>
                </div>
            </div>
            <div className="ourStory">
                <SectionTitle value='Our Story'/>
                <div className="container">
                    <div className="ourStories">
                       <div className="ourStoriesTop">
                            <span>{stories[activeIndex].year}</span>
                            <p>{stories[activeIndex].text}</p>
                       </div>
                       <div className="ourStoriesBottom">
                       {stories.map((story, index) => (
                          <div
                            key={index}
                            className={`bulletWrapper ${index <= activeIndex ? 'active' : ''}`}
                            onClick={() => setActiveIndex(index)}
                            >
                            <span className="bulletYear">{story.year}</span>
                            <div className="bullet" />
                          </div>
                      ))}
                       </div>
                    </div>
                </div>
            </div>
            <div className="contactUs">
              <SectionTitle value='Contact Us'/>
              <div className="container">
                <img src={contactUsImg} alt="Contact Us" />
                <div className="contacts">
                    <p>We’d love to hear from you! Whether you have a question, feedback, or a story tip, feel free to get in touch with us. At CYBERNEWS, we value your input and are always eager to engage with our readers.</p>
                    <p>General InquiriesFor general questions, comments, or suggestions, please reach out to us at:Email:<a href='mailto:edmon.parsamyan3@gmail.com'>edmon.parsamyan3@gmail.com</a> </p>
                    <p>Advertise With UsInterested in advertising or collaboration opportunities? Contact our advertising department at:Email:<a href='mailto:edmon.parsamyan3@gmail.com'>edmon.parsamyan3@gmail.com</a></p>
                </div>
              </div>
              <div className="container">
                <Subscribe />
              </div>
            </div>
            <div className="whyChooseUs">
              <SectionTitle value='Why Choose Us' />
              <div className="container">
                <ul className="chooseUsList">
                  <li> 24/7 Monitoring and Real Human Support</li>
                  <li> Client-Centric and Customizable Approach</li>
                  <li> No Annoying Ads or Sales Gimmicks</li>
                  <li> Quick, Effective Responses—No Delays</li>
                  <li> Proven Expertise in News and Tech</li>
                  <li> No Fear-Mongering or Pressure Tactics</li>
                </ul>
              </div>
            </div>
            <div className="faqS">
              <NewsFAQ />
            </div>
            <Footer />
    </section>
    </>
  )
}

export default About