import { useState, useEffect } from "react"
import logo from "../../img/logo.png"
import "./Animation.scss"

export default function Animation() {
  const [isShown, setIsShown] = useState(true);

  useEffect(() => {
      setTimeout(() => {
        setIsShown(false);
      }, 5000);
  }, []);

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
