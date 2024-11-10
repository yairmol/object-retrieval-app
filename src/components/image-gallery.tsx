import { useState, useEffect } from 'react';
import ImageWithDetections, { Detection } from './image-with-detections';


interface ImageData {
  url: string;
  detections: Detection[];
  metadata: {
    name: string;
    dimensions: string;
    [key: string]: any; // Additional metadata fields
  };
}

interface ImageGalleryProps {
  images: ImageData[];
  imagesPerPage: number
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, imagesPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (selectedIndex !== null) {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "ArrowRight") {
          setSelectedIndex((prevIndex) => (prevIndex !== null ? (prevIndex + 1) % images.length : 0));
        } else if (event.key === "ArrowLeft") {
          setSelectedIndex((prevIndex) =>
            prevIndex !== null ? (prevIndex - 1 + images.length) % images.length : images.length - 1
          );
        } else if (event.key === "Escape") {
          exitImageView(); // Return to gallery view on Escape key press
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [selectedIndex, images.length]);

  const enterImageView = (index: number) => {
    setSelectedIndex(index);
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  };

  const exitImageView = () => {
    setSelectedIndex(null);
  };

  const handleWheel = (event: React.WheelEvent) => {
    setZoom((prevZoom) => Math.max(1, prevZoom - event.deltaY * 0.001)); // Zoom in and out
  };

  const handleMouseDown = (event: React.MouseEvent) => {
    event.preventDefault();
    setIsDragging(true);
    setStartPos({ x: event.clientX - position.x, y: event.clientY - position.y });
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (isDragging) {
      setPosition({ x: event.clientX - startPos.x, y: event.clientY - startPos.y });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const totalPages = Math.ceil(images.length / imagesPerPage);
  const startIndex = (currentPage - 1) * imagesPerPage;
  const endIndex = startIndex + imagesPerPage;
  const imagesToShow = images.slice(startIndex, endIndex);

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  return (
    <div>
      {selectedIndex === null ? (
        <div
          className="grid gap-4 p-4 bg-gray-100 rounded-lg shadow-inner"
          style={{
            gridTemplateColumns: `repeat(auto-fit, minmax(150px, 1fr))`,
            gridAutoRows: "minmax(150px, auto)",
          }}
        >
          {imagesToShow.map((image, index) => (
            <div
              key={index}
              onClick={() => enterImageView(startIndex + index)}
              className="cursor-pointer transform transition-transform hover:scale-105 hover:shadow-md"
            >
              <ImageWithDetections imageUrl={image.url} detections={image.detections} />
            </div>
          ))}
        </div>
      ) : (
        <div className="fixed inset-0 flex bg-black bg-opacity-80 transition-opacity duration-300">
          {/* Main Content with Back Button */}
          <div className="relative flex-grow flex justify-center items-center">
            <button
              onClick={exitImageView}
              className="absolute top-4 left-4 bg-white text-black px-4 py-2 rounded-lg shadow hover:bg-gray-200 transition-colors"
            >
              Back to Gallery
            </button>
            <div
              className="relative"
              onWheel={handleWheel}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              style={{
                cursor: isDragging ? "grabbing" : "grab",
                transform: `scale(${zoom}) translate(${position.x}px, ${position.y}px)`,
                transition: isDragging ? "none" : "transform 0.3s ease",
              }}
            >
              <ImageWithDetections
                imageUrl={images[selectedIndex].url}
                detections={images[selectedIndex].detections}
              />
            </div>
          </div>

          {/* Metadata Sidebar */}
          <div className="w-64 bg-white text-black p-4 shadow-lg overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">Image Metadata</h2>
            <ul className="space-y-2">
              <li><strong>Name:</strong> {images[selectedIndex].metadata.name}</li>
              <li><strong>Dimensions:</strong> {images[selectedIndex].metadata.dimensions}</li>
              {/* Render additional metadata */}
              {Object.entries(images[selectedIndex].metadata).map(([key, value]) =>
                key !== 'name' && key !== 'dimensions' ? (
                  <li key={key}>
                    <strong>{key}:</strong> {value}
                  </li>
                ) : null
              )}
            </ul>
          </div>
        </div>
      )}
      {selectedIndex === null &&
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span className="text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      }
    </div>
  );
};

export default ImageGallery;
