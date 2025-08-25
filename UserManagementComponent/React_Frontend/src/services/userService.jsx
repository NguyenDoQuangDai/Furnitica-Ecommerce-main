import { API_ENDPOINTS, apiRequest } from "../config/api";

// GET tất cả users
export const getAllUsers = async () => {
  try {
    return await apiRequest.get(API_ENDPOINTS.USERS);
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// GET user theo ID
export const getUserById = async (id) => {
  try {
    return await apiRequest.get(API_ENDPOINTS.USER_BY_ID(id));
  } catch (error) {
    console.error(`Error fetching user ${id}:`, error);
    throw error;
  }
};

// POST tạo user mới
export const createUser = async (userData) => {
  try {
    return await apiRequest.post(API_ENDPOINTS.CREATE_USER, userData);
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

// PUT cập nhật user
export const updateUser = async (id, userData) => {
  try {
    return await apiRequest.put(API_ENDPOINTS.UPDATE_USER(id), userData);
  } catch (error) {
    console.error(`Error updating user ${id}:`, error);
    throw error;
  }
};

// DELETE user
export const deleteUser = async (id) => {
  try {
    return await apiRequest.delete(API_ENDPOINTS.DELETE_USER(id));
  } catch (error) {
    console.error(`Error deleting user ${id}:`, error);
    throw error;
  }
};