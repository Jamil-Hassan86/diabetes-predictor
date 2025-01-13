// Header.js
import React from 'react';
import { Link } from 'react-router-dom';  // Using Link instead of <a> for client-side navigation

const Header = () => {
  return (
    <header className="header  bg-gray-100">
      <nav>
        <ul className='text-xl ml-4 text-blue-600'>
          <li><Link to="/">Jam+</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;