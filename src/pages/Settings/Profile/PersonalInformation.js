import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const PersonalInformation = ({ user, onSave, loading }) => {

  const [form, setForm] = useState({
    firstname: user?.profile?.firstname || '',
        lastname: user?.profile?.lastname || '',
        email: user?.email || '',
        phone: user?.profile?.phone || '',
        gender: user?.profile?.gender || 'Male',
  });
  const { t: tA } = useTranslation('auth');
  const { t: tC } = useTranslation('common');
  useEffect(() => {
    if (user) {
      setForm({
        firstname: user?.profile?.firstname || '',
        lastname: user?.profile?.lastname || '',
        email: user?.email || '',
        phone: user?.profile?.phone || '',
        gender: user?.profile?.gender || 'Male',
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
    <form className="profileSetting personalInformation" onSubmit={handleSubmit}>
      <h3>{tA('personalInformation')}</h3>
      <input name="firstname" value={form.firstname} onChange={handleChange} placeholder={`${tA('firstname')}`} />
      <input name="lastname" value={form.lastname} onChange={handleChange} placeholder={`${tA('lastname')}`} />
      <input name="email" value={form.email} disabled onChange={handleChange} placeholder={`${tA('email')}`} />
      <input name="phone" value={form.phone} onChange={handleChange} placeholder={`${tA('phone')}`} />
      <select name="gender" value={form.gender} onChange={handleChange}>
        <option value="Male">{tA('male')}</option>
        <option value="Female">{tA('female')}</option>
      </select>
      <button type="submit" disabled={loading}>
        {loading ? `${tC('saving')}` : `${tC('saveChanges')}`}
        </button>
    </form>
  );
};

export default PersonalInformation;
