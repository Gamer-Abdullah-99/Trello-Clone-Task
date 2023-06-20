import React, { useState } from "react";
import "./Login.css";
import { auth, signInWithEmailAndPassword } from "../Fire";
import { useNavigate } from "react-router-dom";
// import { set, ref, db } from "../Fire";

type LoginProps = {
  setUser: (uid: string) => void;
};

function Login({ setUser }: LoginProps) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //   const [error, setError] = useState("");

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        // console.log(user.uid);
        setUser(user.uid);
        navigate("/task-board");

        // set(ref(db, user.uid + "/CardTitle"), {
        //   title1234: "Sunday",
        //   title2124: "Monday",
        //   title3623: "Tuesday",
        // });

        // set(ref(db, user.uid + "/Tasks"), [
        //   {
        //     id: 12412412412,
        //     title: "Clean room",
        //     column: "title3623",
        //     sortIndex: 1,
        //   },
        //   {
        //     id: 141414124144,
        //     title: "Do workout",
        //     column: "title2124",
        //     sortIndex: 2,
        //   },
        // ]);
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };
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
        <button onClick={handleLogin}>Submit</button>
      </div>
    </div>
  );
}

export default Login;
