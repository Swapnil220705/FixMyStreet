import React, { useState, useRef } from 'react';

const ImageUploadPreview = ({ onImageSelected }) => {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.match('image.*')) {
      setError('Please select an image file (png, jpg, jpeg)');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image must be less than 5MB');
      return;
    }

    // Clear previous errors
    setError(null);

    // Create preview URL
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result);
      if (onImageSelected) {
        onImageSelected(file);
      }
    };
    reader.readAsDataURL(file);
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const removeImage = () => {
    setPreviewUrl(null);
    fileInputRef.current.value = '';
    if (onImageSelected) {
      onImageSelected(null);
    }
  };

  return (
    <div className="image-upload-container">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="file-input"
        aria-label="Upload photo of issue"
      />
      
      <div className="upload-controls">
        <button 
          type="button" 
          className="btn-outline" 
          onClick={triggerFileInput}
        >
          {previewUrl ? 'Change Image' : 'Choose File'}
        </button>
        
        {previewUrl && (
          <button 
            type="button" 
            className="btn-outline btn-danger" 
            onClick={removeImage}
          >
            Remove
          </button>
        )}
      </div>
      
      {error && <p className="error-text">{error}</p>}
      
      {previewUrl && (
        <div className="image-preview">
          <img src={previewUrl} alt="Preview of issue" />
          <p className="image-preview-caption">Preview of uploaded image</p>
        </div>
      )}
    </div>
  );
};

// Usage example in MapPreview component
const ImageUploadExample = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageSelected = (file) => {
    setSelectedImage(file);
    console.log("Image selected:", file);
  };

  return (
    <div className="form-group">
      <label>Upload Photo</label>
      <ImageUploadPreview onImageSelected={handleImageSelected} />
    </div>
  );
};

export default ImageUploadPreview;