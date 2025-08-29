
import React from 'react';

interface LoadingStateProps {
    message: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ message }) => {
  return (
    <div className="text-center">
      <div className="w-16 h-16 border-8 border-t-transparent border-blue-500 rounded-full animate-spin mx-auto mb-6"></div>
      <p className="text-xl text-gray-400">{message}</p>
    </div>
  );
};
