import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const AddressAndAbout = ({ user, onSave, onLoading }) => {

  const [form, setForm] = useState({
    country: '',
    city: '',
    province: '',
    street: '',
    bio: '',
  });
  const {t: tA} = useTranslation('auth');
  const {t: tC} = useTranslation('common');

    useEffect(() => {
      if (user) {
        setForm({
          country: user?.profile?.country || '',
          city: user?.profile?.city || '',
          province: user?.profile?.province || '',
          street: user?.profile?.street || '',
          bio: user?.profile?.bio || '',
        });
      }
    }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <form className="profileSetting addressAndAbout" onSubmit={handleSubmit}>
      <h3>{tA('addressAndAbout')}</h3>
      <input name="country" value={form.country} onChange={handleChange} placeholder={tA('country')} />
      <input name="city" value={form.city} onChange={handleChange} placeholder={tA('city')} />
      <input name="province" value={form.province} onChange={handleChange} placeholder={tA('province')} />
      <input name="street" value={form.street} onChange={handleChange} placeholder={tA('street')} />
      <textarea name="bio" value={form.bio} onChange={handleChange} placeholder={tA('bio')} />
      <button type="submit" disabled={onLoading}>{onLoading ? `${tC('saving')}` :`${tC('saveChanges')}`}</button>
    </form>
  );
};

export default AddressAndAbout;
