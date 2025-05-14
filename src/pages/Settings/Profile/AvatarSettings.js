import React, { useState } from 'react';
import noAvatar from '../../../assets/images/noAvatar.png';
import { useTranslation } from 'react-i18next';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const AvatarSetting = ({ userAvatar, onUpload, onDelete, uploadLoading, deleteLoading}) => {
  const [avatar, setAvatar] = useState(null);

  const {t}= useTranslation('common');

  const handleFileChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  const handleUpload = () => {
    if (avatar) {
      onUpload(avatar);
    }
  };
  
  return (
    <div className="profileSetting avatarSetting">
      <h3>{t('avatar')}</h3>
      {userAvatar?.url ? (
        <div className="avatarPreview">
          <img src={`${backendUrl}${userAvatar?.url?.slice(1)}`} alt={userAvatar?.alternativeText ? userAvatar?.alternativeText : 'avatar'} className='avatarImg'/>
          <button type="button" onClick={onDelete} disabled={deleteLoading}>{deleteLoading ? `${t('deleting')}` : `${t('deleteAvatar')}`}</button>
        </div>
      ) : (
        <>
          <img src={`${noAvatar}`} alt={userAvatar?.alternativeText ? userAvatar?.alternativeText : 'user avatar'} className='avatarImg'/>
          <p>No Avatar Uploaded</p>
        </>
      )}
      <input type="file" onChange={handleFileChange} />
      <button type="button" onClick={handleUpload} disabled={uploadLoading}>{uploadLoading ? `${t('uploading')}` : `${t('uploadAvatar')}`}</button>
    </div>
  );
};

export default AvatarSetting;
