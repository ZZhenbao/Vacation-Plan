
import React from 'react';

interface ErrorDisplayProps {
  message: string;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message }) => {
  return (
    <div className="mt-8 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg" role="alert">
      <div className="flex">
        <div className="py-1">
          <svg className="fill-current h-6 w-6 text-red-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-11H9v6h2V7zm0-4h2v2H9V3z"/></svg>
        </div>
        <div>
          <p className="font-bold">An Error Occurred</p>
          <p className="text-sm">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default ErrorDisplay;
