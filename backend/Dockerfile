# Use a base image with Maven and Java
FROM maven:3.9.6-eclipse-temurin-17-jammy AS build
WORKDIR /app
# Copy the pom.xml and download dependencies
COPY pom.xml .
RUN mvn dependency:go-offline
# Copy the rest of the source code
COPY src ./src
# Build the application
RUN mvn clean install -DskipTests

# Use a smaller base image for the final container
FROM eclipse-temurin:17-jdk-jammy
WORKDIR /app
# Copy the JAR file from the build stage
COPY --from=build /app/target/*.jar app.jar
# Expose the port your application runs on (default is 8080 for Spring Boot)
EXPOSE 8080
# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]