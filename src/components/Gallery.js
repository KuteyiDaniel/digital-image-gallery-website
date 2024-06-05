import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import NavigationBar from '../components/NavigationBar';
import '../css/Gallery.css';
// import coverImage from '../images/tate-2684212_1920.jpg';
import { FaPlus } from "react-icons/fa";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [testData, setTestData] = useState(null);
  const dropAreaRef = useRef(null);
  const fileInputRef = useRef(null);

  const apiKey = '4ebff93391msh582bcc3f48da787p1d1d46jsnb339cb8acb54';
  const url = 'https://thefosk-instafilterio.p.rapidapi.com/blackandwhite';

  useEffect(() => {
    axios.post(url, {
      headers: {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': 'thefosk-instafilterio.p.rapidapi.com'
      }
    }).then(response => {
      setTestData(response.data);
      console.log(response.data);
    }).catch(error => {
      console.error("There was an error with the API request:", error);
    });
  }, [url]);

  const handleFiles = (files) => {
    const newImages = Array.from(files).map((file) => URL.createObjectURL(file));
    setImages((prevImages) => [...prevImages, ...newImages]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropAreaRef.current.classList.add('dragging');
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropAreaRef.current.classList.remove('dragging');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropAreaRef.current.classList.remove('dragging');
    const files = e.dataTransfer.files;
    handleFiles(files);
  };

  const handleFileSelect = (e) => {
    const files = e.target.files;
    handleFiles(files);
  };

  useEffect(() => {
    const dropArea = dropAreaRef.current;

    dropArea.addEventListener('dragover', handleDragOver);
    dropArea.addEventListener('dragleave', handleDragLeave);
    dropArea.addEventListener('drop', handleDrop);

    return () => {
      dropArea.removeEventListener('dragover', handleDragOver);
      dropArea.removeEventListener('dragleave', handleDragLeave);
      dropArea.removeEventListener('drop', handleDrop);
    };
  }, []);



  return (
    <div>
      <NavigationBar />
      <div className="gallery-section">

        <div className='gallery-text'>
          <header>Welcome to Your Personal Image Gallery</header>
          <p>Get started by uploading your first image, and enjoy a seamless and personalized gallery experience.</p>
        </div>

        <div ref={dropAreaRef} className="upload-area" onClick={() => fileInputRef.current.click()}>
          <input
            type="file"
            multiple
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileSelect}
          />

          <button>Upload an Image <FaPlus className='add-btn' /></button>
        </div>

        <div className="image-gallery">
          {images.map((image, index) => (
            <img src={image} alt={`Uploaded ${index}`} key={index} className="uploaded-image" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
