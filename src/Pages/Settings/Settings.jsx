import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  updateUsername,
  updateMail,
  comparePasswords,
} from "../../Common/edit";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  getAuth,
  updateEmail,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import { useEditData } from "../../Services/services";
import { emailValidation, passwordValidation } from "../../Common/auth";
import { useSelector, useDispatch } from "react-redux";
import { storage } from "../../main";
import Loading from "../../Components/Loading/Loading";
import Popup from "../../Components/Popup/Popup";
import defaultPic from "../../assets/defaultProfilePic.svg";
import backbtn from "../../assets/backbtn.svg";
import "./Settings.scss";

export default function Settings() {
  const user = useSelector((state) => state.user);
  //Инпуты
  const [file, setFile] = useState(null);
  const [avatar, setAvatar] = useState(defaultPic);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordRepeat, setNewPasswordRepeat] = useState("");
  //Требования
  const [passwordLetters, setPasswordLetters] = useState(true);
  const [passwordLength, setPasswordLength] = useState(true);
  const [passwordAlphabet, setPasswordAlphabet] = useState(true);
  const [usernameLength, setUsernameLength] = useState(true);
  //Проверки
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isPasswordsMatch, setIsPasswordMatch] = useState(true);
  //Доп. блоки
  const [showEmailConfirmation, setShowEmailConfirmation] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);
  //Ошибки
  const [updateStatus, setUpdateStatus] = useState(false);
  const [isSuccess, setIsSuccess] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const auth = getAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const editDataMutation = useEditData();

  useEffect(() => {
    async function fetchUserData() {
      try {
        if (user) {
          const storageRef = ref(storage, `avatars/${user.id}`);
          const url = await getDownloadURL(storageRef);
          setAvatar(url);
        }
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchUserData();
  }, [user]);

  function handleUpdateUsername(e) {
    e.preventDefault();
    if (username.length > 2 && user) {
      updateUsername(
        editDataMutation,
        username,
        user.id,
        dispatch,
        setUpdateStatus,
        setIsSuccess
      );
    } else {
      setUsernameLength(false);
    }
    setUsername("");
  }

  function handleEmailChange(e) {
    e.preventDefault();
    if (emailValidation(email)) {
      setShowEmailConfirmation(true);
      setIsValidEmail(true);
    } else {
      setIsValidEmail(false);
    }
  }

  function handleEmailConfirmation(e) {
    e.preventDefault();
    const credential = EmailAuthProvider.credential(
      auth.currentUser.email,
      currentPassword
    );
    if (email && user && currentPassword) {
      reauthenticateWithCredential(auth.currentUser, credential)
        .then(() => {
          updateMail(
            editDataMutation,
            email,
            user.id,
            dispatch,
            setUpdateStatus,
            setIsSuccess
          );
          updateEmail(auth.currentUser, email);
          setShowEmailConfirmation(false);
          setCurrentPassword("");
          setEmail("");
        })
        .catch((error) => {
          console.error(error);
          setIsSuccess(false);
          setUpdateStatus(true);
        });
    }
  }

  function handlePasswordChange(e) {
    e.preventDefault();
    const credential = EmailAuthProvider.credential(
      auth.currentUser.email,
      password
    );
    if (user && password) {
      reauthenticateWithCredential(auth.currentUser, credential)
        .then(() => {
          setShowPasswordConfirmation(true);
          setInvalidPassword(false);
        })
        .catch((error) => {
          if (error.code === "auth/wrong-password") {
            setInvalidPassword(true);
          } else {
            setUpdateStatus(true);
            setIsSuccess(0);
          }
        });
    }
  }

  function handlePasswordConfirmation(e) {
    e.preventDefault();
    const credential = EmailAuthProvider.credential(
      auth.currentUser.email,
      password
    );
    if (user && comparePasswords(newPassword, newPasswordRepeat)) {
      setIsPasswordMatch(true);
      reauthenticateWithCredential(auth.currentUser, credential)
        .then(() => {
          updatePassword(auth.currentUser, newPassword);
          setShowPasswordConfirmation(false);
          setPassword("");
          setUpdateStatus(true);
          setIsSuccess(1);
        })
        .catch((error) => {
          setUpdateStatus(true);
          setIsSuccess(0);
        });
    } else {
      setIsPasswordMatch(false);
    }
  }

  function passwordRequirements(e) {
    e.preventDefault();
    const isValid = passwordValidation(
      newPassword,
      setPasswordLetters,
      setPasswordLength,
      setPasswordAlphabet
    );
    if (isValid) {
      setPasswordLetters(true);
      setPasswordLength(true);
      setPasswordAlphabet(true);
    }
  }

  function handleFile(e) {
    setFile(e.target.files[0]);
  }

  async function uploadFile() {
    if (file && user) {
      const storageRef = ref(storage, `avatars/${user.id}`);
      try {
        const snapshot = await uploadBytes(storageRef, file);
        const url = await getDownloadURL(snapshot.ref);
        setAvatar(url);
        setFile(null);
      } catch (error) {
        console.log(error);
      }
    }
  }

  if (loading) return <Loading />;

  return (
    <div className="settings">
      <button onClick={() => navigate("/profile")} className="backBtn">
        <img src={backbtn} alt="back" />
      </button>
      <div className="settings__container">
        <div className="settings__title">Settings</div>
        <div className="settings__pic">
          <img src={avatar} alt="User Avatar" />
          <input
            onChange={handleFile}
            type="file"
            id="file"
            className="settings__picInput"
          />
          {!file ? (
            <label htmlFor="file" className="settings__picLabel">
              Change avatar
            </label>
          ) : (
            <button
              onClick={uploadFile}
              className="settings__picLabel"
              disabled={!file}
            >
              Save
            </button>
          )}
        </div>
        <div className="settings__profileEdit">
          <form
            onSubmit={handleUpdateUsername}
            className="settings__usernameBox"
          >
            <label
              className={
                usernameLength
                  ? "settings__usernameBox-label"
                  : "settings__usernameBox-label--error"
              }
            >
              {usernameLength
                ? "Your username"
                : "Username must have more than 2 characters"}
            </label>
            <input
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              type="text"
              placeholder={user.name}
              className={
                usernameLength
                  ? "settings__usernameBox-input"
                  : "settings__usernameBox-input--error"
              }
            />
          </form>
          <form onSubmit={handleEmailChange} className="settings__emailBox">
            <label
              className={
                isValidEmail
                  ? "settings__emailBox-label"
                  : "settings__emailBox-label--error"
              }
            >
              {!isValidEmail ? "Check your email spelling" : "Your email"}
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder={user.email}
              className={
                isValidEmail
                  ? "settings__emailBox-input"
                  : "settings__emailBox-input--error"
              }
            />
          </form>
          {showEmailConfirmation && (
            <form
              className="settings__emailConfirmationBox"
              onSubmit={handleEmailConfirmation}
            >
              <label className="settings__emailConfirmationBox-label">Confirm password to change email</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => {
                  setCurrentPassword(e.target.value);
                }}
                className="settings__emailConfirmationBox-input"
              />
            </form>
          )}
          {!showPasswordConfirmation && (
            <form
              className="settings__passwordBox"
              onSubmit={handlePasswordChange}
            >
              <label
                className={
                  invalidPassword
                    ? "settings__passwordBox-label--error"
                    : "settings__passwordBox-label"
                }
              >
                {invalidPassword ? "Invalid password" : "Your password"}
              </label>
              <input
                className={
                  invalidPassword
                    ? "settings__passwordBox-input--error"
                    : "settings__passwordBox-input"
                }
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="•••••••••"
              />
            </form>
          )}
          {showPasswordConfirmation && (
            <>
              <form
                onSubmit={passwordRequirements}
                className="settings__newPasswordBox"
              >
                <label
                  className={
                    !passwordAlphabet || !passwordLength || !passwordLetters
                      ? "settings__newPasswordBox-label--error"
                      : "settings__newPasswordBox-label"
                  }
                >
                  {!passwordLength
                    ? "At least 8 characters"
                    : !passwordAlphabet
                    ? "Latin alphabet only"
                    : !passwordLetters
                    ? "Letters & numbers"
                    : "Enter the new password"}
                </label>
                <input
                  className={
                    !passwordAlphabet || !passwordLength || !passwordLetters
                      ? "settings__newPasswordBox-input--error"
                      : "settings__newPasswordBox-input"
                  }
                  type="password"
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                  }}
                />
              </form>
              <form
                onSubmit={handlePasswordConfirmation}
                className="settings__newPasswordRepeatBox"
              >
                <label
                  className={
                    !isPasswordsMatch
                      ? "settings__newPasswordRepeatBox-label--error"
                      : "settings__newPasswordRepeatBox-label"
                  }
                >
                  {!isPasswordsMatch
                    ? "Passwords don't match"
                    : "Repeat new password"}
                </label>
                <input
                  type="password"
                  value={newPasswordRepeat}
                  onChange={(e) => {
                    setNewPasswordRepeat(e.target.value);
                  }}
                  className={
                    !isPasswordsMatch
                      ? "settings__newPasswordRepeatBox-input--error"
                      : "settings__newPasswordRepeatBox-input"
                  }
                />
              </form>
            </>
          )}
        </div>
      </div>
      {updateStatus && <Popup value={isSuccess} />}
    </div>
  );
}
