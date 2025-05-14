import React, { useEffect, useState } from 'react'
import Nav from '../../../Components/Nav/Nav';
import UserSettings from '../../../Components/Common/UserMenu/UserSettings';
import './Profile.css';
import AvatarSetting from './AvatarSettings';
import PersonalInformation from './PersonalInformation';
import PasswordSetting from './PasswordSetting';
import AddressAndAbout from './AddressAndAbout';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../../redux/auth/authSlice';
import { useTranslation } from 'react-i18next';
import userData from '../../../data/users.json';
import noAvatar from '../../../assets/images/noAvatar.png'

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const Profile = () => {
  const [fetchedUser, setFetchedUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [addressLoading, setAddressLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [changePasswordLoading, setChangePasswordLoading] = useState(false);

  const user = useSelector((state)=> state.auth.user);
  const token = useSelector((state)=> state.auth.token);

  const dispatch = useDispatch()

  const {t} = useTranslation('common')

    useEffect(() => {
      const fetchUserAvatar = async () => {
        try {
          const res = await fetch(`${backendUrl}api/users?filters[email][$eq]=${user.email}&populate=*`); 
          const data = await res.json()
          console.log(data[0],'dataaaaaaa');
          
          setFetchedUser(data[0]);
        } catch (error) {
          console.log(error);
          const fallbackUser = userData.find(u => u.email === user.email);
          setFetchedUser(fallbackUser || null);
        }
      }
      if(user?.email){
        fetchUserAvatar()
      }
    },[user])
   
    const handleDeleteAvatar = async () => {
      try {
        setDeleteLoading(true)
        const res = await fetch(`${backendUrl}api/users/${fetchedUser?.id}?populate=*`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            avatar: null,
          }),
        });
  
        if (!res.ok) throw new Error('Failed to delete avatar');
        
        
  
        // Re-fetch user to update UI
        const updatedUser = await res.json();
        setFetchedUser(updatedUser);
      } catch (error) {
        console.error('Error deleting avatar:', error);
      }finally{
        setDeleteLoading(false)
      }
    };

    const handleUploadAvatar = async (file) => {
      try {
        setUploadLoading(true)
        // Create FormData to send the file
        const formData = new FormData();
        formData.append('files', file);  // Append the file to formData
  
        // First, upload the avatar image
        const uploadRes = await fetch(`${backendUrl}api/upload`, {
          method: 'POST',
          body: formData,
        });
  
        if (!uploadRes.ok) throw new Error('Failed to upload avatar');
  
        // Parse the response to get the uploaded file details
        const uploadedFile = await uploadRes.json();
        const avatarFileId = uploadedFile[0].id;
  
        // Update the user's avatar with the uploaded file ID
        const updateRes = await fetch(`${backendUrl}api/users/${fetchedUser?.id}?populate=*`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            avatar: avatarFileId,  // Set the uploaded avatar file ID
          }),
        });
  
        if (!updateRes.ok) throw new Error('Failed to update avatar');
  
        // Re-fetch user to update UI
        // const res = await fetch(`${backendUrl}api/users/${fetchedUser?.id}?populate=*`);
        const data = await updateRes.json();
        dispatch(updateUser(data));
      } catch (error) {
        console.error('Error uploading avatar:', error);
      }finally{
        setUploadLoading(false);
      }
    };

    const handleSavePersonalInfo = async (updatedData) => {
      try {
        setLoading(true);
        const res = await fetch(`${backendUrl}api/profiles/${fetchedUser?.profile?.documentId}?populate=*`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            data: {
              firstname: updatedData.firstname,
              lastname: updatedData.lastname,
              phone: updatedData.phone,
              gender: updatedData.gender,
            },
          }),
        });

        if (!res.ok) {
          const errorDetails = await res.json();
          console.log('Failed to save personal information:', errorDetails);
          throw new Error('Failed to save personal information')
        };

        const data = await res.json();
        dispatch(updateUser(data));

      } catch (error) {
        console.error('Error saving personal information:', error);
      }finally {
        setLoading(false);
      }
    }
    const handleSaveAddressAndAbout = async (updatedData) => {
      try {
        setAddressLoading(true);
        const res = await fetch(`${backendUrl}api/profiles/${fetchedUser?.profile?.documentId}?populate=*`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            data: {
              country: updatedData.country,
              city: updatedData.city,
              province: updatedData.province,
              street: updatedData.street,
              bio: updatedData.bio,
            },
          }),
        });

        if (!res.ok) {
          const errorDetails = await res.json();
          console.log('Failed to save Address information:', errorDetails);
          throw new Error('Failed to save Address information')
        };

        const data = await res.json();
        dispatch(updateUser(data));

      } catch (error) {
        console.error('Error saving address and about  information:', error);
      }finally {
        setAddressLoading(false);
      }
    }


    const onChangePassword = async (passwordData) => {

      try {
        setChangePasswordLoading(true);
        const response = await axios.post(
          `${backendUrl}api/auth/change-password`,
          {
            currentPassword: passwordData.currentPassword,
            password: passwordData.newPassword,
            passwordConfirmation: passwordData.confirmPassword,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response, 'change passw');
        
        alert('Password changed successfully!');
      } catch (error) {
        console.error(error);
        alert('Failed to change password: ' + error.response?.data?.error?.message || 'Unknown error');
      }finally{
        setChangePasswordLoading(false);
      }
    };

  return (
    <section className='profile'>
      <Nav />
      <div className="container">
        <div className='profileWrapper'>
          <p>{t('settings')}</p>
          <div className='settings'>
              <UserSettings  className='settingsLeft'/>
              <div className="settingsRight">
                <p>{t('myProfile')}</p>
                <div className="profileSettings">
                  <AvatarSetting userAvatar={fetchedUser?.avatar || noAvatar} onDelete={handleDeleteAvatar} onUpload={handleUploadAvatar} uploadLoading={uploadLoading} deleteLoading={deleteLoading}/>
                  <PersonalInformation  user={fetchedUser} onSave={handleSavePersonalInfo} loading={loading}/>
                  <PasswordSetting onChangePassword={onChangePassword} changePasswordLoading={changePasswordLoading}/>
                  <AddressAndAbout user={fetchedUser} onSave={handleSaveAddressAndAbout} onLoading={addressLoading}/>
                </div>
              </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Profile;