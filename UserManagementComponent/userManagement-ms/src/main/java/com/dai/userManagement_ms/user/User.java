package com.dai.userManagement_ms.user;

import org.hibernate.annotations.Formula;

import jakarta.persistence.*;

@Entity
@Table(name = "AspNetUsers")
public class User {

    @Id
    private String id;

    @Column(name = "UserName")
    private String username;
    
    @Column(name = "Email")
    private String email;
    
    @Column(name = "PhoneNumber")
    private String phoneNumber;
    
    @Column(name = "Address")
    private String address;
    
    @Column(name = "Gender")
    private Integer gender;
    
    @Column(name = "PasswordHash")
    private String passwordHash;
    
    @Formula("(SELECT TOP 1 r.Name FROM AspNetRoles r JOIN AspNetUserRoles ur ON r.Id = ur.RoleId WHERE ur.UserId = Id)")
    private String roleName;

    @Column(name = "ImageId")
    private Integer imageId;

    // Removed passwordHash for security - user creation now handled by DotNetWebAPI
    
    public String getRoleName() {
        return roleName;
    }

    // Role is read-only from @Formula, no setter needed
    
    public User() {
    }

    public String getId() {
        return id;
    }

    // ID is typically auto-generated, but keeping setter for flexibility
    public void setId(String id) {
        this.id = id;
    }

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

    public String getPasswordHash() {
        return passwordHash;
    }

    public void setPasswordHash(String passwordHash) {
        this.passwordHash = passwordHash;
    }

    public Integer getImageId() {
        return imageId;
    }

    public void setImageId(Integer imageId) {
        this.imageId = imageId;
    }

    @Override
    public String toString() {
        return "User{" +
                "id='" + id + '\'' +
                ", username='" + username + '\'' +
                ", email='" + email + '\'' +
                ", address='" + address + '\'' +
                ", gender=" + gender +
                ", roleName='" + roleName + '\'' +
                ", imageId=" + imageId +
                '}';
    }
}
