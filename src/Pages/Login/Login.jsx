import { useState } from "react";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { login } from "../../Common/auth"
import PasswordRecovery from "../../Components/PasswordRecovery/PasswordRecovery";
import backbtn from "../../assets/backbtn.svg";
import "./Login.scss";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [isShowEmailBox, setIsShowEmailBox] = useState(true);
  const [isShowPasswordBox, setIsShowPasswordBox] = useState(false);
  const [modal, setModal] = useState(false);

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
      setError(true);
      setPassword("");
      return;
    }
    login(auth, email, password)
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
            <form onSubmit={handleEmailBtn} className="login__emailForm">
              <label
                className={
                  error && !email
                    ? "login__emailLabel--error"
                    : "login__emailLabel"
                }
              >
                {error && !email ? "Enter your email" : "Your email"}
              </label>
              <input
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className={
                  error && !email
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
            <form
              onSubmit={loginUser}
              className="login__passwordForm"
            >
              <label
                className={
                  error && !password
                    ? "login__passwordLabel--error"
                    : "login__passwordLabel"
                }
              >
                {error && !password ? "Invalid password" : "Password"}
              </label>
              <input
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className={
                  error && !password
                    ? "login__passwordInput--error"
                    : "login__passwordInput"
                }
                type="password"
              />
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
