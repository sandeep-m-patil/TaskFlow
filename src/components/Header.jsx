import React from "react";

const Header = () => {
  return (
    <header className="bg-black text-white py-4 shadow-md">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <h1 className="text-xl sm:text-2xl font-bold">📒 TaskFlow</h1>
        <span className="text-sm sm:text-base italic">Note maker</span>
      </div>
    </header>
  );
};

export default Header;
