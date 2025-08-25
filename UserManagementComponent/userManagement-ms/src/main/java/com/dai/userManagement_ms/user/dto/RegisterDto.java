package com.dai.userManagement_ms.user.dto;

public class RegisterDto {
    private String userName;
    private String email;
    private String password;
    private String address;
    private Integer gender;
    private String role;
    
    // Constructors
    public RegisterDto() {}
    
    // Getters and Setters
    public String getUserName() { return userName; }
    public void setUserName(String userName) { this.userName = userName; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
    
    public Integer getGender() { return gender; }
    public void setGender(Integer gender) { this.gender = gender; }
    
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public boolean isValid() {
        return userName != null && !userName.trim().isEmpty()
            && email != null && !email.trim().isEmpty()
            && password != null && !password.trim().isEmpty();
    }
    
    @Override
    public String toString() {
        return "RegisterDto{" +
                "userName='" + userName + '\'' +
                ", email='" + email + '\'' +
                ", password='[PROTECTED]'" + // Don't log actual password
                ", address='" + address + '\'' +
                ", gender=" + gender +
                ", role='" + role + '\'' +
                '}';
    }
}
