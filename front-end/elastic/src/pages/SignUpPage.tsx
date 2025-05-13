import { Link } from 'react-router-dom'
import { Login } from '../components/Login'
import { useState } from 'react'

export const LoginPage = () => {
  const [loginType, setLoginType] = useState<'login' | 'signup' | 'forgot'>(
    'login'
  )

  return (
    <>
      <div className="login__header">
        <Link to="/">
          <div className="header__logo">
            <span>π</span>
            <h1>MathSeek</h1>
          </div>
        </Link>
      </div>
      {loginType === 'login' ? (
        <Login
          title="Welcome Back !"
          subtitle="Skip the lag?"
          titleCard="Login"
          subtitleCard="Glad you’re back!"
          type="login"
          setType={(type: 'login' | 'signup' | 'forgot') => setLoginType(type)}
        />
      ) : loginType === 'signup' ? (
        <Login
          title="Roll the Carpet!"
          subtitle="Skip the lag ?"
          titleCard="Signup"
          subtitleCard="Just some details to get you in.!"
          type="signup"
          setType={(type: 'login' | 'signup' | 'forgot') => setLoginType(type)}
        />
      ) : (
        <Login
          title="No Worries!"
          subtitle="Take me back!"
          titleCard="Forgot Password ?"
          subtitleCard="Please enter you’re email"
          type="forgot"
          setType={(type: 'login' | 'signup' | 'forgot') => setLoginType(type)}
        />
      )}
    </>
  )
}
