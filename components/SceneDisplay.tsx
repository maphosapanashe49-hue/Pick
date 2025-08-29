
import React from 'react';

interface SceneDisplayProps {
  imageUrl: string | null;
  sceneText: string;
  isLoading: boolean;
}

export const SceneDisplay: React.FC<SceneDisplayProps> = ({ imageUrl, sceneText, isLoading }) => {
  return (
    <div className="w-full mb-8 text-center">
      <div className="relative w-full aspect-video bg-gray-800 rounded-lg overflow-hidden shadow-lg border-2 border-gray-700 mb-6">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Current scene"
            className="w-full h-full object-cover transition-opacity duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-gray-500">Awaiting vision...</p>
          </div>
        )}
        {isLoading && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300">
                <div className="w-10 h-10 border-4 border-t-transparent border-blue-400 rounded-full animate-spin"></div>
            </div>
        )}
      </div>
      <p className="text-lg md:text-xl leading-relaxed text-gray-300 whitespace-pre-wrap px-2">
        {sceneText}
      </p>
    </div>
  );
};
