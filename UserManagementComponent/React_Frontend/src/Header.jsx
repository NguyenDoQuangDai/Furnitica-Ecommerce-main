import React, { useState, useEffect } from 'react';
import { authService } from './services/authService';
import './Header.css';
import logo from './assets/img/logo.png';

const Header = ({ onLogout }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    // Get current user data
    const userData = authService.getCurrentUser();
    setCurrentUser(userData);
  }, []);

  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      await authService.logout();
      
      // Call parent logout callback
      if (onLogout) {
        onLogout();
      }
    } catch (error) {
      console.error('Logout error:', error);
      // Still proceed with logout even if API call fails
      if (onLogout) {
        onLogout();
      }
    } finally {
      setLoggingOut(false);
    }
  };

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showUserMenu && !event.target.closest('.logout-menu-container')) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showUserMenu]);

  return (
    <header className="app-header">
      <div className="header-content">
        <div className="header-left">
          <img src={logo} alt="Furnitica Logo" className="header-logo" />
          <h1 className="app-title">Furnitica Admin Panel</h1>
        </div>

        <div className="header-right">
          {currentUser && (
            <div className="user-info">
              <span className="welcome-text">Welcome, {currentUser.userName}</span>
              <div className="logout-menu-container">
                <button 
                  className="logout-trigger-btn"
                  onClick={toggleUserMenu}
                  disabled={loggingOut}
                >
                  {loggingOut ? (
                    <>
                      <span className="spinner-small"></span>
                      Logging out...
                    </>
                  ) : (
                    <>
                      🚪 Logout
                    </>
                  )}
                </button>

                {showUserMenu && !loggingOut && (
                  <div className="logout-dropdown">
                    <div className="logout-confirm-content">
                      <h4>Confirm Logout</h4>
                      <p>Are you sure you want to logout?</p>
                      <div className="logout-actions">
                        <button 
                          className="confirm-logout-btn"
                          onClick={handleLogout}
                        >
                          Yes, Logout
                        </button>
                        <button 
                          className="cancel-logout-btn"
                          onClick={() => setShowUserMenu(false)}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
