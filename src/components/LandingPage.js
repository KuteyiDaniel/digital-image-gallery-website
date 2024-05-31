import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IoMdArrowRoundForward } from "react-icons/io";
import '../css/LandingPage.css';
import coverImage from '../images/tate-2684212_1920.jpg';
import TextSlider from './TextSlider';
//import NavigationBar from './NavigationBar';
  //<NavigationBar/>

const LandingPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/login'); // Navigate to the login page
  };

  return (
    <div className='main-container'>
    
      <img className='overlay-image' alt='cover-img' src={coverImage}/>
      
      <div className='container'>

        <div className='container-content'>
          <h1 className='welcome-text'>
            Welcome to <span className='company-name'>Pixel</span>: Your Digital Image Gallery
          </h1>

          <TextSlider/>

          <div>
            <button onClick={handleGetStarted} className='hvr-icon-wobble-horizontal'>
              Get Started <IoMdArrowRoundForward className='hvr-icon'/>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
