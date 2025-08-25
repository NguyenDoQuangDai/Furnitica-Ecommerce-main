package com.dai.userManagement_ms.user.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import com.dai.userManagement_ms.user.User;
import com.dai.userManagement_ms.user.UserRepository;
import com.dai.userManagement_ms.user.UserService;
import com.dai.userManagement_ms.user.dto.UserListDTO;
import com.dai.userManagement_ms.user.dto.UserDetailDTO;
import com.dai.userManagement_ms.user.dto.UserUpdateDTO;
import com.dai.userManagement_ms.user.dto.RegisterDto;
import com.dai.userManagement_ms.external.ExternalUserAPI;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final ExternalUserAPI externalUserAPI;


    public UserServiceImpl(UserRepository userRepository, ExternalUserAPI externalUserAPI) {
        this.userRepository = userRepository;
        this.externalUserAPI = externalUserAPI;
    }

    @Override
    public List<UserListDTO> getAllUsers() {
        return userRepository.findAll().stream()
                .map(UserListDTO::fromUser)
                .collect(Collectors.toList());
    }

    @Override
    public boolean updateUserInfo(String id, UserUpdateDTO updateDTO) {
        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isPresent()) {
            User existingUser = optionalUser.get();
            
            // Apply updates using DTO
            updateDTO.applyToUser(existingUser);
            
            userRepository.save(existingUser);
            return true;
        }
        return false;
    }

    @Override
    public boolean deleteUser(String id) {
        try {
            if (userRepository.existsById(id)) {
                userRepository.deleteById(id);
                return true;
            }
            return false;
        } catch (org.springframework.dao.DataIntegrityViolationException e) {
            // Handle foreign key constraint violation
            System.err.println("Cannot delete user with ID " + id + 
                ": User is referenced by other records (Products, Orders, etc.)");
            return false;
        }
    }

    @Override
    public UserDetailDTO getUserById(String id) {
        return userRepository.findById(id)
                .map(UserDetailDTO::fromUser)
                .orElse(null);
    }

    // Create user method using RegisterDto
    @Override
    public String createUser(RegisterDto registerDto) {
        return externalUserAPI.createUser(registerDto);
    }

}
