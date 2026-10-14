import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from './themecontext';
import { useAuth } from './authcontext';

const ResponsiveNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { currentUser, logout } = useAuth() || {};
  const navigate = useNavigate();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLoginClick = () => {
    navigate('/login');
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  const handleAdminClick = () => {
    navigate('/admin');
    setIsMenuOpen(false);
  };
  const handleTrackingClick = () => {
    navigate('/tracking');
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar responsive-navbar">
      <div className="logo">
        <img src="logo.png" alt="FixMyStreet Logo" />
      </div>
      
      <button 
        className={`hamburger-menu ${isMenuOpen ? 'open' : ''}`}
        onClick={toggleMenu} 
        aria-expanded={isMenuOpen}
        aria-label="Toggle navigation menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      
      <div className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
        <a href="#features" onClick={() => setIsMenuOpen(false)}>Features</a>
        <a href="#how-it-works" onClick={() => setIsMenuOpen(false)}>How It Works</a>
        <a href="#testimonials" onClick={() => setIsMenuOpen(false)}>Impact</a>
        <a href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</a>

        <button 
          className="btn-tracking" 
          onClick={handleTrackingClick}
        >
          Track Progress
        </button>
        
        <button 
          className="theme-toggle-inline" 
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
        
        {currentUser ? (
          <div className="user-menu">
            <span className="user-greeting">Hello, {currentUser.name}</span>
            <button className="btn-secondary" onClick={handleLogout}>Logout</button>
            {currentUser.isAdmin && (
              <button className="btn-admin" onClick={handleAdminClick}>Admin Panel</button>
            )}
          </div>
        ) : (
          <button className="btn-login" onClick={handleLoginClick}>Login</button>
        )}
        
        <button className="btn-primary">Report Issue</button>
      </div>
    </nav>
  );
};

export default ResponsiveNavbar;
