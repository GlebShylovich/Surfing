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
