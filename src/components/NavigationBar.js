import React from 'react';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom'
import { useAuth } from '../authContext';
import '../css/NavigationBar.css'

const NavigationBar = () => {
  const { signOutUser } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOutUser();
    navigate('/login');
  };

  return (
    <div className='navigation-bar'>
      <nav className='navigation-content'>
        <NavLink to="/" className='company-logo'>
          <header>Pixel</header>
        </NavLink>
        <div><button className='sign-out-button' onClick={handleSignOut}>Sign Out</button></div>
      </nav>
    </div>
  );
};

export default NavigationBar;
