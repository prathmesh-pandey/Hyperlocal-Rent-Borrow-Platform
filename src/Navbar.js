import React from 'react';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <h1>YELO</h1>
            </div>
            <ul className="navbar-links">
                <li><a href="#home">Home</a></li>
                <li><a href="#contact">Contact</a></li>
                <li><a href="#login">Login</a></li>
            </ul>
        </nav>
    );
}

export default Navbar;
