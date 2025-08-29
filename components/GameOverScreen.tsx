
import React from 'react';

interface GameOverScreenProps {
  scene: string;
  imageUrl: string | null;
  onRestart: () => void;
}

export const GameOverScreen: React.FC<GameOverScreenProps> = ({ scene, imageUrl, onRestart }) => {
  return (
    <div className="text-center flex flex-col items-center">
        <h2 className="text-5xl font-title text-red-400 mb-6 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">The End of the Tale</h2>
      
        {imageUrl && (
            <div className="relative w-full max-w-2xl aspect-video bg-gray-800 rounded-lg overflow-hidden shadow-lg border-2 border-gray-700 mb-6">
                <img src={imageUrl} alt="Final scene" className="w-full h-full object-cover" />
            </div>
        )}
      
      <p className="text-lg md:text-xl leading-relaxed text-gray-300 mb-8 max-w-2xl">{scene}</p>
      
      <button
        onClick={onRestart}
        className="px-8 py-3 bg-blue-700 text-white font-bold text-xl rounded-lg shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105 duration-300 font-title tracking-wider"
      >
        Forge a New Destiny
      </button>
    </div>
  );
};
