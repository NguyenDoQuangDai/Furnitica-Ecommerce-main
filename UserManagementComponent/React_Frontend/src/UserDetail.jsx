import React, { useState, useEffect } from 'react';
import { getUserById, updateUser } from './services/userService.jsx';
import './UserDetail.css';

const UserDetail = ({ 
  isOpen, 
  onClose, 
  userId,
  onUserUpdated 
}) => {
  const [userDetail, setUserDetail] = useState(null);
  const [editedUser, setEditedUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [copyIdMessage, setCopyIdMessage] = useState('');

  useEffect(() => {
    const fetchUserDetail = async () => {
      try {
        setLoading(true);
        setError(null);
        setSuccessMessage('');
        const data = await getUserById(userId);
        setUserDetail(data);
        setEditedUser({
          id: data.id,
          username: data.username || '',
          email: data.email || '',
          address: data.address || '',
          phoneNumber: data.phoneNumber || '',
          imageId: data.imageId || '',
          gender: data.gender !== null ? data.gender : 0, // 0=Male, 1=Female
          roleName: data.roleName || 'Client' // Use data.roleName from API
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen && userId) {
      fetchUserDetail();
    }
  }, [isOpen, userId]);

  const handleInputChange = (field, value) => {
    setEditedUser(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCopyId = async () => {
    if (editedUser.id) {
      try {
        await navigator.clipboard.writeText(editedUser.id.toString());
        setCopyIdMessage('ID copied to clipboard!');
        setTimeout(() => setCopyIdMessage(''), 2000);
      } catch {
        setCopyIdMessage('Failed to copy ID');
        setTimeout(() => setCopyIdMessage(''), 2000);
      }
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError(null);
      setSuccessMessage('');
      
      await updateUser(userId, editedUser);
      setSuccessMessage('User updated successfully!');
      
      // Update the original userDetail state
      setUserDetail(editedUser);
      
      // Call the callback to refresh parent component
      if (onUserUpdated) {
        onUserUpdated();
      }
      
    } catch (err) {
      setError('Failed to update user: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleClose = () => {
    setUserDetail(null);
    setEditedUser({});
    setError(null);
    setSuccessMessage('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>User Details & Edit</h2>
          <button className="close-btn" onClick={handleClose}>×</button>
        </div>
        
        <div className="modal-body">
          {loading && <div className="loading">Loading user details...</div>}
          
          {error && (
            <div className="error-message">
              Error: {error}
            </div>
          )}

          {successMessage && (
            <div className="success-message">
              {successMessage}
            </div>
          )}

          {copyIdMessage && (
            <div className="copy-id-message">
              {copyIdMessage}
            </div>
          )}
          
          {userDetail && editedUser && (
            <form className="user-edit-form">
              <div className="form-group">
                <label htmlFor="userId">ID:</label>
                <div className="id-input-container">
                  <input 
                    type="text" 
                    id="userId"
                    value={editedUser.id || ''} 
                    readOnly 
                    className="form-input readonly clickable-id"
                    onClick={handleCopyId}
                    title="Click to copy ID"
                  />
                  <button 
                    type="button" 
                    className="copy-id-btn"
                    onClick={handleCopyId}
                    title="Copy ID to clipboard"
                  >
                    📋
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input 
                  type="text" 
                  id="username"
                  value={editedUser.username || ''} 
                  onChange={(e) => handleInputChange('username', e.target.value)}
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
                  value={editedUser.email || ''} 
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="form-input"
                  placeholder="Enter email"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="address">Address:</label>
                <textarea 
                  id="address"
                  value={editedUser.address || ''} 
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className="form-textarea"
                  placeholder="Enter address"
                  rows="3"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phoneNumber">Phone Number:</label>
                <input 
                  type="tel" 
                  id="phoneNumber"
                  value={editedUser.phoneNumber || ''} 
                  onChange={(e) => {
                    // Only allow numbers
                    const value = e.target.value.replace(/[^0-9]/g, '');
                    handleInputChange('phoneNumber', value);
                  }}
                  className="form-input"
                  placeholder="Enter phone number (numbers only)"
                  pattern="[0-9]*"
                />
              </div>

              <div className="form-group">
                <label htmlFor="imageId">Image ID:</label>
                <input 
                  type="number" 
                  id="imageId"
                  value={editedUser.imageId || ''} 
                  onChange={(e) => handleInputChange('imageId', e.target.value)}
                  className="form-input"
                  placeholder="Enter image ID (numbers only)"
                  min="0"
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
                      checked={editedUser.gender === 0}
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
                      checked={editedUser.gender === 1}
                      onChange={(e) => handleInputChange('gender', parseInt(e.target.value))}
                    />
                    <span className="radio-custom"></span>
                    Female
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label>Role:</label>
                <div className="role-display">
                  <span className={`current-role-badge ${(editedUser.roleName || 'client').toLowerCase()}`}>
                    {editedUser.roleName || 'Client'}
                  </span>
                </div>
              </div>
            </form>
          )}
        </div>
        
        <div className="modal-footer">
          <button 
            className="btn btn-primary" 
            onClick={handleSave}
            disabled={saving || loading}
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
          <button className="btn btn-secondary" onClick={handleClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;