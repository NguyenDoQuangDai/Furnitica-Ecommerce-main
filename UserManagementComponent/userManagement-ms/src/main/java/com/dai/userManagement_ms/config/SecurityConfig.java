package com.dai.userManagement_ms.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    
    @Autowired
    private CorsConfigurationSource corsConfigurationSource;
    
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable())  // Disable CSRF for API usage
            .cors(cors -> cors.configurationSource(corsConfigurationSource))  // Enable CORS with custom config
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/users/**").authenticated()  // Require authentication for user endpoints
                .requestMatchers("/api/**").authenticated()    // Require authentication for API endpoints
                .anyRequest().authenticated())  // Require authentication for all requests
            .httpBasic(basic -> basic.realmName("Spring Boot API"))  // Enable HTTP Basic Auth
            .formLogin(form -> form.disable())    // Disable form login
            .sessionManagement(session -> session.disable());  // Disable sessions (stateless)

        return http.build();
    }
}
