import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const PasswordSetting = ({ onChangePassword , changePasswordLoading}) => {
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const {t: tA} = useTranslation('auth');
  const {t: tC} = useTranslation('common');

  const handleChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (passwordData.newPassword === passwordData.confirmPassword) {
      onChangePassword(passwordData);
    } else {
      alert("New passwords don't match.");
    }
  };

  return (
    <form className="profileSetting passwordSetting" onSubmit={handleSubmit}>
      <h3>{tA('passwordSettings')}</h3>
      <input type="password" name="currentPassword" value={passwordData.currentPassword} onChange={handleChange} placeholder={`${tA('currentPassword')}`} />
      <input type="password" name="newPassword" value={passwordData.newPassword} onChange={handleChange} placeholder={`${tA('newPassword')}`} />
      <input type="password" name="confirmPassword" value={passwordData.confirmPassword} onChange={handleChange} placeholder={`${tA('confirmNewPassword')}`} />
      <button type="submit" disabled={changePasswordLoading}>{changePasswordLoading ? `${tC('changing')}` : `${tC('changePassword')}` }</button>
    </form>
  );
};

export default PasswordSetting;
