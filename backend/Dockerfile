
# Etap 1: Budowanie (Maven)
FROM maven:3.9-eclipse-temurin-17 AS build
LABEL authors="wiktorosior"
WORKDIR /app
COPY pom.xml .
COPY src ./src
# Budujemy plik .jar, pomijając testy dla szybkości
RUN mvn clean package -DskipTests

# Etap 2: Uruchamianie (Samo JRE)
FROM eclipse-temurin:17-jre
WORKDIR /app
# Kopiujemy tylko zbudowany plik jar z etapu 1
COPY --from=build /app/target/*.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]