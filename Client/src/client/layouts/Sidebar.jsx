import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-inner">
        <ul className="sidebar-menu text-center">
          <li className="sidebar-item">
            <Link to="/" className="sidebar-link">Home</Link>
          </li>
          <li className="sidebar-item">
            <Link to="/about" className="sidebar-link">About</Link>
          </li>
          <li className="sidebar-item">
            <Link to="/contact" className="sidebar-link">Contact</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
