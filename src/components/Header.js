import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { localStorageKey } from "../utils/constant";
import "../styles/style.css";

function Header(props) {
  const { isLoggedIn, updateUser, user } = props;

  return (
    <header className="flex justify-between align-center">
      <a href="/" className="brand">
        Conduit
      </a>
      <nav>
        <ul className="nav-menu flex justify-between align-center">
          {
            isLoggedIn ? <AuthHeader updateUser={updateUser} user={user} /> : <NonAuthHeader />
          }
        </ul>
      </nav>
    </header>
  );
}

function NonAuthHeader() {
  return (
    <>
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
    </>
  );
}

function AuthHeader(props) {
  const { updateUser, user } = props;
  const navigate = useNavigate();

  return (
    <>
      <li>
        <Link className="nav-menu-item" to="/">
          Home
        </Link>
      </li>
      <li>
        <Link className="nav-menu-item" to="/articles/new_article">
          🖋 New Article
        </Link>
      </li>
      <li>
        <Link className="nav-menu-item flex align-center" to={`profiles/${user.username}`}>
          <img src={user.image || "/images/user-solid.svg"} alt="" className="header-avatar" />
          {user.username}
        </Link>
      </li>
      <li>
        <button
          type="button"
          className="btn-4"
          onClick={() => {
            localStorage.removeItem(localStorageKey);
            updateUser();
            navigate("/");
          }}
        >
          Logout
        </button>
      </li>
    </>
  );
}

export default Header;
