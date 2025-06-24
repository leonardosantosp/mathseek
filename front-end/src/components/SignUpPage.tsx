import { useState } from "react";
import googleLogo from "../assets/google-icon.png";
import { createUser } from "../api-client/user";

const SignUpPage = () => {
  const [username, setUsername] = useState("");
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!username.trim()) {
      newErrors.username = "Username is required";
    } else if (username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords don't match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await createUser({
        username,
        email,
        password
      });

      // Reset form on success
      setUsername("");
      setPassword("");
      setConfirmPassword("");
      setErrors({});

      //TODO: redirecionar a página de login
    } catch (error) {}
  };

  return (
    <>
      <div className="signup-container">
        <div className="signup_form">
          <div className="signup_form--border">
            <h1>Signup</h1>
            <span>Just some details to get you in.!</span>
            <form>
              <div className="signup_form">
                <input
                  type="text"
                  id="username"
                  placeholder="Username"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="signup_form">
                <input
                  type="text"
                  id="email"
                  placeholder="Email"
                  value={email}
                  onChange={e => setemail(e.target.value)}
                  required
                />
              </div>
              <div className="signup_form">
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="signup_form">
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="signup-btn"
                onClick={e => handleSignup(e)}
              >
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
