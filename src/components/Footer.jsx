import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-yellow-200 p-4 text-center">
      &copy; {new Date().getFullYear()} Southern Tales. All rights reserved.
    </footer>
  );
};

export default Footer;
