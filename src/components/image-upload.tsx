import React, { useState, DragEvent, ChangeEvent, MouseEvent } from 'react';
import { Button } from './ui/button';

interface ImageUploadProps {
    onSelect: (file: File) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onSelect }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      onSelect(file);
    }
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleClear = (event: MouseEvent) => {
    event.stopPropagation();
    setSelectedImage(null);
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => document.getElementById('fileInput')?.click()}
        className={`w-full max-w-md h-64 p-6 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-center cursor-pointer bg-gray-50 transition hover:bg-gray-100 ${
          selectedImage ? '' : 'flex-col'
        }`}
        style={{ position: 'relative' }}
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleImageSelect}
          className="hidden"
          id="fileInput"
        />
        {selectedImage ? (
            <>
          <img
            src={selectedImage}
            alt="Selected"
            className="w-full h-full object-cover rounded-lg"
          />
          <Button
            className="absolute top-2 right-2 z-10 opacity-80"
            onClick={handleClear}
            variant="secondary"
        >
            clear
        </Button>
        </>
        ) : (
          <>
            <p className="text-gray-600 mb-2">Drag & drop an image here</p>
            <p className="text-blue-500">or click to select a file</p>
          </>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
