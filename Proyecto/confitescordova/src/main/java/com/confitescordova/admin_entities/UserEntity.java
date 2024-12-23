package com.confitescordova.admin_entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import java.util.Collection;
import java.util.List;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "user", uniqueConstraints = {@UniqueConstraint(columnNames = {"username"})})
public class UserEntity implements UserDetails {
    @Id
    @Column(name = "id", unique = true, nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;

    @Column(unique = true, nullable = false)
    String username; // el username tiene que ser único y no puede ser null

    @Column(nullable = false)
    String password;

    String firstname;
    String lastname;
    String email;


    @Enumerated(EnumType.STRING) // Mapea el enum RoleEntity como un String en la base de datos
    @Column(nullable = false)
    RoleEntity role; // Rol del usuario (ADMIN o MODERATOR)

    /**
     * Devuelve la colección de roles o permisos asociados al usuario.
     * Spring Security utiliza esta información para manejar la autorización.
     *
     * @return Una colección de GrantedAuthority que representa los permisos del usuario.
     */
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // Convierte el rol del usuario a una autoridad reconocida por Spring Security
        // si no es nulo, se convierte el rol del usuario a una autoridad reconocida por Spring Security
        if (role != null) {
            return List.of(new SimpleGrantedAuthority(role.name()));
        }
        // si el rol es nulo, se reconoce como rol OTHER
        return List.of(new SimpleGrantedAuthority("OTHER"));
    }
}
