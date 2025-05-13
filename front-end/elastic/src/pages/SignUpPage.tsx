import { Link } from 'react-router-dom'
import { EyeClosed, Eye, ArrowRight } from 'lucide-react'
import google from '../assets/google.png'
import planet from '../assets/planet-purple.png'
import { useState } from 'react'

export const LoginPage = () => {
  const [viewPassword, setViewPassword] = useState(false)
  const handdleViewPassword = () => {
    setViewPassword(!viewPassword)
  }

  return (
    <>
      <div className="signup__header">
        <Link to="/">
          <div className="header__logo">
            <span>π</span>
            <h1>MathSeek</h1>
          </div>
        </Link>
      </div>
      <div className="signup-page">
        <div className="signup-page__container">
          <div className="signup-page__title">
            <h1>Welcome Back !</h1>
            <div className="dashed-container">
              <div className="dashed-line__text">
                <p>Skip the lag?</p>
              </div>
              <div class="dashed-line"></div>
            </div>
          </div>
          <img
            src={planet}
            alt="planet"
            width={302}
            height={302}
            className="planet first-planet"
          />
          <div className="signup-page__card">
            <h2>Login</h2>
            <p>Glad you’re back!</p>
            <input type="text" placeholder="Username" />
            <div className="card__password">
              <input type="password" placeholder="Password" />
              <div className="card__password--icon-container">
                {!viewPassword ? (
                  <EyeClosed
                    size={20}
                    color="#ffff"
                    onClick={() => handdleViewPassword()}
                  />
                ) : (
                  <Eye
                    size={20}
                    color="#ffff"
                    onClick={() => handdleViewPassword()}
                  />
                )}
              </div>
            </div>
            <button className="login-button">Login</button>
            <button className="forgot">Forgot password ?</button>
            <div className="or">
              <div className="or__header">
                <div className="or__bar">{}</div>
                <p>or</p>
                <div className="or__bar">{}</div>
              </div>
              <div className="login-options">
                <img src={google} alt="google " width={30} height={30} />
              </div>
            </div>
            <div className="dont-have-account">
              <p>Don’t have an account ? Signup</p>
            </div>
            <div className="login-guest-container">
              <div className="login-guest">
                <p>login as guest</p>
                <ArrowRight color="white" className="arrow" />
              </div>
            </div>
          </div>
          <img
            src={planet}
            alt="planet"
            width={220}
            height={220}
            className="planet second-planet"
          />
        </div>
      </div>
    </>
  )
}
