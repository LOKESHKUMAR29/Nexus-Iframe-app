import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import '../App.css';

const Sidebar = ({ menuItems, isCollapsed, toggleSidebar }) => {
  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
         <div className="logo">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="url(#logo-gradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 17L12 22L22 17" stroke="url(#logo-gradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 12L12 17L22 12" stroke="url(#logo-gradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <defs>
                <linearGradient id="logo-gradient" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                <stop stopColor="#a855f7"/>
                <stop offset="1" stopColor="#7c3aed"/>
                </linearGradient>
            </defs>
            </svg>
            <span className="logo-text">Nexus<span style={{color: 'var(--accent)'}}>App</span></span>
        </div>
        <button className="collapse-btn" onClick={toggleSidebar} title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}>
            {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <ul className="nav-links">
        {menuItems.map((item, index) => (
          <li 
            key={index} 
            className={`nav-item ${item.active ? 'active' : ''}`}
            onClick={item.onClick}
            title={isCollapsed ? item.label : ''}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
