import React, { useId, useState } from "react";
import "./Login.css";
import { auth, signInWithEmailAndPassword } from "../Fire";
import { useNavigate } from "react-router-dom";
import { handleLogin, handleLogout } from "../functions/Firebase Utilities";
import { LoginProps } from "../types";

function Login({ setUser }: LoginProps) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
}

export default Login;
