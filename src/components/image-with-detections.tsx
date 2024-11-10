import { useState } from 'react';
import { Button } from './ui/button';
import Image from 'next/image';

export interface Detection {
  x: number;
  y: number;
  width: number;
  height: number;
  className: string;
  confidence: number;
}

interface ImageWithDetectionsProps {
  imageUrl: string;
  detections: Detection[];
}

const ImageWithDetections: React.FC<ImageWithDetectionsProps> = ({ imageUrl, detections }) => {
  const [showDetections, setShowDetections] = useState(true);
  const [hoveredDetection, setHoveredDetection] = useState<number | null>(null);

  const toggleDetections = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setShowDetections(!showDetections);
  };

  return (
    <div className="p-1 bg-white shadow-lg rounded-lg">
      <div className="relative inline-block">
        {/* Make the image container relative with no padding/margin */}
        {/* <img src={imageUrl} alt="Retrieved" className="block w-full h-auto rounded-lg" /> */}
        <Image
          src={imageUrl}
          alt="Retrieved Image"
          layout="responsive"
          width={500}
          height={300}
          className="rounded-lg"
        />
        {showDetections &&
          detections.map((detection, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredDetection(index)}
              onMouseLeave={() => setHoveredDetection(null)}
              className="absolute border-2 border-blue-400 bg-blue-500 bg-opacity-10 hover:bg-opacity-25 rounded-lg shadow-sm transition-all duration-200"
              style={{
                left: `${detection.x * 100}%`,
                top: `${detection.y * 100}%`,
                width: `${detection.width * 100}%`,
                height: `${detection.height * 100}%`
              }}
            >
                {hoveredDetection === index && (
                <div
                  className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded shadow-lg z-10"
                  style={{
                    whiteSpace: 'nowrap',
                  }}
                >
                  {`${detection.className} (${(detection.confidence * 100).toFixed(1)}%)`}
                </div>
              )}
              </div>
          ))}
        <Button
            className="absolute top-2 right-2 z-10 opacity-80"
            onClick={toggleDetections}
            variant="secondary"
        >
        {showDetections ? 'Hide Detections' : 'Show Detections'}
        </Button>
      </div>
      {/* <button
        onClick={toggleDetections}
        className="mt-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-2 px-4 rounded-lg shadow-md hover:from-blue-600 hover:to-indigo-600 transition-colors"
      >
        {showDetections ? "Hide Detections" : "Show Detections"}
      </button> */}
    </div>
  );
};

export default ImageWithDetections;
