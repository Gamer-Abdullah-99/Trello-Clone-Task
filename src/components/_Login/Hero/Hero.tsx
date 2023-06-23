import React from "react";
import "./Hero.css";
import { handleLogin } from "../../../functions/Firebase Utilities";
import { LoginHeroProps } from "../../../functions/types";
import { useNavigate } from "react-router-dom";

const Hero: React.FC<LoginHeroProps> = ({
  setUser,
  email,
  setEmail,
  password,
  setPassword,
}) => {
  const navigate = useNavigate();

  return (
    <div className="login-container">
      <div className="login-textWrapper">
        <h2>Login</h2>
        <input
          type="email"
          name="email"
          id="login-email"
          placeholder="Enter Email Address"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
        />
        <input
          type="password"
          name="email"
          id="login-password"
          placeholder="Enter Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
        />
        <button
          onClick={() => handleLogin({ email, password, navigate, setUser })}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Hero;
