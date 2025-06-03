// Header.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isDark, setIsDark] = useState(
    localStorage.getItem('theme') === 'dark'
  );

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);
    
  return (
    <header className="bg-neutral dark:bg-black transition-colors duration-300 shadow-md p-4">
      <nav className="flex justify-between items-center max-w-6xl mx-auto">
        <ul className="text-xl ml-4 text-primary dark:text-accent">
          <li><Link to="/">Jam+</Link></li>
        </ul>

        <button
          onClick={() => setIsDark(!isDark)}
          className="ml-4 md:ml-8 p-2 rounded-full bg-gray-700 text-white dark:bg-secondary dark:text-black transition"
        >
          {isDark ? 'Light Mode' : 'Dark Mode'}
        </button>
      </nav>
    </header>
  );
};

export default Header;
