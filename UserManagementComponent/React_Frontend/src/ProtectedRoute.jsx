import React from 'react';
import { authService } from './services/authService';
import './ProtectedRoute.css';

const ProtectedRoute = ({ 
  children, 
  requiredRole = null, 
  adminOnly = false,
  fallbackComponent = null 
}) => {
  
  // Check if user is authenticated
  if (!authService.isAuthenticated()) {
    return (
      <div className="access-denied">
        <div className="access-denied-content">
          <h2>🔐 Authentication Required</h2>
          <p>You need to be logged in to access this page.</p>
          <button 
            className="back-to-login-btn"
            onClick={() => window.location.reload()}
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  // Check admin-only access
  if (adminOnly && !authService.isAdmin()) {
    // Debug token content - always show in console for debugging
    console.log('=== Admin Access Check Debug ===');
    authService.debugToken();
    console.log('isAdmin():', authService.isAdmin());
    console.log('getRoleFromToken():', authService.getRoleFromToken());
    console.log('getCurrentUser():', authService.getCurrentUser());

    const tokenRole = authService.getRoleFromToken();
    const currentUser = authService.getCurrentUser();
    
    return (
      <div className="access-denied">
        <div className="access-denied-content">
          <h2>🔒 Admin Access Required</h2>
          <p>This is the <strong>User Management Admin Panel</strong>. Only administrators can access this area.</p>
          <div className="user-info">
            <p>Logged in as: <strong>{currentUser?.userName || 'Unknown User'}</strong></p>
            <p>Role from API: <strong>{currentUser?.role || 'Not Set'}</strong></p>
            <p>Role from Token: <strong>{tokenRole || 'Not Found'}</strong></p>
            <p>Required role: <strong>Admin</strong></p>
          </div>
          <div className="access-denied-actions">
            <button 
              className="logout-btn"
              onClick={() => {
                authService.logout();
                window.location.reload();
              }}
            >
              Logout & Return to Login
            </button>
          </div>
          <div className="help-text">
            <p><small>💡 Contact your system administrator if you need admin access.</small></p>
          </div>
        </div>
      </div>
    );
  }

  // Check specific role requirement
  if (requiredRole && !authService.hasRole(requiredRole)) {
    return (
      <div className="access-denied">
        <div className="access-denied-content">
          <h2>🚫 Insufficient Permissions</h2>
          <p>You don't have the required role to access this page.</p>
          <div className="permission-info">
            <p>Required role: <strong>{requiredRole}</strong></p>
            <p>Your role: <strong>{authService.getCurrentUser()?.role || 'Unknown'}</strong></p>
          </div>
          <div className="access-denied-actions">
            <button 
              className="logout-btn"
              onClick={() => {
                authService.logout();
                window.location.reload();
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  }

  // If fallback component is provided and user doesn't meet requirements
  if (fallbackComponent && 
      ((adminOnly && !authService.isAdmin()) || 
       (requiredRole && !authService.hasRole(requiredRole)))) {
    return fallbackComponent;
  }

  // User has proper permissions, render children
  return children;
};

export default ProtectedRoute;
