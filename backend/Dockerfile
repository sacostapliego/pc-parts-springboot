# Use a specific, recent, and well-maintained Maven image from Eclipse Temurin
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app
# Copy the pom.xml and download dependencies
COPY pom.xml .
RUN mvn dependency:go-offline
# Copy the rest of the source code
COPY src ./src
# Build the application
RUN mvn clean install -DskipTests

# Use a specific, recent, and well-maintained base image from Eclipse Temurin
FROM eclipse-temurin:17-jre
WORKDIR /app
# Copy the JAR file from the build stage
COPY --from=build /app/target/*.jar app.jar
# Expose the port your application runs on (default is 8080 for Spring Boot)
EXPOSE 8080
# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]