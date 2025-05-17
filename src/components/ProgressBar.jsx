// ProgressBar.jsx
import React from 'react';

const ProgressBar = ({ progress }) => {
  return (
   <div className="w-full max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="font-semibold text-lg">Total Progress</h2>
        <span className="text-gray-700 font-medium">{progress}%</span>
      </div>
      <div className="w-full h-4 bg-gray-200 rounded-full">
        <div
          className="h-full bg-black rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
