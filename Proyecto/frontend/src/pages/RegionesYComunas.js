// RegionesYComunas.js
const regionsAndCommunes = [
    {
      NombreRegion: "Arica y Parinacota",
      comunas: ["Arica", "Camarones", "Putre", "General Lagos"],
    },
    {
      NombreRegion: "Tarapacá",
      comunas: ["Iquique", "Alto Hospicio", "Pozo Almonte", "Camiña", "Colchane", "Huara", "Pica"],
    },
    {
      NombreRegion: "Antofagasta",
      comunas: ["Antofagasta", "Mejillones", "Sierra Gorda", "Taltal", "Calama", "Ollagüe", "San Pedro de Atacama", "Tocopilla", "María Elena"],
    },
    {
      NombreRegion: "Atacama",
      comunas: ["Copiapó", "Caldera", "Tierra Amarilla", "Chañaral", "Diego de Almagro", "Vallenar", "Alto del Carmen", "Freirina", "Huasco", "El Salvador", "Estación Paipote", "Fuerte Baquedano", "Paipote"],
    },
    {
      NombreRegion: "Coquimbo",
      comunas: [
        "Andacollo", "Canela", "Combarbala", "Coquimbo", "Illapel", "La Higuera", "La Serena", 
        "Los Vilos", "Monte Patria", "Ovalle", "Paihuano", "Punitaqui", "Río Hurtado", "Salamanca", 
        "Vicuña"
      ]
    },
    {
      NombreRegion: "Valparaíso",
      comunas: [
        "Algarrobo", "Artificio", "Barrancas", "Cabildo", "Calle Larga", "Cartagena", "Casablanca", 
        "Catemu", "Con-Con", "El Belloto", "El Melon", "El Quisco", "El Tabito", "El Tabo", "Hijuelas", 
        "Isla De Pascua", "Isla Negra", "Juan Fernández", "La Calera", "La Cruz", "La Ligua", "Las Cruces", 
        "Limache", "Llay-Llay", "Llo Lleo", "Los Andes", "Nogales", "Olmue", "Panquehue", "Papudo", 
        "Penablanca", "Petorca", "Placilla Quinta Region", "Puchuncavi", "Putaendo", "Quillota", "Quilpue", 
        "Quintero", "Renaca", "Rinconada", "San Antonio", "San Esteban", "San Felipe", "San Francisco de Limache", 
        "San Sebastian", "Santa Maria", "Santo Domingo", "Valparaiso", "Villa Alemana", "Viña Del Mar", "Zapallar"
      ],
    },
    {
      NombreRegion: "Libertador General Bernardo O’Higgins",
      comunas: [
        "Bucalemu", "Chepica", "Chimbarongo", "Codegua", "Coinco", "Coltauco", "Doñihue", "Graneros", 
        "La Estrella", "Las Cabras", "Litueche", "Lo Miranda", "Lolol", "Machali", "Malloa", "Marchigue", 
        "Nancagua", "Navidad", "Olivar", "Palmilla", "Paredones", "Pelequen", "Peralillo", "Peumo", 
        "Pichidegua", "Pichilemu", "Placilla", "Pumanque", "Quinta De Tilcoco", "Rancagua", "Rengo", 
        "Requinoa", "Rosario", "San Fernando", "San Francisco De Mostazal", "San Vicente", "Santa Amelia", 
        "Santa Cruz"
      ],
    },
    {
      NombreRegion: "Maule",
      comunas: [
        "Cauquenes", "Chanco", "Colbun", "Constitucion", "Cumpeo", "Curepto", "Curico", 
        "Empedrado", "Hualañe", "Itahue", "Licanten", "Linares", "Longavi", "Lontue", 
        "Maule", "Molina", "Parral", "Pelarco", "Pelluhue", "Pencahue", "Rauco", "Retiro", 
        "Romeral", "Río Claro", "Sagrada Familia", "San Clemente", "San Javier", "San Rafael", 
        "Talca", "Teno", "Vichuquen", "Villa Alegre", "Yerbas Buenas"
      ]
    },
    {
      NombreRegion: "BioBío",
      comunas: [
        "Alto Bíobío", "Antuco", "Arauco", "Cabrero", "Cañete", "Chiguayante", "Cholguan", "Concepcion", 
        "Contulmo", "Coronel", "Curanilahue", "Florida", "Hualpén", "Hualqui", "Huepil", "Laja", "Lebu", 
        "Los Alamos", "Los Angeles", "Lota", "Mulchen", "Nacimiento", "Negrete", "Nueva Aldea", "Penco", 
        "Pueblo Seco", "Quilaco", "Quilleco", "Quiriquina", "San Pedro De La Paz", "San Rosendo", 
        "Santa Barbara", "Santa Juana", "Talcahuano", "Tirua", "Tome", "Tucapel", "Yumbel"
      ],
    },
    {
      NombreRegion: "Metropolitana de Santiago",
      comunas: [
        "Alhue", "Alto Jahuel", "Batuco", "Buin", "Calera De Tango", "Cerrillos", "Cerro Navia", 
        "Colina", "Conchalí", "Curacavi", "El Bosque", "El Monte", "El Paico", "Estacion Central", 
        "Huechuraba", "Independencia", "Isla De Maipo", "La Cisterna", "La Florida", "La Granja", 
        "La Pintana", "La Reina", "Lampa", "Las Condes", "Lo Barnechea", "Lo Espejo", "Lo Prado", 
        "Longovilo", "Lonquen", "Macul", "Maipú", "Malloco", "Maria Pinto", "Melipilla", "Nos", 
        "Padre Hurtado", "Paine", "Pedro Aguirre Cerda", "Peñaflor", "Peñalolén", "Pirque", "Providencia", 
        "Pudahuel", "Puente Alto", "Quilicura", "Quinta Normal", "Recoleta", "Renca", "San Bernardo", 
        "San Joaquín", "San Jose De Maipo", "San Jose De Melipilla", "San Miguel", "San Pedro", 
        "San Pedro Quinta Region", "San Ramón", "Santiago", "Talagante", "Til-Til", "Vitacura", "Ñuñoa"
      ]
    },
    {
      NombreRegion: "Los Ríos",
      comunas: [
        "Corral", "Futrono", "Isla Teja", "La Union", "Lago Ranco", "Lanco", "Los Lagos", 
        "Mafil", "Mariquina", "Paillaco", "Panguipulli", "Rio Bueno", "San Jose de la Mariquina", 
        "Valdivia"
      ]
    },
    {
      NombreRegion: "Los Lagos",
      comunas: [
        "Achao", "Ancud", "Calbuco", "Castro", "Chaiten", "Chonchi", "Cochamo", "Curaco De Velez", 
        "Dalcahue", "Entre Lagos", "Fresia", "Frutillar", "Futaleufu", "Hornopiren", "Hualaihué", 
        "Lago Ranco", "Llanquihue", "Los Muermos", "Maullin", "Osorno", "Palena", "Pargua", 
        "Puerto Montt", "Puerto Octay", "Puerto Varas", "Puqueldon", "Purranque", "Puyehue", 
        "Queilen", "Quellon", "Quemchi", "Quinchao", "Rio Negro", "San Juan de la Costa", "San Pablo"
      ],
    },
    {
      NombreRegion: "Magallanes y de la Antártica Chilena",
      comunas: [
        "Antártica", "Cabo de Hornos", "Laguna Blanca", "Natales", "Porvenir", "Primavera", 
        "Puerto Williams", "Punta Arenas", "Río Verde", "San Gregorio", "Timaukel", "Torres Del Paine"
      ]
    },
    {
        NombreRegion: "Aysén del General Carlos Ibáñez del Campo",
        comunas: ["Aysén", "Balmaceda", "Chile Chico", "Cisnes", "Cochrane", "Coyhaique", "Guaitecas", "La Junta", "Lago Verde", "O'Higgins", "Puerto Aguirre", "Puerto Aysén", "Puerto Chacabuco", "Puerto Cisnes", "Puyuhuapi", "Río Ibáñez", "Tortel", "Villa Manihuales"]
    },
    {
        NombreRegion: "La Araucanía",
        comunas: [
            "Angol", "Carahue", "Cholchol", "Collipulli", "Cunco", "Curacautin", "Curarrehue", "Ercilla", 
            "Freire", "Galvarino", "Gorbea", "Lautaro", "Loncoche", "Lonquimay", "Los Sauces", "Lumaco", 
            "Melipeuco", "Mininco", "Nueva Imperial", "Padre Las Casas", "Perquenco", "Pitrufquen", "Pucon", 
            "Puren", "Quepe", "Renaico", "Saavedra", "Temuco", "Teodoro Schmidt", "Toltén", "Traiguen", 
            "Victoria", "Vilcún", "Villarrica"
        ],
    },
    {
        NombreRegion: "Ñuble",
        comunas: [
            "Bulnes", "Chillán", "Chillán Viejo", "Cobquecura", "Coelemu", "Coihueco", "El Carmen", 
            "Ninhue", "Pemuco", "Pinto", "Portezuelo", "Quillón", "Quirihue", "Ránquil", "San Carlos", 
            "San Fabián", "San Ignacio", "San Nicolás", "Treguaco", "Yungay", "Ñiquén"
        ],
    }
  ];
  
  export default regionsAndCommunes;
  