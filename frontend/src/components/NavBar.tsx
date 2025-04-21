// src/components/NavBar.tsx
import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar: React.FC = () => (
  <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top shadow-sm">
    <div className="container-fluid">
      {/* Brand navigates home on click */}
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? 'navbar-brand text-primary'
            : 'navbar-brand'
        }
      >
        Entertainment Agency
      </NavLink>

      {/* Hamburger toggler for mobile */}
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#mainNavbar"
        aria-controls="mainNavbar"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="mainNavbar">
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive
                  ? 'nav-link active'
                  : 'nav-link'
              }
            >
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/entertainers"
              className={({ isActive }) =>
                isActive
                  ? 'nav-link active'
                  : 'nav-link'
              }
            >
              Entertainers List
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/entertainers/add"
              className={({ isActive }) =>
                isActive
                  ? 'nav-link active'
                  : 'nav-link'
              }
            >
              Add Entertainer
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

export default NavBar;
