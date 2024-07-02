import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { setUser } from "../Services/slices/user";

export function login(auth, email, password) {
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
      const object = {
        email: email,
        id: user.uid,
        name: name,
      };
      dispatch(setUser(object));
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