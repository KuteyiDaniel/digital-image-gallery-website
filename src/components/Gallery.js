import React, { useState, useRef, useEffect } from 'react';
import NavigationBar from '../components/NavigationBar';
import '../css/Gallery.css';
import { FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoMdRemoveCircleOutline, IoMdAdd } from "react-icons/io";
import { FaArrowRotateLeft } from "react-icons/fa6";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [captions, setCaptions] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [rotations, setRotations] = useState({});
  const [visibility, setVisibility] = useState({});
  const [captionModal, setCaptionModal] = useState(false);
  const [newCaption, setNewCaption] = useState('');
  const [captionIndex, setCaptionIndex] = useState(null);
  const dropAreaRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleFiles = (files) => {
    const newImages = Array.from(files).map((file) => URL.createObjectURL(file));
    setImages((prevImages) => [...prevImages, ...newImages]);
    setCaptions((prevCaptions) => [...prevCaptions, ...Array(files.length).fill('')]);
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

  const applySaturate = (index, level) => {
    const image = document.querySelector(`#image-${index} img`);
    image.style.filter = `saturate(${level}%)`;
  };

  const deleteImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setCaptions((prevCaptions) => prevCaptions.filter((_, i) => i !== index));
    setRotations((prevRotations) => {
      const newRotations = { ...prevRotations };
      delete newRotations[index];
      return newRotations;
    });
    setVisibility((prevVisibility) => {
      const newVisibility = { ...prevVisibility };
      delete newVisibility[index];
      return newVisibility;
    });
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

  const displayEditingOption = (index) => {
    setVisibility((prevVisibility) => ({
      ...prevVisibility,
      [index]: !prevVisibility[index]
    }));
  };

  const openCaptionModal = (index) => {
    setCaptionIndex(index);
    setNewCaption(captions[index]);
    setCaptionModal(true);
  };

  const closeCaptionModal = () => {
    setCaptionModal(false);
    setCaptionIndex(null);
    setNewCaption('');
  };

  const saveCaption = () => {
    setCaptions((prevCaptions) => {
      const newCaptions = [...prevCaptions];
      newCaptions[captionIndex] = newCaption;
      return newCaptions;
    });
    closeCaptionModal();
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
              <div className="caption">{captions[index]}</div>
              <button onClick={() => displayEditingOption(index)} className='edit-header'>
                {visibility[index] ? 'Stop editing' : 'Edit image'}
              </button>
              <button onClick={() => openCaptionModal(index)} className='edit-header ml'>
                {captions[index] ? 'Edit Caption' : 'Add Caption'}
              </button>
              <div className="controls" style={{ display: visibility[index] ? 'block' : 'none' }}>
                <button onClick={() => rotateImage(index)}>Rotate <FaArrowRotateLeft /> </button>
                <button onClick={() => applySaturate(index, 400)}>Add Filter <IoMdAdd /></button>
                <button onClick={() => applySaturate(index, 100)}>Remove Filter <IoMdRemoveCircleOutline /> </button>
                <button className='delete' onClick={() => deleteImage(index)}>Delete <MdDelete /> </button>
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

        {captionModal && (
          <div className="caption-modal">
            <div className="caption-modal-content">
              <h2>Image Caption</h2>
              <textarea
                value={newCaption}
                onChange={(e) => setNewCaption(e.target.value)}
              />
              <button className='edit-header' onClick={saveCaption}>Save</button>
              <button className='edit-header ml' onClick={closeCaptionModal}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
