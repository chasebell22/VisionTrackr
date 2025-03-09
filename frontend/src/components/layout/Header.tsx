import React from 'react';
import { useAuth } from '../../context/AuthContext';

const Header: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-primary-600">VisionTrackr</h1>
          </div>
          <div className="flex items-center">
            <span className="mr-4 text-gray-700">Welcome, {user?.name || 'User'}</span>
            <button
              onClick={logout}
              className="btn btn-outline"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 