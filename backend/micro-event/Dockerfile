FROM openjdk:17
EXPOSE 8087
ADD target/backend-0.0.1-SNAPSHOT.jar backend2.jar
ENTRYPOINT ["java", "-jar", "backend2.jar"]