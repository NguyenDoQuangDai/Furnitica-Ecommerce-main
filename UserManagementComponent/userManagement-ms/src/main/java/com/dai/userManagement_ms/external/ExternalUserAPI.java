package com.dai.userManagement_ms.external;

import com.dai.userManagement_ms.user.dto.RegisterDto;

public interface ExternalUserAPI {
    String createUser(RegisterDto registerDto);
}
