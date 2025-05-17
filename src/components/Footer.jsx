import React from "react";

const Footer = () => {
  return (
    <footer className="mt-10 bg-gray-100 text-gray-600 py-4 text-center text-sm">
      <p>
        &copy; {new Date().getFullYear()} TaskFlow by Sandeep. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
