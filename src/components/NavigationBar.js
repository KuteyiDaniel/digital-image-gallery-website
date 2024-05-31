// src/components/NavBar.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../css/NavigationBar.css'

const NavigationBar = () => {
  return (
    <nav className='navigation-bar'>
      <ul className='naviagtion-content'>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
    </nav>
  );
};

export default NavigationBar;
