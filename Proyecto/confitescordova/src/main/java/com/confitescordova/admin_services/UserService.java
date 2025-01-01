package com.confitescordova.admin_services;

import com.confitescordova.admin_entities.RoleEntity;
import com.confitescordova.admin_entities.UserEntity;
import com.confitescordova.admin_repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public UserEntity getUserByUsername(String username) {
        UserEntity user =  userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado: " + username));

        if(user.getPassword() != null){
            UserEntity user_p =  new UserEntity();
            user_p.setUsername(user.getUsername());
            user_p.setRole(user.getRole());
            user_p.setEmail(user.getEmail());
            user_p.setFirstname(user.getFirstname());
            user_p.setLastname(user.getLastname());
            user_p.setId(user.getId());
            return user_p;
        }
        return user;
    }

    public List<UserEntity> getAllUsers() {
        List<UserEntity> users = userRepository.findAll();
        return users.stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    private UserEntity mapToDTO(UserEntity user) {
        return UserEntity.builder()
                .id(user.getId())
                .username(user.getUsername())
                .firstname(user.getFirstname())
                .lastname(user.getLastname())
                .email(user.getEmail())
                .role(user.getRole())
                .build();
    }

    public void deleteUserById(Long userId) {

        UserEntity userToDelete = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("El usuario con ID " + userId + " no existe."));

        if (userToDelete.getRole() == RoleEntity.ADMIN) {
            throw new IllegalArgumentException("No puedes eliminar a otro usuario con el rol ADMIN.");
        }

        // System.out.println("eliminando el usuario " + userId);
        userRepository.deleteById(userId);
    }

    public UserEntity updateUserProfile(String username, UserEntity request) throws Exception {
        // Buscar al usuario por su username
        UserEntity user = userRepository.findByUsername(username)
                .orElseThrow(() -> new Exception("Usuario no encontrado"));

        // Actualizar los campos proporcionados
        if (request.getFirstname() != null) {
            user.setFirstname(request.getFirstname());
        }
        if (request.getLastname() != null) {
            user.setLastname(request.getLastname());
        }
        if (request.getEmail() != null) {
            user.setEmail(request.getEmail());
        }

        // Guardar los cambios en la base de datos
        UserEntity us = userRepository.save(user);
        us.setPassword(null);
        return us;
    }

}
