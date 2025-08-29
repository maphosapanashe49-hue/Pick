
import React from 'react';

interface ChoiceButtonsProps {
  choices: string[];
  onChoiceSelect: (choice: string) => void;
  disabled: boolean;
}

export const ChoiceButtons: React.FC<ChoiceButtonsProps> = ({ choices, onChoiceSelect, disabled }) => {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
      {choices.map((choice, index) => (
        <button
          key={index}
          onClick={() => onChoiceSelect(choice)}
          disabled={disabled}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg shadow-md text-gray-300 hover:bg-gray-700 hover:border-blue-400 disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          {choice}
        </button>
      ))}
    </div>
  );
};
