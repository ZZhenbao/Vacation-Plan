
import React from 'react';

interface ImageDisplayProps {
  imageUrl: string | null;
  isLoading: boolean;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ imageUrl, isLoading }) => {
  if (isLoading) {
    return (
      <div className="w-full aspect-video bg-gray-300 rounded-2xl animate-pulse shadow-lg"></div>
    );
  }

  if (!imageUrl) {
    return null;
  }

  return (
    <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200">
      <img 
        src={imageUrl} 
        alt="AI-generated destination" 
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default ImageDisplay;
