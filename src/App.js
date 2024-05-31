import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider, useAuth } from './authContext';
import LandingPage from './components/LandingPage';
import Login from './components/auth-components/Login';
import Gallery from './components/Gallery';
import ImageUpload from './components/ImageUpload';
// import NavigationBar from './components/NavigationBar';

const App = () => {
  //const { isAuthenticated } = useAuth();

  return (
    <Router>
      {/* {isAuthenticated && <NavigationBar />} */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/upload" element={<ImageUpload />} />
      </Routes>
    </Router>
  );
};

const WrappedApp = () => (
   <AuthProvider>
    <App />
   </AuthProvider>
);

export default WrappedApp;
