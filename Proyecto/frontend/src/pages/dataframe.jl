# Crear un DataFrame con los datos proporcionados
data = {
    "Rama": [
        "vuln_lab3", "vuln_lab3", "vuln_lab3", "vuln_lab3", "vuln_lab3", "vuln_lab3", "vuln_lab3", "vuln_lab3",
        "vuln_lab3", "vuln_lab3", "vuln_lab3", "vuln_lab3", "vuln_lab3", "vuln_lab3",
        "lab3", "lab3", "lab3", "lab3", "lab3", "lab3", "lab3", "lab3", "lab3", "lab3", "lab3", "lab3", "lab3", "lab3"
    ],
    "Dependencia": [
        "crud-0.0.1-SNAPSHOT.jar: h2-2.1.214.jar",
        "crud-0.0.1-SNAPSHOT.jar: logback-classic-1.4.5.jar",
        "crud-0.0.1-SNAPSHOT.jar: logback-core-1.4.5.jar",
        "crud-0.0.1-SNAPSHOT.jar: snakeyaml-1.33.jar",
        "crud-0.0.1-SNAPSHOT.jar: spring-boot-3.0.3.jar",
        "crud-0.0.1-SNAPSHOT.jar: spring-boot-jarmode-layertools-3.0.3.jar",
        "crud-0.0.1-SNAPSHOT.jar: spring-core-6.0.5.jar",
        "crud-0.0.1-SNAPSHOT.jar: spring-security-config-6.0.2.jar",
        "crud-0.0.1-SNAPSHOT.jar: spring-security-core-6.0.2.jar",
        "crud-0.0.1-SNAPSHOT.jar: spring-security-web-6.0.2.jar",
        "crud-0.0.1-SNAPSHOT.jar: spring-tx-6.0.5.jar",
        "crud-0.0.1-SNAPSHOT.jar: spring-web-6.0.5.jar",
        "crud-0.0.1-SNAPSHOT.jar: spring-webmvc-6.0.5.jar",
        "crud-0.0.1-SNAPSHOT.jar: tomcat-embed-core-10.1.5.jar",
        "crud-0.0.1-SNAPSHOT.jar: h2-2.1.214.jar",
        "crud-0.0.1-SNAPSHOT.jar: logback-classic-1.4.5.jar",
        "crud-0.0.1-SNAPSHOT.jar: logback-core-1.4.5.jar",
        "crud-0.0.1-SNAPSHOT.jar: snakeyaml-1.33.jar",
        "crud-0.0.1-SNAPSHOT.jar: spring-boot-3.0.3.jar",
        "crud-0.0.1-SNAPSHOT.jar: spring-boot-jarmode-layertools-3.0.3.jar",
        "crud-0.0.1-SNAPSHOT.jar: spring-core-6.0.5.jar",
        "crud-0.0.1-SNAPSHOT.jar: spring-security-config-6.0.2.jar",
        "crud-0.0.1-SNAPSHOT.jar: spring-security-core-6.0.2.jar",
        "crud-0.0.1-SNAPSHOT.jar: spring-security-web-6.0.2.jar",
        "crud-0.0.1-SNAPSHOT.jar: spring-tx-6.0.5.jar",
        "crud-0.0.1-SNAPSHOT.jar: spring-web-6.0.5.jar",
        "crud-0.0.1-SNAPSHOT.jar: spring-webmvc-6.0.5.jar",
        "crud-0.0.1-SNAPSHOT.jar: tomcat-embed-core-10.1.5.jar"
    ],
    "Severidad más alta": [
        "HIGH", "HIGH", "HIGH", "CRITICAL", "CRITICAL", "CRITICAL", "HIGH", "CRITICAL",
        "CRITICAL", "CRITICAL", "HIGH", "HIGH", "HIGH", "HIGH",
        "HIGH", "HIGH", "HIGH", "CRITICAL", "CRITICAL", "CRITICAL", "HIGH", "CRITICAL",
        "CRITICAL", "CRITICAL", "HIGH", "HIGH", "HIGH", "HIGH"
    ],
    "CVE Count": [
        2, 1, 3, 1, 3, 3, 6, 3,
        4, 4, 5, 8, 6, 7,
        2, 1, 3, 1, 3, 3, 6, 3,
        4, 4, 5, 8, 6, 7
    ],
    "Confidence": [
        "Highest", "Highest", "Highest", "Highest", "Highest", "Highest", "Highest", "Highest",
        "Highest", "Highest", "Highest", "Highest", "Highest", "Highest",
        "Highest", "Highest", "Highest", "Highest", "Highest", "Highest", "Highest", "Highest",
        "Highest", "Highest", "Highest", "Highest", "Highest", "Highest"
    ],
    "Evidence Count": [
        45, 39, 37, 39, 42, 49, 37, 45,
        42, 44, 37, 39, 39, 67,
        45, 39, 37, 39, 42, 49, 37, 45,
        42, 44, 37, 39, 39, 67
    ]
}

# Crear DataFrame
df = pd.DataFrame(data)

# Asignar puntuaciones para Severidad
severity_points = {
    "CRITICAL": 5,
    "HIGH": 4,
    "MEDIUM": 3,
    "LOW": 1
}
df["Severidad Pts"] = df["Severidad más alta"].map(severity_points)

# Asignar puntuaciones para Confidence
confidence_points = {
    "Highest": 3,
    "High": 2,
    "Medium": 1,
    "Low": 0.5
}
df["Confidence Pts"] = df["Confidence"].map(confidence_points)

# Ajustar Evidence Count
df["Evidence Adj"] = df["Evidence Count"] / 10

# Calcular Criticidad Total
df["Criticidad Total"] = (
    df["Severidad Pts"] +
    df["CVE Count"] +
    df["Confidence Pts"] +
    df["Evidence Adj"]
)

# Mostrar la tabla al usuario
import ace_tools as tools; tools.display_dataframe_to_user(name="Dependencias Vulnerables con Criticidad Total", dataframe=df)
