import React, { useEffect, useState } from "react";
import "./App.css";
import Board from "./components/Board";
import Login from "./components/Login";
import { Route, Routes, useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/login");
  }, []);

  const [user, setUser] = useState("2BAahK2o1jZRIsXfPKWzvAymqHm1");
  return (
    <div className="app">
      <Routes>
        <Route path="/login" element={<Login setUser={setUser} />} />
        {user ? (
          <Route path="/task-board" element={<Board uid={user} />} />
        ) : null}
      </Routes>
    </div>
  );
}

export default App;
