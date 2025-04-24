import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <span className="logo">🏠 Rentigo</span>
      </div>

      <div className="navbar-center">
        <input type="text" placeholder="Search for items to borrow..." className="search-bar" />
      </div>

      <div className="navbar-right">
        <a href="#">Browse</a>
        <a href="#">How it works</a>
        <button className="login-btn">Login</button>
        <button className="signup-btn">Sign up</button>
        <Link to="/lend" className="list-btn">List an item</Link>
      </div>
    </nav>
  );
};

export default Navbar;