import React from 'react'
import './SignInBtn.css';
import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';

const SignInBtn = (props) => {
  const {t} = useTranslation("auth")
  if(props.variant === 'static'){
    return (
      <div className='signInAndUp'>
          <Link className='login' to='/login'>
              <span>{t('login')}</span>
          </Link>
          <Link className='signUp' to='/register'>
              <span>{t('register')}</span>
          </Link>
      </div>
    )
  }else if(props.variant === 'absolute'){
    return (
      <div className='signInAndUp signInAndUpAbs'>
          <Link className='login' to='/login'>
              <span>{t('login')}</span>
          </Link>
          <Link className='signUp' to='/register'>
              <span>{t('register')}</span>
          </Link>
      </div>
    )
  }
  
}

export default SignInBtn
