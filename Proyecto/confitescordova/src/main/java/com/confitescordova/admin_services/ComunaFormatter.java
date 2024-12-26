package com.confitescordova.admin_services;

import java.text.Normalizer;
import java.util.List;
import java.util.Map;
import java.util.Optional;

public class ComunaFormatter {
    /**
     * Formatea una comuna al formato estándar definido en el mapa de regiones y comunas.
     *
     * @param comuna     La comuna a formatear.
     * @param regionMap  El mapa con regiones y comunas.
     * @return La comuna formateada o un mensaje indicando que no se encontró coincidencia.
     */
    public static String formatComuna(String comuna, Map<String, List<String>> regionMap) {
        if (comuna == null || comuna.trim().isEmpty()) {
            return "Comuna no válida";
        }

        // Normaliza la comuna a buscar (quita tildes, mayúsculas, etc.)
        String normalizedComuna = normalizeString(comuna);

        for (Map.Entry<String, List<String>> entry : regionMap.entrySet()) {
            List<String> comunas = entry.getValue();

            // Busca una coincidencia exacta en la lista de comunas normalizadas
            Optional<String> matchedComuna = comunas.stream()
                    .filter(c -> normalizeString(c).equals(normalizedComuna))
                    .findFirst();

            if (matchedComuna.isPresent()) {
                return matchedComuna.get(); // Devuelve la comuna formateada correctamente
            }
        }

        // Si no se encuentra, devuelve la comuna original o un mensaje de error
        return "Comuna no encontrada: " + comuna;
    }

    /**
     * Normaliza una cadena eliminando tildes, mayúsculas y caracteres especiales.
     *
     * @param input La cadena a normalizar.
     * @return La cadena normalizada.
     */
    private static String normalizeString(String input) {
        if (input == null) {
            return null;
        }

        // Convierte a minúsculas y elimina tildes
        String normalized = Normalizer.normalize(input, Normalizer.Form.NFD);
        return normalized.replaceAll("[\\p{InCombiningDiacriticalMarks}]", "").toLowerCase().trim();
    }
}
