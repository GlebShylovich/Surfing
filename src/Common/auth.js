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

export function register(auth, email, password, database) {
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