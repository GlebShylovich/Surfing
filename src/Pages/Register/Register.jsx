import { useState, useEffect } from 'react'
import success from '../../assets/success.svg'
import './Register.scss'
export default function Register() {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [isShowEmailBox, setIsShowEmailBox] = useState(true)
  const [isShowPasswordBox, setIsShowPasswordBox] = useState(false)
  const [isShowFinishBox, setIsShowFinishBox] = useState(false)
  return (
    <div className="register">
      {isShowEmailBox && (
        <div className="register__emailBox">
          <h1 className="register__title">Registration</h1>
          <span className='register__subtitle register__subtitle--email'>Enter your email address to log in</span>
          <form className="register__emailForm">
            <label className='register__emailLabel'>Your email</label>
            <input className='register__emailInput' type='email' />
            <button onClick={() => { setIsShowEmailBox(false); setIsShowPasswordBox(true) }} className='register__emailBtn'>Next</button>
          </form>
        </div>
      )}
      {isShowPasswordBox && (
        <div className="register__passwordBox">
          <h1 className="register__title">Registration</h1>
          <span className='register__subtitle register__subtitle--password'>Create a password to log in to your profile</span>
          <form className="register__passwordForm">
            <label className='register__passwordLabel'>Create password</label>
            <input className='register__passwordInput' type='password' />
            <div className="register__passwordRequirements">
              <span className='register__passwordRequirementsTitle'>Password requirements:</span>
              <ul>
                <li><input type="checkbox" id="length" disabled /><label>At least 8 characters</label></li>
                <li><input type="checkbox" id="uppercase" disabled /><label>Letters & numbers</label></li>
                <li><input type="checkbox" id="number" disabled /><label>Latin alphabet only</label></li>
              </ul>
            </div>
            <button onClick={() => { setIsShowPasswordBox(false); setIsShowFinishBox(true) }} className='register__passwordBtn'>Next</button>
          </form>
        </div>
      )}
      {isShowFinishBox && (
        <div className="register__finishBox">
          <div className="register__finishSuccess">
          <img className='register__finishIcon' src={success} alt="success" />
          </div>
          <div className="register__title">Great</div>
          <div className="register__subtitle">
          Your profile has been successfully created.<br/>
          Time to go on a trip
          </div>
          <button className='register__finishBtn'>Next</button>
        </div>
      )}
    </div>
  )
}
