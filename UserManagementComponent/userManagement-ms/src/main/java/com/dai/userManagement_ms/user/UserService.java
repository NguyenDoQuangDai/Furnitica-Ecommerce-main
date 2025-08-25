package com.dai.userManagement_ms.user;

import java.util.List;

import com.dai.userManagement_ms.user.dto.UserListDTO;
import com.dai.userManagement_ms.user.dto.UserDetailDTO;
import com.dai.userManagement_ms.user.dto.UserUpdateDTO;
import com.dai.userManagement_ms.user.dto.RegisterDto;

public interface UserService {
    List<UserListDTO> getAllUsers();
    boolean updateUserInfo(String id, UserUpdateDTO updateDTO);
    boolean deleteUser(String id);
    UserDetailDTO getUserById(String id);
    String createUser(RegisterDto registerDto);
}
