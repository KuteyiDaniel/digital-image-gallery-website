import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../css/Slider.css';  // Import the CSS file

const TextSlider = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500, // Adjusted to 500ms
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000, // Adjusted to 2000ms
        pauseOnHover: true,
        arrows: false
    };

    return (
        <Slider {...settings}>
            <div className="slider-slide">
                <h2>Upload Images</h2>
                <p>Easily upload your images with our user-friendly interface.</p>
            </div>
            <div className="slider-slide">
                <h2>Manage Your Gallery</h2>
                <p>Organize and manage your image collection in one place.</p>
            </div>
            <div className="slider-slide">
                <h2>Share with Friends</h2>
                <p>Share your favorite images on social media with a click.</p>
            </div>
        </Slider>
    );
};

export default TextSlider;