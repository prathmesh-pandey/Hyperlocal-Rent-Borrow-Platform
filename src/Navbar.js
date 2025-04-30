import React, { useState } from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    navigate(`/rent?search=${value}`);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <span className="logo">🏠 Rentigo</span>
      </div>

      <div className="navbar-center">
        <input
          type="text"
          placeholder="Search for items to borrow..."
          className="search-bar"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      <div className="navbar-right">
        <a href="/map">Map View</a>
        <button className="login-btn">Login</button>
        <button className="signup-btn">Sign up</button>
        <Link to="/lend" className="list-btn">List an item</Link>
      </div>
    </nav>
  );
};

export default Navbar;
