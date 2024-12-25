package com.confitescordova.admin_services;

import com.confitescordova.admin_entities.UserEntity;
import com.confitescordova.admin_repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

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

}
