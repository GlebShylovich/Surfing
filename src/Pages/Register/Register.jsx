import { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { setUser } from '../../Services/slices/user';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import success from '../../assets/success.svg';
import './Register.scss';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordLength, setPasswordLength] = useState(false);
  const [passwordLetters, setPasswordLetters] = useState(false);
  const [passwordAlphabet, setPasswordAlphabet] = useState(false);
  const [error, setError] = useState(false);
  const [isShowNameBox, setIsShowNameBox] = useState(true);
  const [isShowEmailBox, setIsShowEmailBox] = useState(false);
  const [isShowPasswordBox, setIsShowPasswordBox] = useState(false);
  const [isShowFinishBox, setIsShowFinishBox] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = getAuth();

  function passwordValidation(e) {
    const password = e.target.value;
    setPassword(password)
    setPasswordLength(password.length >= 8);
    setPasswordLetters(/\d/.test(password) && /[a-zA-Z]/.test(password));
    setPasswordAlphabet(/^[a-zA-Z0-9]*$/.test(password));
  }

  function handleNameBtn(e) {
    e.preventDefault();
    if (!name) {
      setError(true);
    } else {
      setError(false);
      setIsShowNameBox(false);
      setIsShowEmailBox(true);
    }
  }

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

  function registerUser(e) {
    e.preventDefault();
    if (!passwordLength || !passwordAlphabet || !passwordLetters) {
      setError(true);
      setPassword("")
      return;
    }
    setError(false);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        dispatch(setUser({
          email: email,
          name: name,
          id: userCredential.user.uid,
        }));
        setName('');
        setEmail('');
        setPassword('');
        setIsShowPasswordBox(false);
        setIsShowFinishBox(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="register">
      {isShowNameBox && (
        <div className="register__nameBox">
          <h1 className="register__title">Registration</h1>
          <span className='register__subtitle register__subtitle--name'>Enter your username to log in</span>
          <form onSubmit={handleNameBtn} className="register__nameForm">
            <label className={error && !name ? 'register__nameLabel--error' : 'register__nameLabel'}>{error && !name ? 'Enter your username' : 'Your username'}</label>
            <input value={name} onChange={(e) => { setName(e.target.value); }} className={error && !name ? 'register__nameInput--error' : 'register__nameInput'} type='text' />
            <button className='register__emailBtn'>Next</button>
          </form>
        </div>
      )}
      {isShowEmailBox && (
        <div className="register__emailBox">
          <h1 className="register__title">Registration</h1>
          <span className='register__subtitle register__subtitle--email'>Enter your email address to log in</span>
          <form onSubmit={handleEmailBtn} className="register__emailForm">
            <label className={error && !email ? 'register__emailLabel--error' : 'register__emailLabel'}>{error && !email ? 'Enter your email' : 'Your email'}</label>
            <input value={email} onChange={(e) => { setEmail(e.target.value); }} className={error && !email ? 'register__emailInput--error' : 'register__emailInput'} type='email' />
            <button className='register__emailBtn'>Next</button>
          </form>
        </div>
      )}
      {isShowPasswordBox && (
        <div className="register__passwordBox">
          <h1 className="register__title">Registration</h1>
          <span className='register__subtitle register__subtitle--password'>Create a password to log in to your profile</span>
          <form onSubmit={registerUser} className="register__passwordForm">
            <label className={error && !password ? 'register__passwordLabel--error' : 'register__passwordLabel'}>{error && !password ? 'Password is invalid' : 'Create password'}</label>
            <input value={password} onChange={passwordValidation} className={error && !password ? 'register__passwordInput--error' : 'register__passwordInput'} type='password' />
            <div className="register__passwordRequirements">
              <span className='register__passwordRequirementsTitle'>Password requirements:</span>
              <ul>
                <li><input type="checkbox" id="length" checked={passwordLength} readOnly /><label htmlFor='length'>At least 8 characters</label></li>
                <li><input type="checkbox" id="letters" checked={passwordLetters} readOnly /><label htmlFor='letters'>Letters & numbers</label></li>
                <li><input type="checkbox" id="alphabet" checked={passwordAlphabet} readOnly /><label htmlFor='alphabet'>Latin alphabet only</label></li>
              </ul>
            </div>
            <button className='register__passwordBtn'>Next</button>
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
            Your profile has been successfully created.<br />
            Time to go on a trip
          </div>
          <button onClick={() => { navigate("/login") }} className='register__finishBtn'>Next</button>
        </div>
      )}
    </div>
  );
}
