package com.dai.userManagement_ms.user.dto;

public class UserUpdateDTO {
    private String username;
    private String email;
    private String phoneNumber;
    private String address;
    private Integer gender;
    private Integer imageId;
    
    // Default constructor for JSON deserialization
    public UserUpdateDTO() {}
    
    // Factory method to apply updates to existing User
    public void applyToUser(com.dai.userManagement_ms.user.User user) {
        if (this.username != null && !this.username.trim().isEmpty()) {
            user.setUsername(this.username.trim());
        }
        if (this.email != null && !this.email.trim().isEmpty()) {
            user.setEmail(this.email.trim());
        }
        if (this.phoneNumber != null) {
            user.setPhoneNumber(this.phoneNumber.trim().isEmpty() ? null : this.phoneNumber.trim());
        }
        if (this.address != null && !this.address.trim().isEmpty()) {
            user.setAddress(this.address.trim());
        }
        if (this.gender != null) {
            user.setGender(this.gender);
        }
        if (this.imageId != null) {
            user.setImageId(this.imageId);
        }
    }
    
    // Getters and Setters
    public String getUsername() {
        return username;
    }
    
    public void setUsername(String username) {
        this.username = username;
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    public String getPhoneNumber() {
        return phoneNumber;
    }
    
    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
    
    public String getAddress() {
        return address;
    }
    
    public void setAddress(String address) {
        this.address = address;
    }
    
    public Integer getGender() {
        return gender;
    }
    
    public void setGender(Integer gender) {
        this.gender = gender;
    }
    
    public Integer getImageId() {
        return imageId;
    }
    
    public void setImageId(Integer imageId) {
        this.imageId = imageId;
    }
    
    @Override
    public String toString() {
        return "UserUpdateDTO{" +
                "username='" + username + '\'' +
                ", email='" + email + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", address='" + address + '\'' +
                ", gender=" + gender +
                ", imageId=" + imageId +
                '}';
    }
}
