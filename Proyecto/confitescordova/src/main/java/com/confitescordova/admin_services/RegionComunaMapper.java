package com.confitescordova.admin_services;

import java.text.Normalizer;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class RegionComunaMapper {
    // Mapa para asociar comuna -> región
    public static final Map<String, String> comunaToRegionMap = loadComunaToRegionMap();

    public static Map<String, String> loadComunaToRegionMap() {
        // Mapa para almacenar las relaciones comuna-región
        Map<String, String> map = new HashMap<>();

        // Agrega todas las regiones y comunas
        addRegionWithComunas(map, "Arica y Parinacota", List.of("Arica", "Camarones", "Putre", "General Lagos"));

        addRegionWithComunas(map, "Tarapacá", List.of("Iquique", "Alto Hospicio", "Pozo Almonte", "Camiña", "Colchane", "Huara", "Pica"));

        addRegionWithComunas(map, "Antofagasta", List.of("Antofagasta", "Mejillones", "Sierra Gorda", "Taltal", "Calama", "Ollagüe", "San Pedro de Atacama", "Tocopilla", "María Elena"));

        addRegionWithComunas(map, "Atacama", List.of("Copiapó", "Caldera", "Tierra Amarilla", "Chañaral", "Diego de Almagro", "Vallenar", "Alto del Carmen", "Freirina", "Huasco", "El Salvador", "Estación Paipote", "Fuerte Baquedano", "Paipote"));

        addRegionWithComunas(map, "Coquimbo", List.of(
                "Andacollo", "Canela", "Combarbala", "Coquimbo", "Illapel", "La Higuera", "La Serena",
                "Los Vilos", "Monte Patria", "Ovalle", "Paihuano", "Punitaqui", "Río Hurtado", "Salamanca",
                "Vicuña"
        ));

        addRegionWithComunas(map, "Valparaíso", List.of(
                "Algarrobo", "Artificio", "Barrancas", "Cabildo", "Calle Larga", "Cartagena", "Casablanca",
                "Catemu", "Con-Con", "El Belloto", "El Melon", "El Quisco", "El Tabito", "El Tabo", "Hijuelas",
                "Isla De Pascua", "Isla Negra", "Juan Fernández", "La Calera", "La Cruz", "La Ligua", "Las Cruces",
                "Limache", "Llay-Llay", "Llo Lleo", "Los Andes", "Nogales", "Olmue", "Panquehue", "Papudo",
                "Penablanca", "Petorca", "Placilla Quinta Region", "Puchuncavi", "Putaendo", "Quillota", "Quilpue",
                "Quintero", "Renaca", "Rinconada", "San Antonio", "San Esteban", "San Felipe", "San Francisco de Limache",
                "San Sebastian", "Santa Maria", "Santo Domingo", "Valparaiso", "Villa Alemana", "Viña Del Mar", "Zapallar"
        ));

        addRegionWithComunas(map, "Libertador General Bernardo O’Higgins", List.of(
                "Bucalemu", "Chepica", "Chimbarongo", "Codegua", "Coinco", "Coltauco", "Doñihue", "Graneros",
                "La Estrella", "Las Cabras", "Litueche", "Lo Miranda", "Lolol", "Machali", "Malloa", "Marchigue",
                "Nancagua", "Navidad", "Olivar", "Palmilla", "Paredones", "Pelequen", "Peralillo", "Peumo",
                "Pichidegua", "Pichilemu", "Placilla", "Pumanque", "Quinta De Tilcoco", "Rancagua", "Rengo",
                "Requinoa", "Rosario", "San Fernando", "San Francisco De Mostazal", "San Vicente", "Santa Amelia",
                "Santa Cruz"
        ));

        addRegionWithComunas(map, "Maule", List.of(
                "Cauquenes", "Chanco", "Colbun", "Constitucion", "Cumpeo", "Curepto", "Curico",
                "Empedrado", "Hualañe", "Itahue", "Licanten", "Linares", "Longavi", "Lontue",
                "Maule", "Molina", "Parral", "Pelarco", "Pelluhue", "Pencahue", "Rauco", "Retiro",
                "Romeral", "Río Claro", "Sagrada Familia", "San Clemente", "San Javier", "San Rafael",
                "Talca", "Teno", "Vichuquen", "Villa Alegre", "Yerbas Buenas"
        ));

        addRegionWithComunas(map, "BioBío", List.of(
                "Alto Bíobío", "Antuco", "Arauco", "Cabrero", "Cañete", "Chiguayante", "Cholguan", "Concepcion",
                "Contulmo", "Coronel", "Curanilahue", "Florida", "Hualpén", "Hualqui", "Huepil", "Laja", "Lebu",
                "Los Alamos", "Los Angeles", "Lota", "Mulchen", "Nacimiento", "Negrete", "Nueva Aldea", "Penco",
                "Pueblo Seco", "Quilaco", "Quilleco", "Quiriquina", "San Pedro De La Paz", "San Rosendo",
                "Santa Barbara", "Santa Juana", "Talcahuano", "Tirua", "Tome", "Tucapel", "Yumbel"
        ));

        addRegionWithComunas(map, "Metropolitana de Santiago", List.of(
                "Alhue", "Alto Jahuel", "Batuco", "Buin", "Calera De Tango", "Cerrillos", "Cerro Navia",
                "Colina", "Conchalí", "Curacavi", "El Bosque", "El Monte", "El Paico", "Estacion Central",
                "Huechuraba", "Independencia", "Isla De Maipo", "La Cisterna", "La Florida", "La Granja",
                "La Pintana", "La Reina", "Lampa", "Las Condes", "Lo Barnechea", "Lo Espejo", "Lo Prado",
                "Longovilo", "Lonquen", "Macul", "Maipú", "Malloco", "Maria Pinto", "Melipilla", "Nos",
                "Padre Hurtado", "Paine", "Pedro Aguirre Cerda", "Peñaflor", "Peñalolén", "Pirque", "Providencia",
                "Pudahuel", "Puente Alto", "Quilicura", "Quinta Normal", "Recoleta", "Renca", "San Bernardo",
                "San Joaquín", "San Jose De Maipo", "San Jose De Melipilla", "San Miguel", "San Pedro",
                "San Pedro Quinta Region", "San Ramón", "Santiago", "Talagante", "Til-Til", "Vitacura", "Ñuñoa"
        ));

        addRegionWithComunas(map, "Los Ríos", List.of(
                "Corral", "Futrono", "Isla Teja", "La Union", "Lago Ranco", "Lanco", "Los Lagos",
                "Mafil", "Mariquina", "Paillaco", "Panguipulli", "Rio Bueno", "San Jose de la Mariquina",
                "Valdivia"
        ));

        addRegionWithComunas(map, "Los Lagos", List.of(
                "Achao", "Ancud", "Calbuco", "Castro", "Chaiten", "Chonchi", "Cochamo", "Curaco De Velez",
                "Dalcahue", "Entre Lagos", "Fresia", "Frutillar", "Futaleufu", "Hornopiren", "Hualaihué",
                "Lago Ranco", "Llanquihue", "Los Muermos", "Maullin", "Osorno", "Palena", "Pargua",
                "Puerto Montt", "Puerto Octay", "Puerto Varas", "Puqueldon", "Purranque", "Puyehue",
                "Queilen", "Quellon", "Quemchi", "Quinchao", "Rio Negro", "San Juan de la Costa", "San Pablo"
        ));

        addRegionWithComunas(map, "Magallanes y de la Antártica Chilena", List.of(
                "Antártica", "Cabo de Hornos", "Laguna Blanca", "Natales", "Porvenir", "Primavera",
                "Puerto Williams", "Punta Arenas", "Río Verde", "San Gregorio", "Timaukel", "Torres Del Paine"
        ));

        addRegionWithComunas(map, "Aysén del General Carlos Ibáñez del Campo", List.of(
                "Aysén", "Balmaceda", "Chile Chico", "Cisnes", "Cochrane", "Coyhaique", "Guaitecas", "La Junta",
                "Lago Verde", "O'Higgins", "Puerto Aguirre", "Puerto Aysén", "Puerto Chacabuco", "Puerto Cisnes",
                "Puyuhuapi", "Río Ibáñez", "Tortel", "Villa Manihuales"
        ));

        addRegionWithComunas(map, "La Araucanía", List.of(
                "Angol", "Carahue", "Cholchol", "Collipulli", "Cunco", "Curacautin", "Curarrehue", "Ercilla",
                "Freire", "Galvarino", "Gorbea", "Lautaro", "Loncoche", "Lonquimay", "Los Sauces", "Lumaco",
                "Melipeuco", "Mininco", "Nueva Imperial", "Padre Las Casas", "Perquenco", "Pitrufquen", "Pucon",
                "Puren", "Quepe", "Renaico", "Saavedra", "Temuco", "Teodoro Schmidt", "Toltén", "Traiguen",
                "Victoria", "Vilcún", "Villarrica"
        ));

        addRegionWithComunas(map, "Ñuble", List.of(
                "Bulnes", "Chillán", "Chillán Viejo", "Cobquecura", "Coelemu", "Coihueco", "El Carmen",
                "Ninhue", "Pemuco", "Pinto", "Portezuelo", "Quillón", "Quirihue", "Ránquil", "San Carlos",
                "San Fabián", "San Ignacio", "San Nicolás", "Treguaco", "Yungay", "Ñiquén"
        ));

        return map;
    }

    private static void addRegionWithComunas(Map<String, String> map, String region, List<String> comunas) {
        for (String comuna : comunas) {
            // Agrega la comuna formateada en minúsculas
            map.put(formatComuna(comuna).toLowerCase(), region);
        }
    }

    /**
     * Obtiene la región correspondiente a una comuna.
     *
     * @param comuna Nombre de la comuna
     * @return Nombre de la región o un mensaje si no se encuentra
     */
    public static String getRegionByComuna(String comuna) {
        if (comuna == null || comuna.trim().isEmpty()) {
            return "Comuna no proporcionada";
        }

        String formattedComuna = formatComuna(comuna);
        String region = comunaToRegionMap.get(formattedComuna.toLowerCase());
        return region != null ? region : "Región no encontrada para la comuna: " + comuna;
    }

    public static String formatComuna(String comuna) {
        if (comuna == null || comuna.trim().isEmpty()) {
            return null;
        }

        // Normalizar y eliminar diacríticos (acentos/tildes)
        String normalizedComuna = Normalizer.normalize(comuna.trim().toLowerCase(), Normalizer.Form.NFD);
        normalizedComuna = normalizedComuna.replaceAll("\\p{M}", ""); // Elimina los acentos

        // Agrega los acentos manualmente para casos conocidos
        normalizedComuna = normalizedComuna.replace("maipu", "maipú")
                .replace("penaflor", "peñaflor")
                .replace("valparaiso", "valparaíso")
                .replace("stgo centro", "santiago")
                .replace("pac", "pedro aguirre cerda")
                .replace("futalelfu", "futaleufu")
                .replace("pte alto", "puente alto")
                .replace("puudahuel", "pudahuel")
                .replace("nuble", "ñuble")
                .replace("stgo", "santiago")
                .replace("conchali", "conchalí")
                .replace("nunoa", "ñuñoa")
                .replace("penalolen", "peñalolén")
                .replace("chillan", "chillán")
                .replace("qta normal", "quinta normal");

        // Capitaliza la primera letra de cada palabra
        return Arrays.stream(normalizedComuna.split(" "))
                .map(word -> Character.toUpperCase(word.charAt(0)) + word.substring(1))
                .collect(Collectors.joining(" "));
    }
}
