import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
export function login(auth, email, password, navigate) {
  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      navigate("/");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}

export function register(auth, email, password, name, database, dispatch) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      database(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}
export function emailValidation(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
export function passwordValidation(
  password,
  setPasswordLetters,
  setPasswordLength,
  setPasswordAlphabet
) {
  if (password.length < 8) {
    setPasswordLength(false);
    return false;
  }
  if (!(/\d/.test(password) && /[a-zA-Z]/.test(password))) {
    setPasswordAlphabet(false);
    return false;
  }
  if (!/^[a-zA-Z0-9]*$/.test(password)) {
    setPasswordLetters(false);
    return false;
  }
  return true;
}

export function handleEmail(
  email,
  emailExists,
  setError,
  setIsValidEmail,
  setIsUserExist,
  setIsShowEmailBox,
  setIsShowPasswordBox,
  isRegistration = false
) {
  if (!email) {
    setError(true);
    setIsValidEmail(true);
    setIsUserExist(true);
  } else if (!emailValidation(email)) {
    setError(false);
    setIsValidEmail(false);
    setIsUserExist(true);
  } else if (emailExists && isRegistration) {
    setError(false);
    setIsValidEmail(true);
    setIsUserExist(false); 
  } else if (!emailExists && !isRegistration) {
    setError(false);
    setIsValidEmail(true);
    setIsUserExist(false);
  } else {
    setError(false);
    setIsValidEmail(true);
    setIsUserExist(true);
    setIsShowEmailBox(false);
    setIsShowPasswordBox(true);
  }
}
