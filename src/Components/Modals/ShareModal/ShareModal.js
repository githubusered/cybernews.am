// Components/Common/Modals/ShareModal.jsx
import React from 'react';
import './ShareModal.css';

const ShareModal = ({ isOpen, onClose, newsUrl }) => {
  if (!isOpen) return null;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(newsUrl);
    alert('Link copied to clipboard!');
  };

  return (
    <div className="modalOverlay">
      <div className="shareModal">
        <button className="closeBtn" onClick={onClose}>×</button>
        <h2>Share This News</h2>
        <input type="text" value={newsUrl} readOnly />
        <button onClick={copyToClipboard}>Copy Link</button>
        <div className="socialShare">
          <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(newsUrl)}`} target="_blank" rel="noreferrer">Facebook</a>
          <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(newsUrl)}`} target="_blank" rel="noreferrer">Twitter</a>
          <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(newsUrl)}`} target="_blank" rel="noreferrer">LinkedIn</a>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
