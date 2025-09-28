
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-500 mr-3" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.71,2.29a1,1,0,0,0-1.42,0l-9,9a1,1,0,0,0,0,1.42A1,1,0,0,0,3,13H4v7.33A2.67,2.67,0,0,0,6.67,23H9.33a2.67,2.67,0,0,0,2.67-2.67V18h4v2.33A2.67,2.67,0,0,0,18.67,23h2.66A2.67,2.67,0,0,0,24,20.33V13h1a1,1,0,0,0,.71-1.71l-9-9A1,1,0,0,0,12.71,2.29ZM22,12H20V6.69L14,12.69V16h2v4.33a.67.67,0,0,1-.67.67H18V18a2,2,0,0,0-2-2H12a2,2,0,0,0-2,2v3a.67.67,0,0,1-.67.67H6.67A.67.67,0,0,1,6,20.33V12H4.42l7.29-7.29Z"/>
        </svg>
        <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
          Vacation Planner <span className="text-blue-500">AI</span>
        </h1>
      </div>
    </header>
  );
};

export default Header;
