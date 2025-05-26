import { ArrowRight, Eye, EyeClosed } from 'lucide-react'
import google from '../assets/google.png'

type LoginInputProps = {
  viewPassword: boolean
  handdleViewPassword: () => void
  setType: (type: 'login' | 'signup' | 'forgot') => void
}

export const LoginInput = ({
  viewPassword,
  handdleViewPassword,
  setType
}: LoginInputProps) => {
  return (
    <>
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
      <button className="forgot" onClick={() => setType('forgot')}>
        Forgot password ?
      </button>
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
        <p>
          Don’t have an account ?
          <span onClick={() => setType('signup')}>Signup</span>
        </p>
      </div>
      <div className="login-guest-container">
        <div className="login-guest">
          <p>login as guest</p>
          <ArrowRight color="white" className="arrow" />
        </div>
      </div>
    </>
  )
}
