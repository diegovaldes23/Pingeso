package com.confitescordova.admin_entities;

public enum RoleEntity {
    ADMIN, // Rol de administrador
    MODERATOR, // Rol de moderador
    ANALYST,
    OTHER;

    /**
     * Método para convertir un String en un valor de RoleEntity.
     * Si el String no coincide con un rol existente, lanza una excepción.
     *
     * @param roleStr String que representa el nombre del rol.
     * @return El valor correspondiente de RoleEntity.
     * @throws Exception Si el rol no es válido o no se encuentra.
     */

    public static RoleEntity fromString(String roleStr) throws Exception {
        for (RoleEntity role : RoleEntity.values()) {
            if (role.name().equalsIgnoreCase(roleStr)) {
                return role; // Retorna el rol que coincide ignorando mayúsculas/minúsculas
            }
        }
        // Lanza una excepción si no se encuentra un rol válido
        // (que no sea ADMIN ni MODERATOR)
        throw new Exception("Rol " + roleStr + " no encontrado.");
    }

}
