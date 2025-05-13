import { useState } from 'react'
import planetPurple from '../assets/planet-purple.png'
import planetPink from '../assets/planet-pink.png'
import planetBlue from '../assets/planet-blue.png'
import { LoginInput } from './LoginInput'
import { ForgotPasswordInput } from './ForgotPasswordInput'
import { SignupInput } from './SignupInput'

type LoginProps = {
  title: string
  subtitle: string
  titleCard: string
  subtitleCard: string
  type: 'login' | 'signup' | 'forgot'
  setType: (type: 'login' | 'signup' | 'forgot') => void
}

export const Login = ({
  title,
  subtitle,
  type,
  setType,
  titleCard,
  subtitleCard
}: LoginProps) => {
  const [viewPassword, setViewPassword] = useState(false)

  const handdleViewPassword = () => {
    setViewPassword(!viewPassword)
  }

  return (
    <>
      <div className="login-page">
        <div className="login-page__container">
          <div className="login-page__title">
            <h1>{title}</h1>
            <div className="dashed-container">
              <div className="dashed-line__text">
                <p>{subtitle}</p>
              </div>
              <div class="dashed-line"></div>
            </div>
          </div>
          <img
            src={
              type === 'login'
                ? planetPurple
                : type === 'signup'
                ? planetBlue
                : planetPink
            }
            alt="planet"
<<<<<<< HEAD
            width={260}
            height={260}
=======
            width={302}
            height={302}
>>>>>>> 9a934c7 (feat: add login (signin-signup-forgot) component)
            className="planet first-planet"
          />
          <div className="login-page__card">
            <h2>{titleCard}</h2>
            <p>{subtitleCard}</p>
            {type === 'login' ? (
              <LoginInput
                viewPassword={viewPassword}
                handdleViewPassword={() => handdleViewPassword()}
                setType={(type: 'login' | 'signup' | 'forgot') => setType(type)}
              />
            ) : type === 'signup' ? (
              <SignupInput
                viewPassword={viewPassword}
                handdleViewPassword={() => handdleViewPassword()}
                setType={(type: 'login' | 'signup' | 'forgot') => setType(type)}
              />
            ) : (
              <ForgotPasswordInput
                setType={(type: 'login' | 'signup' | 'forgot') => setType(type)}
              />
            )}
          </div>
          <img
            src={
              type === 'login'
                ? planetPurple
                : type === 'signup'
                ? planetBlue
                : planetPink
            }
            alt="planet"
<<<<<<< HEAD
            width={180}
            height={180}
=======
            width={220}
            height={220}
>>>>>>> 9a934c7 (feat: add login (signin-signup-forgot) component)
            className="planet second-planet"
          />
        </div>
      </div>
    </>
  )
}
