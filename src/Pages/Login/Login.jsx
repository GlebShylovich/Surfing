import { useState, useEffect } from 'react'
import './Login.scss'
export default function Login() {
  const [isShowEmailBox, setIsShowEmailBox] = useState(true)
  const [isShowPasswordBox, setIsShowPasswordBox] = useState(false)
  return (
    <div className="login">
      {isShowEmailBox && (
        <div className="login__emailBox">
          <h1 className="login__title">Log in to your profile</h1>
          <span className="login__subtitle">Enter your email address to log in</span>
          <form className="login__emailForm">
            <label className='login__emailLabel'>Your email</label>
            <input className='login__emailInput' type='email' />
            <button onClick={() => { setIsShowEmailBox(false); setIsShowPasswordBox(true) }} className='login__emailBtn'>Next</button>
          </form>
        </div>
      )}
      {isShowPasswordBox && (
        <div className="login__passwordBox">
          <h1 className="login__title">Enter the password</h1>
          <span className="login__subtitle">for the profile to log in</span>
          <form className="login__passwordForm">
            <label className='login__passwordLabel'>Password</label>
            <input className='login__passwordInput' type='email' />
            <button onClick={() => { setIsShowEmailBox(false); setIsShowPasswordBox(true) }} className='login__passwordBtn'>Next</button>
          </form>
          <p className='login__passwordRecovery'>Forgot your password?</p>
        </div>
      )}
    </div>
  )
}
