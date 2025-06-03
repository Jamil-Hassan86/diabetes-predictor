import React from 'react';

const Footer = () => {
  return (
    <footer>
      <p className="text-secondary dark:text-gray-400">
        &copy; {new Date().getFullYear()} Jam+ Diabetes Predictor. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
