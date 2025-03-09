import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  HomeIcon, 
  HeartIcon, 
  LightBulbIcon, 
  EyeIcon, 
  FlagIcon, 
  CalendarIcon 
} from '@heroicons/react/24/outline';

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors ${
          isActive
            ? 'bg-primary-100 text-primary-700'
            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
        }`
      }
    >
      <span className="mr-3 h-5 w-5">{icon}</span>
      {label}
    </NavLink>
  );
};

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 bg-white shadow-sm z-10 border-r border-gray-200">
      <div className="h-full flex flex-col py-6">
        <div className="px-4 mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Navigation</h2>
        </div>
        <nav className="flex-1 px-2 space-y-1">
          <NavItem to="/" icon={<HomeIcon />} label="Dashboard" />
          <NavItem to="/values" icon={<HeartIcon />} label="Core Values" />
          <NavItem to="/mission-purpose" icon={<LightBulbIcon />} label="Mission & Purpose" />
          <NavItem to="/visions" icon={<EyeIcon />} label="Visions" />
          <NavItem to="/goals" icon={<FlagIcon />} label="Goals" />
          <NavItem to="/daily-planner" icon={<CalendarIcon />} label="Daily Planner" />
        </nav>
      </div>
    </div>
  );
};

export default Sidebar; 