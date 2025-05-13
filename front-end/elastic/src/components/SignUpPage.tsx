import { useState, useContext } from "react";
import googleLogo from "../assets/google-icon.png";
// import { ThemeContext } from "../context/ThemeContext";

const SignUpPage = () => {
  // const { isLight } = useContext(ThemeContext); // Obtemos o estado do tema (claro ou escuro)

  const [username, setUsername] = useState("");
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Cadastro realizado:", {
      username,
      email,
      password,
      confirmPassword,
    });
  };

  return (
    <>
      <div className="signup-container">
        {/* <div className={`signup-container ${isLight ? "light-theme" : "dark-theme"}`}> */}
        <div className="signup_form">
          <div className="signup_form--border">
            <h1>Signup</h1>
            <span>Just some details to get you in.!</span>
            <form onSubmit={handleSignup}>
              <div className="signup_form">
                <input
                  type="text"
                  id="username"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="signup_form">
                <input
                  type="text"
                  id="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  required
                />
              </div>
              <div className="signup_form">
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="signup_form">
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="signup-btn">
                Signup
              </button>
            </form>

            <div className="divider">
              <span>Or</span>
            </div>

            <div className="google_login">
              <button className="google_login">
                <img
                  src={googleLogo}
                  alt="Google logo"
                  className="google_login"
                />
              </button>
            </div>

            <div className="login-link">
              <p>
                Already Registered? <a href="/login">Login</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
