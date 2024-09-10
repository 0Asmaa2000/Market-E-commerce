import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Electronics from './../Electronics/Electronics';
import Men from '../Men/Men';
import Woman from '../Woman/Woman'

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative ">
      <button
        id="dropdownNavbarLink"
        onClick={toggleDropdown}
        className="flex z-10 items-center justify-between font-semibold  text-slate-800  rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
      >
        Categories
        <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
        </svg>
      </button>
      {isOpen && (
        <div
          id="dropdownNavbar"
          className="absolute z-50 auto  bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
        >
          <ul className="py-2 text-sm  text-gray-700 z-10 dark:text-gray-400">
            <li>
              <Link to="/elctronics" className="block  px-4 py-2 z-10 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" >Electronics</Link>
            </li>
            <li>
              <Link to="/men" className="block px-4 py-2 z-10 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Men's Fashion</Link>
            </li>
            <li>
              <Link to="/woman" className="block px-4 py-2 z-10 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Womans's Fashion</Link>
            </li>
          </ul>
          
        </div>
      )}
    </div>
  );
};

export default Dropdown;
