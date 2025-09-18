
import React from 'react';
import type { View } from '../types';
import StethoscopeIcon from './icons/StethoscopeIcon';

interface HeaderProps {
  currentView: View;
  setView: (view: View) => void;
}

const NavLink: React.FC<{
  label: string;
  viewName: View;
  currentView: View;
  setView: (view: View) => void;
}> = ({ label, viewName, currentView, setView }) => {
  const isActive = currentView === viewName;
  return (
    <button
      onClick={() => setView(viewName)}
      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
        isActive
          ? 'text-white bg-sky-600'
          : 'text-slate-600 hover:bg-sky-100 hover:text-sky-800'
      }`}
    >
      {label}
    </button>
  );
};

const Header: React.FC<HeaderProps> = ({ currentView, setView }) => {
  return (
    <header className="bg-white/80 backdrop-blur-lg sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div 
            className="flex items-center cursor-pointer"
            onClick={() => setView('home')}
          >
            <StethoscopeIcon className="h-8 w-8 text-sky-600" />
            <span className="ml-3 text-2xl font-bold text-slate-800">CareConnect AI</span>
          </div>
          <nav className="hidden md:flex items-center space-x-2">
            <NavLink label="Home" viewName="home" currentView={currentView} setView={setView} />
            <NavLink label="Health Analysis" viewName="analysis" currentView={currentView} setView={setView} />
            <NavLink label="My Records" viewName="records" currentView={currentView} setView={setView} />
          </nav>
          <div className="flex items-center">
            <button
              onClick={() => setView('booking')}
              className="px-6 py-2.5 bg-sky-600 text-white font-semibold rounded-full shadow-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 transition-transform duration-200 hover:scale-105"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
