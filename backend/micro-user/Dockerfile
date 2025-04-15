FROM openjdk:17
EXPOSE 8081
ADD target/userBackend-0.0.1-SNAPSHOT.jar userBackend.jar
ENTRYPOINT ["java", "-jar", "userBackend.jar"]