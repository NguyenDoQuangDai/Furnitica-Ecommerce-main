import React, { useState, useEffect } from 'react';
import { authService } from './services/authService';
import { validateLoginData } from './types/auth';
import './LoginForm.css';
import logo from './assets/img/logo.png';

const LoginForm = ({ onLoginSuccess, onSwitchToRegister }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [validated, setValidated] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  // Check if user is already logged in
  useEffect(() => {
    if (authService.isAuthenticated()) {
      console.log('User already authenticated, redirecting...');
      onLoginSuccess && onLoginSuccess();
    }
  }, [onLoginSuccess]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (error) {
      setError(null);
      setShowMessage(false);
    }
  };

  const isValid = () => {
    return formData.username.length > 0 && formData.password.length > 0;
  };

  const closeMessage = () => {
    setShowMessage(false);
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setLoading(true);
    setValidated(true);
    setShowMessage(false);
    setError(null);
    
    // Client-side validation
    if (!isValid()) {
      setLoading(false);
      setError('Please fill in all required fields');
      setShowMessage(true);
      return;
    }

    // Additional validation using auth types
    const validation = validateLoginData(formData);
    if (!validation.isValid) {
      setLoading(false);
      setError(validation.errors.join(', '));
      setShowMessage(true);
      return;
    }

    try {
      console.log('Attempting login...');
      
      const result = await authService.login(formData);
      
      if (result.success) {
        setSuccessMessage('Login successful! Redirecting...');
        setShowMessage(true);
        
        // Call success callback after short delay
        setTimeout(() => {
          onLoginSuccess && onLoginSuccess(result.userData);
        }, 1500);
      }
      
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'Login failed. Please check your credentials.');
      setShowMessage(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <img src={logo} alt="Furnitica Logo" className="logo" />
          <h2>Welcome Back</h2>
          <p>Sign in to your account to continue</p>
        </div>

        <div className="login-body">
          {/* Error/Success Messages */}
          {showMessage && (error || successMessage) && (
            <div className={`message ${error ? 'error-message' : 'success-message'}`}>
              <span>{error || successMessage}</span>
              <button 
                type="button" 
                className="close-message-btn"
                onClick={closeMessage}
              >
                ×
              </button>
            </div>
          )}

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input 
                type="text" 
                id="username"
                value={formData.username} 
                onChange={(e) => handleInputChange('username', e.target.value)}
                className="form-input"
                placeholder="Enter your username"
                required
                disabled={loading}
              />
              {formData.username.length === 0 && validated && (
                <span className="invalid-data">* Username is required!</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input 
                type="password" 
                id="password"
                value={formData.password} 
                onChange={(e) => handleInputChange('password', e.target.value)}
                className="form-input"
                placeholder="Enter your password"
                required
                disabled={loading}
              />
              {formData.password.length === 0 && validated && (
                <span className="invalid-data">* Password is required!</span>
              )}
            </div>

            <div className="forgot-password">
              <a href="#" onClick={(e) => e.preventDefault()}>
                Forgot your password?
              </a>
            </div>

            <button 
              type="submit" 
              className="login-btn"
              disabled={loading || !isValid()}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  <span className="btn-text">Signing In...</span>
                </>
              ) : (
                <span className="btn-text">Sign In</span>
              )}
            </button>
          </form>

          <div className="login-footer">
            <p>
              Don't have an account?{' '}
              <button 
                type="button"
                className="switch-btn"
                onClick={onSwitchToRegister}
                disabled={loading}
              >
                Register here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
