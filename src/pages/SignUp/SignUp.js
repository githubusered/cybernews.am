import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from 'react-i18next';
import '../SignIn/SignIn.css';
import './SignUp.css';
import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux'; // Import useDispatch from Redux
// import { setUser } from '../../redux/auth/authSlice'; // Import setUser action
import { createProfile, register } from '../../api/auth';

const SignUp = () => {
  const navigate = useNavigate();
  const {t} = useTranslation('auth')
  const [showPassword, setShowPassword] = useState(false)
 
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [agree, setAgree] = useState(false);


  const handleBackToWebsite = () => {
    navigate('/');
  }
  const handleToLogin = () => {
    navigate('/login');
  }
  const handleSignUp = async (e) => {
    e.preventDefault();
    
    if (!email || !password || !firstName || !lastName) {
      alert(t('pleaseFillAllFields'));
      return;
    }
    
    if (!agree) {
      alert('You must agree to the Terms & Conditions before signing up.');
      return;
    }
    
    try {
      const username = `${firstName.toLowerCase()}${lastName.toLowerCase()}`; 
      const response = await register(username, email, password);
      const { jwt, user } = response;

      await createProfile(jwt, firstName, lastName, user)
  
      // localStorage.setItem('token', response.jwt);
      // dispatch(setUser({ user: response.user, token: response.jwt }));
      
      navigate('/login'); // Redirect after signup if you want
    } catch (error) {
      console.error('Signup error:', error.response?.data?.error?.message || error.message);
    }
  }

    return (
      <div className='signUp signIn'>
        <div className="container">
          <div className="formLeftImg">
              <p  onClick={handleBackToWebsite} className='backToWebsite'>{t('backToWebsite')} <FontAwesomeIcon icon={faArrowRight}/></p>
          </div>
  
          <form  onSubmit={handleSignUp} className="form">
            <div className="titleAndDontHaveAnAccount">
              <p className="title">{t('signUpTitle')}</p>
              <div className="dontHaveAnAccount">
                <p>{t('alreadyHaveAccount')} <span onClick={handleToLogin}>{t('login')}</span></p>
              </div>
            </div>
            <div className="formInputs">
                <div className='fullName'>
                    <input className="input" type="text" placeholder={t('firstname')} value={firstName} onChange={(e)=>setFirstName(e.target.value)}/>
                    <input className="input" type="text" placeholder={t('lastname')} value={lastName} onChange={(e)=>setLastName(e.target.value)}/>
                </div>
                <input className="input" type="text" placeholder={t('email')} value={email} onChange={(e)=> setEmail(e.target.value)}/>
                <div className="passwordWrapper">
                <input className="input passwordInput" type={showPassword ? 'text' : 'password'} placeholder={t('enterPassword')} value={password} onChange={(e)=> setPassword(e.target.value)}/>
                <button type='button' onClick={() => setShowPassword(!showPassword)} className='eyeIcon'>
                    {<FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye}/>}
                </button>
                </div>  
            </div>
            <div className="rememberMeAndForgetPassword">
              <label className="rememberMe" htmlFor='checkbox'>
                <input type="checkbox" name="checkbox" className="checkboxRememberMe" checked={agree} onChange={(e)=> setAgree(e.target.checked)}/>
                <span>{t('agreeTo')}</span>
                <span className='forgetPassword'>{t('termsAndCond')}</span>
              </label>
            </div>
            <input type="submit" value={t('createAccount')}  className='signInSubmit'/>
            <div className="orContinueWith">
              <div className='line'></div>
              <p>{t('orRegisterWith')}</p>
              <div className='line'></div>
            </div>
            <div className="signInWithGoogle" onClick={() => alert('Google sign-in not yet implemented.')}>
              <img src="https://www.gstatic.com/marketing-cms/assets/images/d5/dc/cfe9ce8b4425b410b49b7f2dd3f3/g.webp=s96-fcrop64=1,00000000ffffffff-rw" alt="Google" />
              <p>{t('google')}</p>
            </div>
  
          </form>
        </div>
      </div>
    )
}

export default SignUp
