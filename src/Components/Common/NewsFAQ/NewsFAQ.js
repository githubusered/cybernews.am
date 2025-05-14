import React from 'react'
import './NewsFAQ.css';
import { useState } from 'react';
import SectionTitle from '../SectionTitle/SectionTitle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
const faqs = [
    {
      question: "How often do you publish news updates?",
      answer:
        "We publish updates daily, covering the most recent events across technology, business, and global affairs.",
    },
    {
      question: "Can I submit a story or press release?",
      answer:
        "Yes! We welcome submissions. Please email your story tips or press releases to news@yourwebsite.com.",
    },
    {
      question: "Do you offer a newsletter?",
      answer:
        "Absolutely! You can subscribe to our newsletter to receive weekly summaries of top news and trending topics.",
    },
    {
      question: "Is your content free to access?",
      answer:
        "Most of our content is free. However, some premium investigative reports may require a subscription.",
    },
    {
      question: "How can I advertise on your website?",
      answer:
        "Visit our 'Advertise With Us' section or email advertise@yourwebsite.com for pricing and opportunities.",
    },
    {
      question: "Do you have a mobile app?",
      answer:
        "We’re working on it! Meanwhile, our website is fully responsive and optimized for mobile devices.",
    },
  ];

const NewsFAQ = () => {
      const [openIndex, setOpenIndex] = useState(null);
      
      const toggle = (index) => {
        setOpenIndex(index === openIndex ? null : index)
      }

    return (
        <>
        <SectionTitle value='Frequently Asked Questions'/>
        <div className="faqWrapper">
            <div className="faqContainer">
                {faqs.map((item, index) => (
                <div key={index} className="faqItem">
                    <button className="faqQuestion" onClick={() => toggle(index)}>
                    {item.question}
                    <span>{openIndex === index ? "−" : <FontAwesomeIcon icon={faArrowDown}/>}</span>
                    </button>
                    {openIndex === index && (
                    <div className="faqAnswer">{item.answer}</div>
                    )}
                </div>
                ))}
            </div>
        </div>
        </>
  )
}

export default NewsFAQ