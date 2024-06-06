import React, { useRef, useState } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

const ImageEditor = ({ image, onCrop, onCancel }) => {
  const cropperRef = useRef(null);
  const [cropper, setCropper] = useState(null);

  const handleCrop = () => {
    if (cropper) {
      onCrop(cropper.getCroppedCanvas().toDataURL());
    }
  };

  return (
    <div className="image-editor">
      <Cropper
        src={image}
        style={{ height: 400, width: '100%' }}
        initialAspectRatio={1}
        guides={false}
        ref={cropperRef}
        onInitialized={(instance) => {
          setCropper(instance);
        }}
      />
      <button onClick={handleCrop}>Crop Image</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default ImageEditor;
