import React, { useState } from 'react';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../authContext';
import { createUser } from '../../firebase.js';
import '../../css/Auth.css';
import { BiShow, BiHide } from "react-icons/bi";
///import { togglePasswordVisibility } from './Login.js';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { userLoggedIn } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }
    setIsRegistering(true);
    try {
      await createUser(email, password);
      navigate('/gallery');
    } catch (error) {
      setErrorMessage(error.message);
    }
    setIsRegistering(false);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <>
      {userLoggedIn && <Navigate to="/gallery" replace={true} />}

      <section  className="sign-in-container">
        <div className="sign-in-info">
            <header className="sign-in-info-header margin-header">Create Account</header>
          <form onSubmit={onSubmit} className="">
            <div>
              <label className="">Email</label>
              <input
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="field"
                placeholder='Enter your email'
              />

              
            </div>

            <div>
              <label className="">Password</label>
                <div className='field-container'>
                <input
                    type={passwordVisible ? 'text' : 'password'}
                    autoComplete="new-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="field"
                    placeholder='Enter a password'
                />

                    <div className='toggle-icon' onClick={togglePasswordVisibility}>
                        {passwordVisible ? <BiHide/> : <BiShow/> }
                    </div>
                </div>
            </div>

            <div>
              <label className="">Confirm Password</label>
                <div className='field-container'>
                <input
                      type={passwordVisible ? 'text' : 'password'}
                    autoComplete="off"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="field"
                    placeholder='Confirm the password'
                />

                    <div className='toggle-icon' onClick={togglePasswordVisibility}>
                        {passwordVisible ? <BiHide/> : <BiShow/> }
                    </div>
                </div>
            </div>

            {errorMessage && <span className="error-message">{errorMessage}</span>}

            <button
              type="submit"
              disabled={isRegistering}
              className={`sign-in-button ${isRegistering ? '' : ''}`}
            >
              {isRegistering ? 'Signing Up...' : 'Sign Up'}
            </button>
          </form>
          <p className="bottom-text">Already have an account? <Link to="/login" className="">Sign in</Link></p>
        </div>
      </section>
    </>
  );
};

export default Register;
