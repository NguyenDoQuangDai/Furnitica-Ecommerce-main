import React, { useState } from 'react';
import { createUser } from './services/userService';
import './CreateUserModal.css';

const CreateUserModal = ({ 
  isOpen, 
  onClose, 
  onUserCreated 
}) => {
  const [formData, setFormData] = useState({
    userName: '',  // userName để match với UserDTO
    email: '',     // Email  
    address: '',   // Address
    gender: 0,     // Gender (0=Male, 1=Female)
    password: '',  // Password
    confirmPassword: '', // Confirm Password
    role: 'Client' // Role selection
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [passwordErrors, setPasswordErrors] = useState([]);

  const validatePassword = (password) => {
    const errors = [];
    
    if (password.length < 8) {
      errors.push('Password must be at least 8 characters long');
    }
    
    if (!/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }
    
    if (!/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }
    
    if (!/[0-9]/.test(password)) {
      errors.push('Password must contain at least one digit');
    }
    
    if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) {
      errors.push('Password must contain at least one special character');
    }
    
    return errors;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Validate password in real-time
    if (field === 'password') {
      const errors = validatePassword(value);
      setPasswordErrors(errors);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.userName.trim()) {
      setError('Username is required');
      return;
    }
    if (!formData.email.trim()) {
      setError('Email is required');
      return;
    }
    if (!formData.password.trim()) {
      setError('Password is required');
      return;
    }
    
    // Password validation
    const passwordValidationErrors = validatePassword(formData.password);
    if (passwordValidationErrors.length > 0) {
      setError('Password does not meet requirements: ' + passwordValidationErrors.join(', '));
      return;
    }
    
    if (!formData.address.trim()) {
      setError('Address is required');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setSuccessMessage('');
      
      // Debug log the data being sent
      console.log('Creating user with data:', formData);
      
      // Validate confirm password
      if (formData.password !== formData.confirmPassword) {
        setError('Password and Confirm Password do not match');
        return;
      }

      // Prepare data for DotNet API via UserDTO format
      const apiData = {
        userName: formData.userName,
        email: formData.email,
        address: formData.address,
        gender: formData.gender,
        password: formData.password,
        role: formData.role
        // Don't send confirmPassword
      };
      
      console.log('Data sent to API:', JSON.stringify(apiData, null, 2));
      
      await createUser(apiData);
      setSuccessMessage('User created successfully!');
      
      // Reset form
      setFormData({
        userName: '',
        email: '',
        address: '',
        gender: 0,
        password: '',
        confirmPassword: '',
        role: 'Client'
      });
      
      // Call callback to refresh parent component
      if (onUserCreated) {
        onUserCreated();
      }
      
      // Auto close after 2 seconds
      setTimeout(() => {
        handleClose();
      }, 2000);
      
    } catch (err) {
      setError('Failed to create user: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      userName: '',
      email: '',
      address: '',
      gender: 0,
      password: '',
      confirmPassword: '',
      role: 'Client'
    });
    setError(null);
    setSuccessMessage('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content create-user-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Create New User</h2>
          <button className="close-btn" onClick={handleClose}>×</button>
        </div>
        
        <div className="modal-body">
          {error && (
            <div className="error-message">
              ⚠️ {error}
            </div>
          )}

          {successMessage && (
            <div className="success-message">
              ✅ {successMessage}
            </div>
          )}
          
          <form className="create-user-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="userName">Username:</label>
              <input 
                type="text" 
                id="userName"
                value={formData.userName} 
                onChange={(e) => handleInputChange('userName', e.target.value)}
                className="form-input"
                placeholder="Enter username"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input 
                type="email" 
                id="email"
                value={formData.email} 
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="form-input"
                placeholder="Enter email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input 
                type="password" 
                id="password"
                value={formData.password} 
                onChange={(e) => handleInputChange('password', e.target.value)}
                className="form-input"
                placeholder="Enter password"
                required
              />
              {passwordErrors.length > 0 && (
                <div className="password-requirements">
                  <p className="requirements-title">Password requirements:</p>
                  <ul className="requirements-list">
                    {passwordErrors.map((error, index) => (
                      <li key={index} className="requirement-error">❌ {error}</li>
                    ))}
                  </ul>
                </div>
              )}
              {formData.password && passwordErrors.length === 0 && (
                <div className="password-valid">
                  ✅ Password meets all requirements
                </div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <input 
                type="password" 
                id="confirmPassword"
                value={formData.confirmPassword} 
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                className="form-input"
                placeholder="Confirm your password"
                required
              />
              {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                <div className="password-error">
                  ❌ Passwords do not match
                </div>
              )}
              {formData.confirmPassword && formData.password === formData.confirmPassword && formData.password && (
                <div className="password-valid">
                  ✅ Passwords match
                </div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="address">Address:</label>
              <textarea 
                id="address"
                value={formData.address} 
                onChange={(e) => handleInputChange('address', e.target.value)}
                className="form-textarea"
                placeholder="Enter address"
                rows="3"
                required
              />
            </div>

            <div className="form-group">
              <label>Gender:</label>
              <div className="radio-group">
                <label className="radio-label">
                  <input 
                    type="radio" 
                    name="gender"
                    value={0}
                    checked={formData.gender === 0}
                    onChange={(e) => handleInputChange('gender', parseInt(e.target.value))}
                  />
                  <span className="radio-custom"></span>
                  Male
                </label>
                <label className="radio-label">
                  <input 
                    type="radio" 
                    name="gender"
                    value={1}
                    checked={formData.gender === 1}
                    onChange={(e) => handleInputChange('gender', parseInt(e.target.value))}
                  />
                  <span className="radio-custom"></span>
                  Female
                </label>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="role">Role:</label>
              <select 
                id="role"
                value={formData.role}
                onChange={(e) => handleInputChange('role', e.target.value)}
                className="form-select"
                required
              >
                <option value="Client">Client</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
          </form>
        </div>
        
        <div className="modal-footer">
          <button 
            type="submit"
            className="btn btn-primary" 
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create User'}
          </button>
          <button className="btn btn-secondary" onClick={handleClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateUserModal;
