package com.dai.userManagement_ms.user;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.dai.userManagement_ms.user.dto.UserListDTO;
import com.dai.userManagement_ms.user.dto.UserDetailDTO;
import com.dai.userManagement_ms.user.dto.UserUpdateDTO;
import com.dai.userManagement_ms.user.dto.RegisterDto;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;


@RestController
@RequestMapping("/users")
public class UserController {
    private final UserService userService;
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<List<UserListDTO>> getAllUsers() {
        return new ResponseEntity<List<UserListDTO>>(userService.getAllUsers(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDetailDTO> getUserById(@PathVariable String id) {
        UserDetailDTO userDetailDTO = userService.getUserById(id);
        if (userDetailDTO != null) {
            return new ResponseEntity<UserDetailDTO>(userDetailDTO, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Boolean> updateUserInfo(@PathVariable String id, @RequestBody UserUpdateDTO updateDTO) {
        boolean isUpdated = userService.updateUserInfo(id, updateDTO);
        if (isUpdated) {
            return new ResponseEntity<>(true, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(false, HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable String id) {
        try {
            boolean isDeleted = userService.deleteUser(id);
            if (isDeleted) {
                return new ResponseEntity<>("User deleted successfully", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("User not found or cannot be deleted", HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            // Check if it's a foreign key constraint violation
            if (e.getMessage().contains("REFERENCE constraint") || 
                e.getMessage().contains("FK_Products_AspNetUsers_OwnerId")) {
                return new ResponseEntity<>("Cannot delete user: User owns products or has related data", HttpStatus.CONFLICT);
            }
            return new ResponseEntity<>("Error deleting user: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @PostMapping("/create")
    public ResponseEntity<String> createUser(@RequestBody RegisterDto createDTO) {
        System.out.println("Received UserCreateDTO: " + createDTO.toString());
        
        // Validate required fields
        if (!createDTO.isValid()) {
            return new ResponseEntity<>("Missing required fields: username, email, or password", HttpStatus.BAD_REQUEST);
        }
        
        String result = userService.createUser(createDTO);
        
        System.out.println("Create user result: " + result);
        
        if (result.contains("successfully")) {
            return new ResponseEntity<>(result, HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
        }
    }
    
}
