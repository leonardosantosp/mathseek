import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import { createUser } from "../api-client/user";

type SignupInputProps = {
  viewPassword: boolean;
  handdleViewPassword: () => void;
  setType: (type: "login" | "signup" | "forgot") => void;
};

export const SignupInput = ({
  viewPassword,
  handdleViewPassword,
  setType
}: SignupInputProps) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

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

    try {
      await createUser({
        username,
        email,
        password
      });

      // Reset form on success
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setErrors({});

      //TODO: redirecionar a página de login
    } catch (error: any) {
      if (error.response?.data?.message?.includes("email")) {
        setErrors({ email: "Email already in use" });
      } else if (error.response?.data?.message?.includes("username")) {
        setErrors({ username: "Username already taken" });
      } else {
        setErrors({ general: "An error occurred. Please try again." });
      }
    }
  };

  return (
    <>
      {errors.username && (
        <div className="error-message">{errors.username}</div>
      )}
      <input
        type="text"
        placeholder="Username"
        className={`input-signup ${errors.username ? "error" : ""}`}
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      {errors.email && <div className="error-message">{errors.email}</div>}
      <input
        type="text"
        placeholder="Email"
        className={`input-signup ${errors.email ? "error" : ""}`}
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      {errors.password && (
        <div className="error-message">{errors.password}</div>
      )}
      <div className="card__password">
        <input
          type={viewPassword ? "text" : "password"}
          placeholder="Password"
          className={`input-signup ${errors.password ? "error" : ""}`}
          value={password}
          onChange={e => setPassword(e.target.value)}
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
      {errors.confirmPassword && (
        <div className="error-message">{errors.confirmPassword}</div>
      )}
      <div className="card__password">
        <input
          type={viewPassword ? "text" : "password"}
          placeholder="Confirm Password"
          className={`input-signup ${errors.confirmPassword ? "error" : ""}`}
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
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
      <button
        className="login-button signup-button"
        onClick={e => handleSignup(e)}
      >
        Sign Up
      </button>
      <div className="dont-have-account">
        <p>
          Already Registered?
          <span onClick={() => setType("login")}>Login</span>
        </p>
      </div>
    </>
  );
};
