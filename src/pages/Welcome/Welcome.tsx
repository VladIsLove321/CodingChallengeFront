import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import "./Welcome.css";

function Welcome() {
  const location = useLocation();
  return (
    <div className="App">
      <div className="Header">
        <h1>Hello</h1>
      </div>
      <div className="Navigation">
        <Link
          style={{
            color: location.pathname === "/register" ? "#ff2626" : "white",
          }}
          className="EntryLink"
          to="/register"
        >
          Register
        </Link>
        <Link
          style={{
            color: location.pathname === "/login" ? "#ff2626" : "white",
          }}
          className="EntryLink"
          to="/login"
        >
          Login
        </Link>
      </div>
      <Outlet />
    </div>
  );
}

export default Welcome;
