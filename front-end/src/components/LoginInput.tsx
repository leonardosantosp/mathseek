import { ArrowRight, Eye, EyeClosed } from "lucide-react";
import google from "../assets/google.png";
import { useState } from "react";
import { login } from "../api-client/auth";
import { useNavigate } from "react-router-dom";
import { setCookie } from "../utils/cookieHandler";

type LoginInputProps = {
  viewPassword: boolean;
  handdleViewPassword: () => void;
  setType: (type: "login" | "signup" | "forgot") => void;
};

type ErrorType = {
  username?: string;
  password?: string;
  general?: string;
};

export const LoginInput = ({
  viewPassword,
  handdleViewPassword,
  setType
}: LoginInputProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<ErrorType>({});
  const navigate = useNavigate();

  const handleLogin = async () => {
    // Reset errors
    setErrors({});

    // Validação inicial
    const newErrors: ErrorType = {};
    if (!username.trim()) newErrors.username = "Username is required";
    if (!password.trim()) newErrors.password = "Password is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    try {
      const response = await login({ username, password });

      // Armazenando tokens
      sessionStorage.setItem("accessToken", response.accessToken);
      setCookie("refreshToken", response.refreshToken, {
        days: 7,
        path: "/"
      });

      navigate("/");
    } catch (error: any) {
      const newApiErrors: ErrorType = {};

      if (error.response) {
        const status = error.response.status;
        const data = error.response.data;

        if (status === 401) {
          if (data.message === "Invalid Password") {
            newApiErrors.password = "Incorrect password";
          } else {
            newApiErrors.general = "Invalid credentials";
          }
        } else if (status === 400) {
          newApiErrors.general = "Invalid request data";
        } else if (status === 404) {
          if (data.message === "user not found") {
            newApiErrors.username = "Username not found";
          }
        } else if (status >= 500) {
          newApiErrors.general = "Server error, please try again later";
        } else {
          newApiErrors.general = "Login failed, please try again";
        }
      } else {
        newApiErrors.general = "Network error, please check your connection";
      }

      setErrors(newApiErrors);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  const clearError = (field: keyof ErrorType) => {
    setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  return (
    <>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={e => {
          setUsername(e.target.value);
          clearError("username");
        }}
        className={errors.username ? "error" : ""}
        onKeyUp={handleKeyPress}
      />
      {errors.username && <p className="error-message">{errors.username}</p>}

      <div className="card__password">
        <input
          type={viewPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={e => {
            setPassword(e.target.value);
            clearError("password");
          }}
          className={errors.password ? "error" : ""}
          onKeyUp={handleKeyPress}
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
      {errors.password && <p className="error-message">{errors.password}</p>}

      <button
        className="login-button"
        onClick={handleLogin}
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "Login"}
      </button>

      {errors.general && (
        <p className="error-message general-error">{errors.general}</p>
      )}

      <button className="forgot" onClick={() => setType("forgot")}>
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
          Don't have an account ?
          <span onClick={() => setType("signup")}>Signup</span>
        </p>
      </div>

      <div className="login-guest-container">
        <div className="login-guest">
          <p>login as guest</p>
          <ArrowRight color="white" className="arrow" />
        </div>
      </div>
    </>
  );
};
