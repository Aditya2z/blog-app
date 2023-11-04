import React from "react";
import "../styles/style.css";

function Header() {
  return (
    <header className="flex justify-between align-center">
      <a href="#1" className="brand">Conduit</a>
      <div className="nav-menu flex justify-between flex-24">
        <a href="#1">Home</a>
        <a href="#1">Sign in</a>
        <a href="#1">Sign up</a>
      </div>
    </header>
  );
}

export default Header;
