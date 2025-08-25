package com.dai.userManagement_ms.user.dto;

import com.dai.userManagement_ms.user.User;

public class UserListDTO {
    private String id;
    private String username;
    private String email;
    private String roleName;
    
    // Private constructor to enforce factory method usage
    private UserListDTO() {}
    
    // Factory method
    public static UserListDTO fromUser(User user) {
        UserListDTO dto = new UserListDTO();
        dto.id = user.getId();
        dto.username = user.getUsername();
        dto.email = user.getEmail();
        dto.roleName = user.getRoleName();
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
    
    public String getRoleName() {
        return roleName;
    }
    
    @Override
    public String toString() {
        return "UserListDTO{" +
                "id='" + id + '\'' +
                ", username='" + username + '\'' +
                ", email='" + email + '\'' +
                ", roleName='" + roleName + '\'' +
                '}';
    }
}
