package com.dai.userManagement_ms.user.dto;

import com.dai.userManagement_ms.user.User;

public class UserDetailDTO {
    private String id;
    private String username;
    private String email;
    private String phoneNumber;
    private String address;
    private Integer gender;
    private String roleName;
    private Integer imageId;
    
    // Private constructor to enforce factory method usage
    private UserDetailDTO() {}
    
    // Factory method
    public static UserDetailDTO fromUser(User user) {
        UserDetailDTO dto = new UserDetailDTO();
        dto.id = user.getId();
        dto.username = user.getUsername();
        dto.email = user.getEmail();
        dto.phoneNumber = user.getPhoneNumber();
        dto.address = user.getAddress();
        dto.gender = user.getGender();
        dto.roleName = user.getRoleName();
        dto.imageId = user.getImageId();
        return dto;
    }
    
    // Getters only (immutable DTO)
    public String getId() {
        return id;
    }
    
    public String getUsername() {
        return username;
    }
    
    public String getEmail() {
        return email;
    }
    
    public String getPhoneNumber() {
        return phoneNumber;
    }
    
    public String getAddress() {
        return address;
    }
    
    public Integer getGender() {
        return gender;
    }
    
    public String getRoleName() {
        return roleName;
    }
    
    public Integer getImageId() {
        return imageId;
    }
    
    @Override
    public String toString() {
        return "UserDetailDTO{" +
                "id='" + id + '\'' +
                ", username='" + username + '\'' +
                ", email='" + email + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", address='" + address + '\'' +
                ", gender=" + gender +
                ", roleName='" + roleName + '\'' +
                ", imageId=" + imageId +
                '}';
    }
}
