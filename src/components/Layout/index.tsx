/* eslint-disable react/prop-types */
import React from 'react';
import Navbar from '../Navbar';
import Sidebar from '../Sidebar';

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className='h-screen flex overflow-hidden bg-gray-100'>
      <Sidebar />
      <div className='flex-1 overflow-auto focus:outline-none'>
        <Navbar />
        <main className='flex-1 relative pb-8 z-0 overflow-y-auto '>
          {children}
        </main>
      </div>
    </div>
  );
};

export const Section: React.FC<Props> = ({ children }) => {
  return (
    <div className='mt-5 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
      {children}
    </div>
  );
};

export default Layout;
