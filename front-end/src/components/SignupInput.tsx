import { ArrowRight, Eye, EyeClosed } from 'lucide-react'
import google from '../assets/google.png'

type SignupInputProps = {
  viewPassword: boolean
  handdleViewPassword: () => void
  setType: (type: 'login' | 'signup' | 'forgot') => void
}

export const SignupInput = ({
  viewPassword,
  handdleViewPassword,
  setType
}: SignupInputProps) => {
  return (
    <>
      <input type="text" placeholder="Username" className="input-signup" />
      <input type="text" placeholder="Email" className="input-signup" />
      <div className="card__password">
        <input
          type="password"
          placeholder="Password"
          className="input-signup"
        />
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
      <div className="card__password">
        <input
          type="password"
          placeholder="Confirm Password"
          className="input-signup"
        />
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
      <button className="login-button signup-button">Sign Up</button>
      <div className="dont-have-account">
        <p>
          Already Registered?
          <span onClick={() => setType('login')}>Login</span>
        </p>
      </div>
    </>
  )
}
