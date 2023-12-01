import React from "react";
import { Link, NavLink } from "react-router-dom";
import "../styles/style.css";

function Header() {
  return (
    <header className="flex justify-between align-center">
      <Link to="/" className="brand">
        Conduit
      </Link>
      <ul className="nav-menu flex justify-between flex-24">
        <li>
          <NavLink className="nav-menu-item" activeclassname="active" to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink className="nav-menu-item" activeclassname="active" to="/login">
            Sign in
          </NavLink>
        </li>
        <li>
          <NavLink className="nav-menu-item" activeclassname="active" to="/signup">
            Sign up
          </NavLink>
        </li>
      </ul>
    </header>
  );
}

export default Header;
