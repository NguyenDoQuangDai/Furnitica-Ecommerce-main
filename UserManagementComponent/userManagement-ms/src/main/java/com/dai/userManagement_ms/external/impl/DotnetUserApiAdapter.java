package com.dai.userManagement_ms.external.impl;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.dai.userManagement_ms.external.ExternalUserAPI;
import com.dai.userManagement_ms.user.dto.RegisterDto;

@Service
public class DotnetUserApiAdapter implements ExternalUserAPI{
    private RestTemplate restTemplate;
    private static final String DOTNET_API_BASE_URL = "https://localhost:7231/api/Auth";

    public DotnetUserApiAdapter(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @Override
    public String createUser(RegisterDto registerDto) {
        try {
            System.out.println("DotnetUserApiAdapter received: " + registerDto.toString());
            
            // Validation
            if (registerDto.getUserName() == null || registerDto.getUserName().trim().isEmpty()) {
                return "UserName cannot be null or empty";
            }
            if (registerDto.getEmail() == null || registerDto.getEmail().trim().isEmpty()) {
                return "Email cannot be null or empty";
            }
            if (registerDto.getPassword() == null || registerDto.getPassword().trim().isEmpty()) {
                return "Password cannot be null or empty";
            }
            
            System.out.println("Sending to DotNet API: " + registerDto.toString());
            
            // Prepare HTTP headers
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            
            // Create HTTP entity - send RegisterDto directly to DotNet API
            HttpEntity<RegisterDto> request = new HttpEntity<>(registerDto, headers);
            
            // Call DotNetWebAPI Register endpoint
            ResponseEntity<String> response = restTemplate.postForEntity(
                DOTNET_API_BASE_URL + "/register", 
                request, 
                String.class
            );
            
            if (response.getStatusCode().is2xxSuccessful()) {
                return "User created successfully via DotNetAPI: " + response.getBody();
            } else {
                return "Failed to create user via DotNetAPI: " + response.getStatusCode();
            }
            
        } catch (Exception e) {
            return "Error calling DotNetWebAPI: " + e.getMessage();
        }
    }
    
}
