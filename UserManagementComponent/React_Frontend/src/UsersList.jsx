import React, { useState, useEffect, useMemo } from 'react';
import { getAllUsers, deleteUser } from './services/userService';
import UserDetail from './UserDetail';
import CreateUserModal from './CreateUserModal';
import './UsersList.css';
import logo from './assets/img/logo.png';

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  
  // UserDetail state
  const [showUserDetail, setShowUserDetail] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  
  // Create User Modal state
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Load users from API
  const loadUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedUsers = await getAllUsers();
      setUsers(fetchedUsers);
    } catch (err) {
      setError('Failed to load users. Please try again later.');
      console.error('Error loading users:', err);
    } finally {
      setLoading(false);
    }
  };

  // Load users on component mount
  useEffect(() => {
    loadUsers();
  }, []);

  // Delete user
  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        setLoading(true);
        await deleteUser(userId);
        await loadUsers(); // Reload users after deletion
      } catch (err) {
        setError('Failed to delete user. Please try again.');
        console.error('Error deleting user:', err);
      } finally {
        setLoading(false);
      }
    }
  };

  // View user details
  const handleViewUser = (userId) => {
    setSelectedUserId(userId);
    setShowUserDetail(true);
  };

  // Close user detail modal
  const handleCloseUserDetail = () => {
    setShowUserDetail(false);
    setSelectedUserId(null);
  };

  // User updated callback
  const handleUserUpdated = () => {
    loadUsers(); // Reload users when user is updated
  };

  // Close create user modal
  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
  };

  // User created callback
  const handleUserCreated = () => {
    loadUsers(); // Reload users when user is created
    setShowCreateModal(false);
  };

  // Filter users based on search term
  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      // Exclude users without username
      if (!user.username || user.username.trim() === '') {
        return false;
      }
      
      // Apply search filter
      return (
        user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.roleName?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }, [users, searchTerm]);

  // Sort users
  const sortedUsers = useMemo(() => {
    if (!sortConfig.key) return filteredUsers;

    return [...filteredUsers].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue === null || aValue === undefined) return 1;
      if (bValue === null || bValue === undefined) return -1;

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [filteredUsers, sortConfig]);

  // Pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(sortedUsers.length / usersPerPage);

  // Handle sorting
  const handleSort = (key) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  // Get sort icon
  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return '↕️';
    return sortConfig.direction === 'asc' ? '↑' : '↓';
  };

  return (
    <div className="users-list-container">
      {/* Logo Header */}
      <div className="logo-header">
        <a href={import.meta.env.VITE_ANGULAR_APP_URL || "http://localhost:4200/"} className="logo-link">
          <img src={logo} alt="Furnitica Logo" className="logo-image" />
        </a>
      </div>

      <div className="main-content">
        <div className="header">
          <h2>User Management Menu</h2>
        </div>

        {/* Search and Add User */}
        <div className="controls">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <button 
            className="btn btn-primary"
            onClick={() => setShowCreateModal(true)}
            disabled={loading}
          >
            Add New User
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="error-message">
            <span>❌ {error}</span>
            <button 
              className="btn btn-secondary"
              onClick={loadUsers}
              disabled={loading}
            >
              Retry
            </button>
          </div>
        )}

        {/* Loading Indicator */}
        {loading && (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <span>Loading users...</span>
          </div>
        )}

        {/* Users Table */}
        {!loading && (
          <div className="table-container">
            <table className="users-table">
              <thead>
                <tr>
                  <th onClick={() => handleSort('username')} className="sortable">
                    Username {getSortIcon('username')}
                  </th>
                  <th onClick={() => handleSort('email')} className="sortable">
                    Email {getSortIcon('email')}
                  </th>
                  <th onClick={() => handleSort('roleName')} className="sortable">
                    Role {getSortIcon('roleName')}
                  </th>
                  <th onClick={() => handleSort('gender')} className="sortable">
                    Gender {getSortIcon('gender')}
                  </th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="no-data">
                      {searchTerm ? 'No users found matching your search.' : 'No users available.'}
                    </td>
                  </tr>
                ) : (
                  currentUsers.map((user) => (
                    <tr key={user.id}>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>
                        <span className={`role-badge ${(user.roleName || 'client').toLowerCase()}`}>
                          {user.roleName || 'Client'}
                        </span>
                      </td>
                      <td>
                        <span className={`gender-badge ${user.gender === 0 ? 'male' : 'female'}`}>
                          {user.gender === 0 ? 'Male' : 'Female'}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button
                            className="btn btn-info btn-sm"
                            onClick={() => handleViewUser(user.id)}
                            title="View Details"
                          >
                            👁️ View
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDelete(user.id)}
                            title="Delete User"
                            disabled={loading}
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="pagination">
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <span className="page-info">
                  Page {currentPage} of {totalPages} 
                  ({sortedUsers.length} users total)
                </span>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* User Detail Modal */}
      {showUserDetail && (
        <UserDetail
          isOpen={showUserDetail}
          userId={selectedUserId}
          onClose={handleCloseUserDetail}
          onUserUpdated={handleUserUpdated}
        />
      )}

      {/* Create User Modal */}
      {showCreateModal && (
        <CreateUserModal
          isOpen={showCreateModal}
          onClose={handleCloseCreateModal}
          onUserCreated={handleUserCreated}
        />
      )}
    </div>
  );
}
