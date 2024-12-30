package com.confitescordova.admin_auth;

import com.confitescordova.admin_entities.RoleEntity;
import com.confitescordova.admin_entities.UserEntity;
import com.confitescordova.admin_jwt.JwtService;
import com.confitescordova.admin_repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
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
        // Autentica al usuario
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));

        // Obtiene los detalles del usuario desde la base de datos
        UserEntity user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));

        // Genera el token
        String token = jwtService.getToken(user);

        // Retorna el token y el rol del usuario
        return AuthResponse.builder()
                .token(token)
                .role(user.getRole().name()) // Convierte el enum RoleEntity a String
                .build();
    }

    public AuthResponse register(RegisterRequest request) throws Exception {
        if (isAdmittedPassword(request.getPassword())) {
            if (isAdmittedUsername(request.getUsername())) {
                // Validar que el rol sea uno de los permitidos: MODERATOR o ANALYST
                RoleEntity role = null;

                try {
                    // Convertir el rol desde el String recibido
                    role = RoleEntity.fromString(request.getRole());
                } catch (Exception e) {
                    // Si el rol no es válido (no es MODERATOR ni ANALYST), lanzamos un error
                    throw new Exception("Rol " + request.getRole() + " no permitido.");
                }

                // Si el rol es ADMIN o cualquier otro que no sea MODERATOR o ANALYST, lanzamos un error
                if (role == RoleEntity.ADMIN || role == RoleEntity.OTHER) {
                    throw new Exception("Rol " + request.getRole() + " no permitido.");
                }
                if (role != RoleEntity.MODERATOR && role != RoleEntity.ANALYST) {
                    throw new Exception("Rol " + request.getRole() + " no permitido.");
                }

                // Si el rol es MODERATOR o ANALYST, se asigna al usuario
                UserEntity user = UserEntity.builder()
                        .username(request.getUsername())
                        .password(passwordEncoder.encode(request.getPassword()))
                        .role(role) // Asignar el rol que fue validado
                        .email(request.getEmail())
                        .firstname(request.getFirstname())
                        .lastname(request.getLastname())
                        .build();

                // Guardar el usuario en la base de datos
                userRepository.save(user);

                // Retornar la respuesta con el token JWT
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
