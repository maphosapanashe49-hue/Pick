
import React from 'react';

interface StartScreenProps {
  onStart: () => void;
}

export const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <div className="text-center flex flex-col items-center justify-center p-8 bg-black bg-opacity-20 rounded-lg">
      <h1 className="text-6xl md:text-8xl font-title text-blue-300 mb-4 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
        Gemini Adventure
      </h1>
      <p className="text-xl text-gray-400 mb-8 max-w-xl">
        An epic journey crafted by AI. Every choice forges a new path in a world that has never been seen before.
      </p>
      <button
        onClick={onStart}
        className="px-10 py-4 bg-blue-700 text-white font-bold text-2xl rounded-lg shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105 duration-300 font-title tracking-widest"
      >
        Begin Your Tale
      </button>
    </div>
  );
};
