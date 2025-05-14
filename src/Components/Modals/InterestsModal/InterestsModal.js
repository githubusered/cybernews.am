import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../../redux/auth/authSlice';

import './InterestsModal.css';


const InterestsModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  
  const token = useSelector((state) => state.auth.token);
  const [selectedInterests, setSelectedInterests] = useState(user.interests?.split(',') || []);
  const [error, setError] = useState('');

  const interestOptions = ['Cybersecurity', 'AI', 'IT', 'Tech', 'ECommerce','Government','Others'];

  const handleSelect = (interest) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(prev => prev.filter(item => item !== interest));
    } else {
      setSelectedInterests(prev => [...prev, interest]);
    }
  };

  const handleSubmit = async () => {
    if (selectedInterests.length === 0) {
      setError("Please select at least one subject.");
      return;
    }

    try {
      await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}api/users/${user.id}`,
        { interests: selectedInterests.join(',') },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );

      dispatch(setUser({ user: { ...user, interests: selectedInterests.join(',') }, token }));
      onClose(); // Close the modal
    } catch (err) {
      setError("Failed to save interests.");
      console.error(err);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2>Select your interests</h2>
        <p>Choose the subjects you're interested in:</p>
        <div className="interests-list">
          {interestOptions.map((interest) => (
            <button
              key={interest}
              className={`interest-button ${selectedInterests.includes(interest) ? 'selected' : ''}`}
              onClick={() => handleSelect(interest)}
            >
              {interest}
            </button>
          ))}
        </div>
        {error && <p className="error">{error}</p>}
        <button className="submit-btn" onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default InterestsModal;
