# Używamy obrazu Maven z Amazon Corretto do budowy aplikacji
FROM amazoncorretto:17 AS build

# Ustawiamy katalog roboczy
WORKDIR /app

# Instalujemy brakujące narzędzia (np. tar)
RUN yum install -y tar gzip

# Kopiujemy pliki projektu do kontenera
COPY . .

# Budujemy aplikację Spring (plik JAR)
RUN ./mvnw clean install -DskipTests

# Tworzymy finalny obraz z Amazon Corretto JRE
FROM amazoncorretto:17

# Kopiujemy wygenerowany plik JAR z poprzedniego etapu
COPY --from=build /app/target/*.jar /app/app.jar

# Eksponujemy port 8080
EXPOSE 8080

# Uruchamiamy aplikację
CMD ["java", "-jar", "/app/app.jar"]