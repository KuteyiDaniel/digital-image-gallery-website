import React, { useState } from 'react';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../authContext';
import { signInUser } from '../../firebase';
import '../../css/Auth.css';
import { BiShow, BiHide } from "react-icons/bi";


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { userLoggedIn } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsSigningIn(true);
    try {
      await signInUser(email, password);
      navigate('/gallery');
    } catch (error) {
      setErrorMessage(error.message);
    }
    setIsSigningIn(false);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div>
      {userLoggedIn && <Navigate to="/gallery" replace />}
      <section className="sign-in-container">
        <div className="sign-in-info">
            <header className="sign-in-info-header">Welcome back,</header>
            <p className='sign-in-instruction'>Please enter your details</p>
          <form onSubmit={onSubmit} className="">
            <div>
              <label className="">Email</label>
                <div className='field-container'>
                <input
                type="email"
                autoComplete="email"
                required
                value={email}
                className='field'
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Enter your email address'
              />
                </div>
            </div>
            <div>
              <label className="">Password</label>
                <div className='field-container'>
                    <input
                    type={passwordVisible ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    value={password}
                    className='field'
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Enter your password'
                />
                 <div className='toggle-icon' onClick={togglePasswordVisibility}>
                    {passwordVisible ? <BiHide/> : <BiShow/> }
                </div>
                </div>

               
            </div>
            {errorMessage && <span className="">{errorMessage}</span>}
            <button type="submit" disabled={isSigningIn} className='sign-in-button'>
              {isSigningIn ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
            <p className="bottom-text">
                Don't have an account? <Link to="/register">Sign up</Link>
            </p>
        </div>
      </section>
    </div>
  );
};

export default Login;
