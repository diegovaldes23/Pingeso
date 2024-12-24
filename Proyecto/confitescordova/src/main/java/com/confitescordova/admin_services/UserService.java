package com.confitescordova.admin_services;

import com.confitescordova.admin_entities.UserEntity;
import com.confitescordova.admin_repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

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

}
