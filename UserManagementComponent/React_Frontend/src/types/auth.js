// Authentication Data Transfer Objects (DTOs)

// Login request data
export const LoginDTO = {
  username: '',
  password: ''
};

// Registration request data  
export const RegisterDTO = {
  username: '',
  email: '',
  password: '',
  address: '',
  gender: 0, // 0 = Male, 1 = Female
  role: 'Client'
};

// User profile data (returned from API)
export const UserProfileDTO = {
  id: '',
  userName: '',
  email: '',
  address: '',
  phoneNumber: '',
  gender: 0,
  imageId: null
};

// Complete login response
export const LoggedInUserDTO = {
  userData: UserProfileDTO,
  token: '',
  expiration: ''
};

// Gender enum
export const Gender = {
  MALE: 0,
  FEMALE: 1,
  UNDEFINED: -1
};

// Role enum
export const Role = {
  CLIENT: 'Client',
  ADMIN: 'Admin',
  OWNER: 'Owner'
};

// Validation functions
export const validateLoginData = (loginData) => {
  const errors = [];
  
  if (!loginData.username || loginData.username.trim().length === 0) {
    errors.push('Username is required');
  }
  
  if (!loginData.password || loginData.password.trim().length === 0) {
    errors.push('Password is required');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateRegisterData = (registerData) => {
  const errors = [];
  
  if (!registerData.username || registerData.username.trim().length === 0) {
    errors.push('Username is required');
  }
  
  if (!registerData.email || registerData.email.trim().length === 0) {
    errors.push('Email is required');
  }
  
  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (registerData.email && !emailRegex.test(registerData.email)) {
    errors.push('Invalid email format');
  }
  
  if (!registerData.password || registerData.password.trim().length === 0) {
    errors.push('Password is required');
  }
  
  // Password strength validation
  if (registerData.password && registerData.password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  
  if (!registerData.address || registerData.address.trim().length === 0) {
    errors.push('Address is required');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

export default {
  LoginDTO,
  RegisterDTO,
  UserProfileDTO,
  LoggedInUserDTO,
  Gender,
  Role,
  validateLoginData,
  validateRegisterData
};
