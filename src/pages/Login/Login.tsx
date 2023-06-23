import React, { useState } from "react";
import "./Login.css";
import { LoginProps } from "../../functions/types";
import Hero from "../../components/_Login/Hero/Hero";

const Login: React.FC<LoginProps> = ({ setUser }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <div className="container">
      <Hero
        setUser={setUser}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
      />
    </div>
  );
};

export default Login;
