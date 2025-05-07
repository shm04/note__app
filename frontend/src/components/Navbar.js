import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const location = useLocation();

  return (
    <nav className="vertical">
      <ul>
        <li>
          <Link
            to="/"
            className={`link ${location.pathname === "/" ? "active" : ""}`}
          >
            <img
              src={`${process.env.PUBLIC_URL}/images/notes.png`}
              alt="Notes"
            />
            Notes
          </Link>
        </li>
        <li>
          <Link
            to="/archived"
            className={`link ${
              location.pathname === "/archived" ? "active" : ""
            }`}
          >
            <img
              src={`${process.env.PUBLIC_URL}/images/archive.png`}
              alt="Archive"
            />
            Archive
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
