import "./Header.scss";
import { NavLink } from "react-router-dom";
import home from "./home.png";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export default function Header() {
  const { user } = useContext(AuthContext);

  const guestNavigation = (
    <div className="guest right-nav">
      <ul className="nav-ul">
        <li>
          <NavLink
            to="/catalog"
            className={(navData) => (navData.isActive ? "active" : "")}
          >
            Browse
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/login"
            className={(navData) => (navData.isActive ? "active" : "")}
          >
            Login
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/register"
            className={(navData) => (navData.isActive ? "active" : "")}
          >
            Register
          </NavLink>
        </li>
      </ul>
    </div>
  );

  const userNavigation = (
    <div className="user right-nav">
      <ul className="nav-ul">
        <li>
          <NavLink to="/catalog">Browse</NavLink>
        </li>
        <li>
          <NavLink to="/addPhone">Add/Phone</NavLink>
        </li>
        <li>
          <NavLink to="/profile">Profile</NavLink>
        </li>
        <li>
          <NavLink to="/logout">Logout</NavLink>
        </li>
      </ul>
    </div>
  );

  return (
    <header>
      <nav className="navbar">
        <div className="logo">
          <NavLink to="/">
            <img src={home} alt="logo" className="logo-img" />
          </NavLink>
        </div>

        {user.email ? userNavigation : guestNavigation}
      </nav>
    </header>
  );
}
