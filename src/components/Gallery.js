import React, { useState, useCallback } from 'react';
import NavigationBar from '../components/NavigationBar';
import { useDropzone } from 'react-dropzone';
import '../css/Gallery.css';
//import coverImage from '../images/tate-2684212_1920.jpg';
import { FaPlus } from "react-icons/fa";


const Gallery = () => {
  const [images, setImages] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    const newImages = acceptedFiles.map((file) => URL.createObjectURL(file));
    setImages((prevImages) => [...prevImages, ...newImages]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div>
      <NavigationBar />
      <div className="gallery-section">

        <div className='gallery-text'>
          <header>Welcome to Your Personal Image Gallery</header>
          <p>Get started by uploading your first image, and enjoy a seamless and personalized gallery experience.</p>
        </div>

        <div {...getRootProps()} className="upload-area">
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <button>Upload an Image <FaPlus className='add-btn'/> </button>
          )}
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
