import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import logo from "../../img/logo.png"
import "./Animation.scss"

export default function Animation() {
  const [isShown, setIsShown] = useState(true);
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    if (auth.currentUser) {
      setIsShown(false);
      navigate('/')
    } else {
      setTimeout(() => {
        setIsShown(false);
        navigate('/auth')
      }, 10000);
    }
  }, [auth.currentUser]);

  return (
    <>
      {isShown && (
        <div className="animation">
          <div className="animation__branding">
            <img className="animation__logo" src={logo} alt="logo" />
            <span className="animation__name">surfvoyage</span>
          </div>
        </div>
      )}
    </>
  )
}
