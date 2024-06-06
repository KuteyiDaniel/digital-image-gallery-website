import React, { useState, useRef, useEffect } from 'react';
import NavigationBar from '../components/NavigationBar';
import '../css/Gallery.css';
import { FaPlus } from "react-icons/fa";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [captions, setCaptions] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [rotations, setRotations] = useState({});
  const dropAreaRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleFiles = (files) => {
    const newImages = Array.from(files).map((file) => URL.createObjectURL(file));
    const newCaptions = Array.from(files).map((file) => prompt("Enter a caption for the image:"));
    setImages((prevImages) => [...prevImages, ...newImages]);
    setCaptions((prevCaptions) => [...prevCaptions, ...newCaptions]);
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

  const rotateImage = (index) => {
    setRotations((prevRotations) => {
      const currentRotation = prevRotations[index] || 0;
      const newRotation = (currentRotation + 90) % 360;
      return { ...prevRotations, [index]: newRotation };
    });
  };

  const applyGrayscale = (index, apply) => {
    const image = document.querySelector(`#image-${index} img`);
    image.style.filter = apply ? 'grayscale(100%)' : 'none';
  };

  const openLightbox = (index) => {
    setSelectedImageIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImageIndex(null);
  };

  const showNextImage = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const showPreviousImage = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const dropArea = dropAreaRef.current;

    dropArea.addEventListener('dragover', handleDragOver);
    dropArea.addEventListener('dragleave', handleDragLeave);
    dropArea.addEventListener('drop', handleDrop);

    const handleKeyDown = (e) => {
      if (selectedImageIndex !== null) {
        if (e.key === 'ArrowRight') {
          showNextImage();
        } else if (e.key === 'ArrowLeft') {
          showPreviousImage();
        } else if (e.key === 'Escape') {
          closeLightbox();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      dropArea.removeEventListener('dragover', handleDragOver);
      dropArea.removeEventListener('dragleave', handleDragLeave);
      dropArea.removeEventListener('drop', handleDrop);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedImageIndex, images.length]);

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
            <div key={index} id={`image-${index}`} className="uploaded-image-container">
              <img
                src={image}
                alt={`Uploaded ${index}`}
                className="uploaded-image"
                style={{ 
                  transform: `rotate(${rotations[index] || 0}deg)`
                }}
                onClick={() => openLightbox(index)}
              />
              <div className="controls">
                <button onClick={() => rotateImage(index)}>Rotate Image</button>
                <button onClick={() => applyGrayscale(index, true)}>Add Filter</button>
                <button onClick={() => applyGrayscale(index, false)}>Remove Filter</button>
              </div>
            </div>
          ))}
        </div>

        {selectedImageIndex !== null && (
          <div className="lightbox" onClick={closeLightbox}>
            <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
              <button className="close-btn" onClick={closeLightbox}>&times;</button>
              <img
                src={images[selectedImageIndex]}
                alt={`Selected ${selectedImageIndex}`}
                className="lightbox-image"
                style={{ 
                  transform: `rotate(${rotations[selectedImageIndex] || 0}deg)`
                }}
              />
              <div className="caption">{captions[selectedImageIndex]}</div>
              <button className="prev-btn" onClick={showPreviousImage}>&#10094;</button>
              <button className="next-btn" onClick={showNextImage}>&#10095;</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
