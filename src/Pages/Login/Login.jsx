import { useState, useRef, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { login, handleEmail } from "../../Common/auth";
import { checkEmailExists } from "../../Services/services";
import PasswordRecovery from "../../Components/PasswordRecovery/PasswordRecovery";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import backbtn from "../../assets/backbtn.svg";
import "./Login.scss";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [isShowEmailBox, setIsShowEmailBox] = useState(true);
  const [isShowPasswordBox, setIsShowPasswordBox] = useState(false);
  const [modal, setModal] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isUserExist, setIsUserExist] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const auth = getAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (isShowEmailBox) {
      emailRef.current.focus();
    } else if (isShowPasswordBox) {
      passwordRef.current.focus();
    }
  }, [isShowEmailBox, isShowPasswordBox]);
  async function handleEmailBtn(e) {
    e.preventDefault();
    const emailExists = await checkEmailExists(email);
    handleEmail(
      email,
      emailExists,
      setError,
      setIsValidEmail,
      setIsUserExist,
      setIsShowEmailBox,
      setIsShowPasswordBox
    );
  }
  function loginUser(e) {
    e.preventDefault();
    if (!password) {
      setError(true);
      setPassword("");
      return;
    }
    login(auth, email, password, navigate);
    setEmail("");
    setPassword("");
  }
  return (
    <div className="login">
      {isShowEmailBox && (
        <>
          <button
            onClick={() => {
              navigate("/auth");
            }}
            className="backBtn"
          >
            <img src={backbtn} alt="back" />
          </button>
          <div className="login__emailBox">
            <h1 className="login__title">Log in to your profile</h1>
            <span className="login__subtitle">
              Enter your email address to log in
            </span>
            <form
              onSubmit={handleEmailBtn}
              className="login__emailForm"
              noValidate
            >
              <label
                className={
                  (error && !email) || !isValidEmail || !isUserExist
                    ? "login__emailLabel--error"
                    : "login__emailLabel"
                }
              >
                {error && !email
                  ? "Enter your email"
                  : !isValidEmail
                  ? "Check your email spelling"
                  : !isUserExist
                  ? "No such user found"
                  : "Your email"}
              </label>
              <input
                ref={emailRef}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className={
                  (error && !email) || !isValidEmail || !isUserExist
                    ? "login__emailInput--error"
                    : "login__emailInput"
                }
                type="email"
              />
              <button className="login__emailBtn">Next</button>
            </form>
          </div>
        </>
      )}
      {isShowPasswordBox && (
        <>
          <button
            onClick={() => {
              setIsShowPasswordBox(false);
              setIsShowEmailBox(true);
            }}
            className="backBtn"
          >
            <img src={backbtn} alt="back" />
          </button>
          <div className="login__passwordBox">
            <h1 className="login__title">Enter the password</h1>
            <span className="login__subtitle">for the profile to log in</span>
            <form onSubmit={loginUser} className="login__passwordForm">
              <label
                className={
                  error && !password
                    ? "login__passwordLabel--error"
                    : "login__passwordLabel"
                }
              >
                {error && !password ? "Invalid password" : "Password"}
              </label>
              <div className="login__passwordBox-inputBox">
                <input
                  ref={passwordRef}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  className={
                    error && !password
                      ? "login__passwordInput--error"
                      : "login__passwordInput"
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
              <button className="login__passwordBtn">Next</button>
            </form>
            <p
              onClick={() => {
                setModal(true);
              }}
              className="login__passwordRecovery"
            >
              Forgot your password?
            </p>
          </div>
        </>
      )}
      {modal && <PasswordRecovery email={email} setModal={setModal} />}
    </div>
  );
}