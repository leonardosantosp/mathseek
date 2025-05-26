type ForgotInputProps = {
  setType: (type: 'login' | 'signup' | 'forgot') => void
}

export const ForgotPasswordInput = ({ setType }: ForgotInputProps) => {
  return (
    <>
      <input
        type="text"
        placeholder="Example@mail.com"
        className="input-forgot"
      />

      <button className="login-button forgot-button">Reset Password</button>

      <div className="forgot-no-account__container">
        <div className="dont-have-account">
          <p>
            Don’t have an account ?
            <span onClick={() => setType('signup')}>Signup</span>
          </p>
        </div>
      </div>
    </>
  )
}
