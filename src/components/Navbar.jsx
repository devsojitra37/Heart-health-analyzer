import React from 'react';
import './Navbar.css';
import { HeartPulse, Sun, Moon } from 'lucide-react';

const Navbar = ({ theme, toggleTheme }) => {
  return (
    <header className="navbar">
      <div className="container navbar-container">
        <a href="/" className="navbar-logo">
          <HeartPulse className="logo-icon animate-pulse-heart" />
          <span>CardioAI</span>
        </a>
        <nav className="navbar-links">
          <a href="#about" className="nav-link">About</a>
          <a href="#features" className="nav-link">Features</a>
          <a href="#analyzer" className="nav-link">Analyzer</a>
          <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle Theme">
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
