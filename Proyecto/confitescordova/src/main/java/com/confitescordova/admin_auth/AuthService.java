package com.confitescordova.admin_auth;

import com.confitescordova.admin_entities.RoleEntity;
import com.confitescordova.admin_entities.UserEntity;
import com.confitescordova.admin_jwt.JwtService;
import com.confitescordova.admin_repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;


@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
        UserDetails user = userRepository.findByUsername(request.getUsername()).orElseThrow();
        String token = jwtService.getToken(user);
        return AuthResponse.builder()
                .token(token)
                .build();
    }

    public AuthResponse register(RegisterRequest request) throws Exception {
        if (isAdmittedPassword(request.getPassword())) {
            if (isAdmittedUsername(request.getUsername())) {

                UserEntity user = UserEntity.builder()
                        .username(request.getUsername())
                        .password(passwordEncoder.encode(request.getPassword()))
                        .role(RoleEntity.MODERATOR) // por defecto es moderador
                        .build();

                userRepository.save(user);

                return AuthResponse.builder()
                        .token(jwtService.getToken(user))
                        .build();
            } else {
                throw new Exception("Intenta con otro username");
            }
        } else {
            throw new Exception("Intenta con otra password");
        }
    }


    private boolean isAdmittedPassword(String password) {
        return true;
    }

    private boolean isAdmittedUsername(String username) {
        return true;
    }
}
