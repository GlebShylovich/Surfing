import { useState, useRef, useEffect } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register, emailValidation } from "../../Common/auth";
import { useAddData, checkEmailExists } from "../../Services/services";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import backbtn from "../../assets/backbtn.svg";
import success from "../../assets/success.svg";
import "./Register.scss";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState(false);
  const [passwordLetters, setPasswordLetters] = useState(false);
  const [passwordAlphabet, setPasswordAlphabet] = useState(false);
  const [error, setError] = useState(false);
  const [isShowNameBox, setIsShowNameBox] = useState(true);
  const [isShowEmailBox, setIsShowEmailBox] = useState(false);
  const [isShowPasswordBox, setIsShowPasswordBox] = useState(false);
  const [isShowFinishBox, setIsShowFinishBox] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [usedEmailError, setUsedEmailError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = getAuth();
  const addDataMutation = useAddData();

  useEffect(() => {
    if (isShowNameBox) {
      usernameRef.current.focus();
    } else if (isShowEmailBox) {
      emailRef.current.focus();
    } else if (isShowPasswordBox) {
      passwordRef.current.focus();
    }
  }, [isShowNameBox, isShowEmailBox, isShowPasswordBox]);

  function passwordValidation(e) {
    const password = e.target.value;
    setPassword(password);
    if (!password) {
      setPasswordLength(false);
      setPasswordLetters(false);
      setPasswordAlphabet(false);
      return;
    }
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

  async function handleEmailBtn(e) {
    e.preventDefault();
    const emailExists = await checkEmailExists(email);
    if (!email) {
      setError(true);
      setIsValidEmail(true);
      setUsedEmailError(false);
      setUsedEmailError(false);
    } else if (!emailValidation(email)) {
      setError(false);
      setIsValidEmail(false);
      setUsedEmailError(false);
      setUsedEmailError(false);
    } else if (emailExists) {
      setError(false);
      setIsValidEmail(true);
      setUsedEmailError(true);
    } else {
      setError(false);
      setIsValidEmail(true);
      setUsedEmailError(false);
      setUsedEmailError(false);
      setIsShowEmailBox(false);
      setIsShowPasswordBox(true);
    }
  }
  function registerUser(e) {
    e.preventDefault();
    if (!passwordLength || !passwordAlphabet || !passwordLetters) {
      setError(true);
      setPassword("");
      return;
    }
    register(auth, email, password, name, database, dispatch);
    setError(false);
    setName("");
    setEmail("");
    setPassword("");
    setIsShowPasswordBox(false);
    setIsShowFinishBox(true);
  }

  function database(user) {
    const object = {
      email: email,
      name: name,
      id: user.uid,
    };
    addDataMutation.mutateAsync(object).then((databaseResponse) => {
      updateProfile(user, {
        displayName: databaseResponse,
      });
    });
  }

  return (
    <div className="register">
      {isShowNameBox && (
        <>
          <button
            onClick={() => {
              navigate("/auth");
            }}
            className="backBtn"
          >
            <img src={backbtn} alt="back" />
          </button>
          <div className="register__nameBox">
            <h1 className="register__title">Registration</h1>
            <span className="register__subtitle register__subtitle--name">
              Enter your username to log in
            </span>
            <form onSubmit={handleNameBtn} className="register__nameForm">
              <label
                className={
                  error && !name
                    ? "register__nameLabel--error"
                    : "register__nameLabel"
                }
              >
                {error && !name ? "Enter your username" : "Your username"}
              </label>
              <input
                ref={usernameRef}
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                className={
                  error && !name
                    ? "register__nameInput--error"
                    : "register__nameInput"
                }
                type="text"
              />
              <button className="register__emailBtn">Next</button>
            </form>
          </div>
        </>
      )}
      {isShowEmailBox && (
        <>
          <button
            onClick={() => {
              setIsShowNameBox(true);
              setIsShowEmailBox(false);
            }}
            className="backBtn"
          >
            <img src={backbtn} alt="back" />
          </button>
          <div className="register__emailBox">
            <h1 className="register__title">Registration</h1>
            <span className="register__subtitle register__subtitle--email">
              Enter your email address to log in
            </span>
            <form
              onSubmit={handleEmailBtn}
              className="register__emailForm"
              noValidate
            >
              <label
                className={
                  (error && !email) || !isValidEmail || usedEmailError
                    ? "register__emailLabel--error"
                    : "register__emailLabel"
                }
              >
                {error && !email
                  ? "Enter your email"
                  : !isValidEmail
                  ? "Check your email spelling"
                  : usedEmailError
                  ? "Email is already in use"
                  : "Your email"}
              </label>
              <input
                ref={emailRef}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className={
                  (error && !email) || !isValidEmail || usedEmailError
                    ? "register__emailInput--error"
                    : "register__emailInput"
                }
                type="email"
              />
              <button className="register__emailBtn">Next</button>
            </form>
          </div>
        </>
      )}
      {isShowPasswordBox && (
        <>
          <button
            onClick={() => {
              setIsShowEmailBox(true);
              setIsShowPasswordBox(false);
            }}
            className="backBtn"
          >
            <img src={backbtn} alt="back" />
          </button>
          <div className="register__passwordBox">
            <h1 className="register__title">Registration</h1>
            <span className="register__subtitle register__subtitle--password">
              Create a password to log in to your profile
            </span>
            <form onSubmit={registerUser} className="register__passwordForm">
              <label
                className={
                  error && !password
                    ? "register__passwordLabel--error"
                    : "register__passwordLabel"
                }
              >
                {error && !password ? "Password is invalid" : "Create password"}
              </label>
              <div className="register__passwordBox-inputBox">
                <input
                  ref={passwordRef}
                  value={password}
                  onChange={passwordValidation}
                  className={
                    error && !password
                      ? "register__passwordInput--error"
                      : "register__passwordInput"
                  }
                  type={showPassword ? "text" : "password"}
                />
                {showPassword ? (
                  <FaRegEyeSlash
                    onClick={() => {
                      setShowPassword(false);
                    }}
                  />
                ) : (
                  <FaRegEye
                    onClick={() => {
                      setShowPassword(true);
                    }}
                  />
                )}
              </div>
              <div className="register__passwordRequirements">
                <span className="register__passwordRequirementsTitle">
                  Password requirements:
                </span>
                <ul>
                  <li>
                    <input
                      type="checkbox"
                      id="length"
                      checked={passwordLength}
                      readOnly
                    />
                    <label htmlFor="length">At least 8 characters</label>
                  </li>
                  <li>
                    <input
                      type="checkbox"
                      id="letters"
                      checked={passwordLetters}
                      readOnly
                    />
                    <label htmlFor="letters">Letters & numbers</label>
                  </li>
                  <li>
                    <input
                      type="checkbox"
                      id="alphabet"
                      checked={passwordAlphabet}
                      readOnly
                    />
                    <label htmlFor="alphabet">Latin alphabet only</label>
                  </li>
                </ul>
              </div>
              <button className="register__passwordBtn">Next</button>
            </form>
          </div>
        </>
      )}
      {isShowFinishBox && (
        <div className="register__finishBox">
          <div className="register__finishSuccess">
            <img className="register__finishIcon" src={success} alt="success" />
          </div>
          <div className="register__title">Great</div>
          <div className="register__subtitle">
            Your profile has been successfully created.
            <br />
            Time to go on a trip
          </div>
          <button
            onClick={() => {
              navigate("/");
            }}
            className="register__finishBtn"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
