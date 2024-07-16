import logo from "../../img/logo.png"
import "./Animation.scss"

export default function Animation() {
  return (
    <>
      <div className="animation">
        <div className="animation__branding">
          <img className="animation__logo" src={logo} alt="logo" />
          <span className="animation__name">surfvoyage</span>
        </div>
      </div>
    </>
  )
}
