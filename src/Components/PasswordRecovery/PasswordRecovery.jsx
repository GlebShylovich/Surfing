import { useEffect } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./PasswordRecovery.scss";

export default function PasswordRecovery({ email }) {
  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    passwordRecovery();
  }, []);

  function passwordRecovery() {
    sendPasswordResetEmail(auth, email)
      .then(() => {})
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }
  
  return (
    <div className="passwordRecovery">
      <div className="passwordRecovery__content">
        <h1 className="passwordRecovery__title">Password recovery</h1>
        <span className="passwordRecovery__subtitle">
          A letter with instructions for password recovery was sent to {email}
        </span>
        <button
          className="passwordRecovery__btn"
          onClick={() => {
            navigate("/auth");
          }}
        >
          Great
        </button>
      </div>
    </div>
  );
}
