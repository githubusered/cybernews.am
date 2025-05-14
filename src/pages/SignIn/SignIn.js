import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { login } from '../../api/auth';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/auth/authSlice';
import {useTranslation} from 'react-i18next';
import './SignIn.css';
import { useNavigate } from 'react-router';
import demoUser from '../../data/user.json';

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {t} = useTranslation('auth')

  const [showPassword, setShowPassword] = useState(false)

  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleBackToWebsite = () => {
    navigate('/');
  }
  const handleToRegister = () => {
    navigate('/register');
  }

const handleLogin = async (e) => {
  e.preventDefault();
  if (!emailOrUsername || !password) {
    alert(t('enterEmailAndPassword'));
    return;
  }
  // Demo login: admin / admin
  if (emailOrUsername === 'admin@admin.com' && password === 'admin') {
    
    const demoToken = 'demo-token';

    if (rememberMe) {
      localStorage.setItem('token', demoToken);
    } else {
      sessionStorage.setItem('token', demoToken);
    }

    dispatch(setUser({ user: demoUser, token: demoToken }));

    navigate('/');
    return;
  }

  try {
    const response = await login(emailOrUsername, password);

    if (rememberMe) {
      localStorage.setItem('token', response.jwt);
    } else {
      sessionStorage.setItem('token', response.jwt);
    }
    
    dispatch(setUser({ user: response.user, token: response.jwt }));

    // Redirect to dashboard or home
    navigate('/');

  } catch (error) {
    console.error('Login error:', error.response.data.error.message);
  }
};
  return (
    <div className='signIn'>
      <div className="container">
        <div className="formLeftImg">
          <p className='backToWebsite' onClick={handleBackToWebsite}>{t('backToWebsite')} <FontAwesomeIcon icon={faArrowRight}/></p>
        </div>

        <form  onSubmit={handleLogin} className="form">
          <div className="titleAndDontHaveAnAccount">
            <p className="title">{t('signInTitle')}</p>
            <div className="dontHaveAnAccount">
              <p>{t('dontHaveAccount')} <span onClick={handleToRegister}>{t('signUp')}</span></p>
            </div>
          </div>
          <div className="formInputs">
            <input className="input" type="email" placeholder={t('emailOrUsername')} value={emailOrUsername} onChange={(e)=> setEmailOrUsername(e.target.value)}/>
          <div className="passwordWrapper">
            <input className="input passwordInput" type={showPassword ? 'text' : 'password'} placeholder={t('enterPassword')} value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <button type='button' onClick={() => setShowPassword(!showPassword)} className='eyeIcon'>
              {<FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye}/>}
            </button>
          </div>

          </div>
          <div className="rememberMeAndForgetPassword">
            <label className="rememberMe" htmlFor='checkbox'>
              <input type="checkbox" name="checkbox" className="checkboxRememberMe" checked={rememberMe} onChange={()=>setRememberMe(!rememberMe)}/>
              <span>{t('rememberMe')}</span>
            </label>
            <div className="forgetPassword">
                <span>{t('forgotPassword')}</span>
            </div>
          </div>
          <input type="submit" value={t('signInButton')} className='signInSubmit'/>
          <div className="orContinueWith">
            <div className='line'></div>
            <p>{t('orContinueWith')}</p>
            <div className='line'></div>
          </div>
          <button className="signInWithGoogle">
            <img src="https://www.gstatic.com/marketing-cms/assets/images/d5/dc/cfe9ce8b4425b410b49b7f2dd3f3/g.webp=s96-fcrop64=1,00000000ffffffff-rw" alt="Google" />
            <p>{t('signInWithGoogle')}</p>
          </button>

        </form>
      </div>
    </div>
  )
}

export default SignIn
