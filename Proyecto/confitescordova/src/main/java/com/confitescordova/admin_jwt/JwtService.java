package com.confitescordova.admin_jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import org.springframework.beans.factory.annotation.Value;

@Service
public class JwtService {
    // @Value("${SECRET_KEY}")
    // private String SECRET_KEY; // Inyecta la clave secreta desde el archivo de configuración.

    private static final String SECRET_KEY = "K188319299UD19912391FJ189931893281J198319UF9118329183";

    /**
     * Genera un token JWT para un usuario dado sin claims adicionales.
     *
     * @param user Usuario para quien se generará el token.
     * @return El token JWT generado.
     */
    public String getToken(UserDetails user) {
        return getToken(new HashMap<>(), user); // Llama a la versión sobrecargada con claims vacíos.
    }
    /**
     * Genera un token JWT con claims adicionales.
     *
     * @param extraClaims Claims personalizados para agregar al token.
     * @param user Usuario para quien se generará el token.
     * @return El token JWT generado.
     */
    private String getToken(Map<String, Object> extraClaims, UserDetails user) {
        return Jwts
                .builder()
                .setClaims(extraClaims) // Configura claims personalizados.
                .setSubject(user.getUsername()) // Asigna el nombre de usuario como el sujeto del token.
                .setIssuedAt(new Date(System.currentTimeMillis())) // Fecha de emisión del token.
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 1440)) // Expiración del token (24 horas).
                .signWith(getKey(), SignatureAlgorithm.HS256) // Firma el token con la clave secreta y algoritmo HS256.
                .compact(); // Genera el token en formato compacto.
    }

    /**
     * Genera un token JWT para restablecer contraseña. Tiene una expiración más corta (10 minutos).
     *
     * @param user Usuario para quien se generará el token.
     * @return El token JWT generado.
     */
    public String getTokenForResetPassword(UserDetails user) {
        return getTokenForResetPassword(new HashMap<>(), user);
    }


    private String getTokenForResetPassword(Map<String, Object> extraClaims, UserDetails user) {
        return Jwts
                .builder()
                .setClaims(extraClaims)
                //Token information
                .setSubject(user.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000*60*10))
                .signWith(getKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    /**
     * Devuelve la clave secreta decodificada para firmar y verificar los tokens.
     *
     * @return Una instancia de `Key` derivada de la clave secreta.
     */
    private Key getKey() {
        // System.out.println("Llave secreta " + SECRET_KEY +"\n");
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    /**
     * Extrae el nombre de usuario (sujeto) de un token JWT.
     *
     * @param token Token JWT.
     * @return Nombre de usuario contenido en el token.
     */
    public String getUsernameFromToken(String token) {
        return getClaim(token, Claims::getSubject);
    }

    /**
     * Valida un token JWT verificando el nombre de usuario y la expiración.
     *
     * @param token Token a validar.
     * @param userDetails Detalles del usuario autenticado.
     * @return `true` si el token es válido, `false` en caso contrario.
     */
    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = getUsernameFromToken(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    private Claims getAllClaims(String token) {
        return Jwts
                .parserBuilder()
                .setSigningKey(getKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    /**
     * Extrae un claim específico del token usando un resolver.
     *
     * @param token Token JWT.
     * @param claimsResolver Función para resolver el claim deseado.
     * @param <T> Tipo del claim extraído.
     * @return El valor del claim extraído.
     */
    public <T> T getClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = getAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Date getExpiration(String token) {
        return getClaim(token, Claims::getExpiration);
    }

    private boolean isTokenExpired(String token){
        return getExpiration(token).before(new Date());
    }
}