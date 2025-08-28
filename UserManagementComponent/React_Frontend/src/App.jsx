import React, { useState, useEffect } from 'react';
import { authService } from './services/authService';
import LoginForm from './LoginForm';
import UsersList from './UsersList';
import Header from './Header';
import ProtectedRoute from './ProtectedRoute';
import './App.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null); // eslint-disable-line no-unused-vars

  // Check authentication status on app start
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    setIsLoading(true);
    
    try {
      const isAuth = authService.isAuthenticated();
      const userData = authService.getCurrentUser();
      
      setIsAuthenticated(isAuth);
      setCurrentUser(userData);
      
      console.log('Auth status checked:', { 
        isAuthenticated: isAuth, 
        user: userData?.userName 
      });
    } catch (error) {
      console.error('Auth check error:', error);
      setIsAuthenticated(false);
      setCurrentUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginSuccess = (userData) => {
    console.log('Login successful, updating app state');
    setIsAuthenticated(true);
    setCurrentUser(userData);
  };

  const handleLogout = () => {
    console.log('Logout triggered, updating app state');
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  const handleSwitchToRegister = () => {
    // TODO: Implement registration form or redirect to registration
    console.log('Switch to register clicked - not implemented yet');
    alert('Registration feature will be implemented soon!');
  };

  // Loading screen
  if (isLoading) {
    return (
      <div className="app-loading">
        <div className="loading-spinner"></div>
        <p>Loading application...</p>
      </div>
    );
  }

  // Render based on authentication status
  return (
    <div className="app">
      {isAuthenticated ? (
        // Authenticated user interface - Only Admin can access
        <div className="app-authenticated">
          <Header onLogout={handleLogout} />
          <main className="app-main">
            {/* Only Admin users can access User Management */}
            <ProtectedRoute adminOnly={true}>
              <UsersList />
            </ProtectedRoute>
          </main>
        </div>
      ) : (
        // Login interface
        <div className="app-unauthenticated">
          <LoginForm 
            onLoginSuccess={handleLoginSuccess}
            onSwitchToRegister={handleSwitchToRegister}
          />
        </div>
      )}
    </div>
  );
};

export default App;
