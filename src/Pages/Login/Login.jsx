import { useState } from 'react'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import PasswordRecovery from '../../Components/PasswordRecovery/PasswordRecovery';
import './Login.scss'
export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [isShowEmailBox, setIsShowEmailBox] = useState(true)
  const [isShowPasswordBox, setIsShowPasswordBox] = useState(false)
  const [modal, setModal] = useState(false)

  const auth = getAuth();
  const navigate = useNavigate();

  function handleEmailBtn(e) {
    e.preventDefault();
    if (!email) {
      setError(true);
    } else {
      setError(false);
      setIsShowEmailBox(false);
      setIsShowPasswordBox(true);
    }
  }

  function loginUser(e) {
    e.preventDefault();
    if (!password) {
      setError(true)
      setPassword('')
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setEmail('');
        setPassword('');
        navigate('/')
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }
  return (
    <div className="login">
      {isShowEmailBox && (
        <div className="login__emailBox">
          <h1 className="login__title">Log in to your profile</h1>
          <span className="login__subtitle">Enter your email address to log in</span>
          <form onSubmit={handleEmailBtn} className="login__emailForm">
            <label className={error && !email ? 'login__emailLabel--error': 'login__emailLabel'}>{error && !email ? 'Enter your email' : 'Your email'}</label>
            <input value={email} onChange={(e) => { setEmail(e.target.value) }} className={error && !email ? 'login__emailInput--error' : 'login__emailInput'} type='email' />
            <button className='login__emailBtn'>Next</button>
          </form>
        </div>
      )}
      {isShowPasswordBox && (
        <div className="login__passwordBox">
          <h1 className="login__title">Enter the password</h1>
          <span className="login__subtitle">for the profile to log in</span>
          <form onSubmit={loginUser} className="login__passwordForm">
            <label className={error && !password ? 'login__passwordLabel--error' : 'login__passwordLabel'}>{error && !password ? 'Invalid password' : 'Password'}</label>
            <input value={password} onChange={(e)=>{setPassword(e.target.value)}} className={error && !password ? 'login__passwordInput--error' : 'login__passwordInput'} type='password' />
            <button className='login__passwordBtn'>Next</button>
          </form>
          <p onClick={()=>{setModal(true)}} className='login__passwordRecovery'>Forgot your password?</p>
        </div>
      )}
      {modal && (<PasswordRecovery email={email}/>)}
    </div>
  )
}
