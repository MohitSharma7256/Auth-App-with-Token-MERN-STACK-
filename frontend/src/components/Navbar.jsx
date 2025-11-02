import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../App.css";

const Navbar = () => {
  const { token, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <h2 className="logo">MERN Auth</h2>
      <div>
        {token ? (
          <>
            <Link to="/home" className="nav-btn">Home</Link>
            <button className="nav-btn logout" onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/register" className="nav-btn">Register</Link>
            <Link to="/login" className="nav-btn">Login</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
