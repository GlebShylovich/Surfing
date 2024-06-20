import { useNavigate } from 'react-router-dom'
import logo from '../../img/logo.png'
import "./Auth.scss"

export default function Auth() {
    const navigate = useNavigate()
    return (
        <>
            <div className="auth">
                <div className="auth__branding">
                    <img src={logo} alt="logo" className="auth__logo" />
                    <span className="auth__name">sufrvoyage</span>
                </div>
                <h1 className="auth__title">Log in or create<br />your profile</h1>
                <p className="auth__subtitle">To continue, you need to log in or<br />register in the application</p>
                <div className="auth__action">
                    <button className="auth__loginBtn" onClick={() => { navigate("/login") }}>Next</button>
                    <button className="auth__registerBtn" onClick={() => { navigate("/registration") }}>Registration</button>
                </div>
                <p className='auth__termsAndConditions'>By registering in the application,<br />you agree to the <span className='auth__userAgreement'>user agreements</span><br />and <span className='auth__privacyPolicy'>privacy policy</span></p>
            </div>
        </>
    )
}
