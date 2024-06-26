import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { setUser } from "../Services/slices/user";

export function login(auth, email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      setEmail("");
      setPassword("");
      navigate("/");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}

export function register(auth, email, password, name) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      dispatch(
        setUser({
          email: email,
          name: name,
          id: userCredential.user.uid,
        })
      );
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}
