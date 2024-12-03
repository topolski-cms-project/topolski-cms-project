# Scenariusz 1: Uruchomienie aplikacji za pomocą `docker-compose.yml` z MySQL

## Krok 1: Zainstaluj Docker i Docker Compose

Upewnij się, że masz zainstalowane Docker oraz Docker Compose. Jeśli nie, zainstaluj je zgodnie z [dokumentacją Docker](https://docs.docker.com/get-docker/) i [dokumentacją Docker Compose](https://docs.docker.com/compose/install/).

## Krok 2: Uruchomienie aplikacji

1. **Zbuduj i uruchom aplikację za pomocą Docker Compose**:

   W katalogu głównym projektu, gdzie znajduje się plik `docker-compose.yml`, uruchom następującą komendę:

    ```bash
    docker-compose up --build
    ```

   Komenda ta:
    - Zbuduje obrazy kontenerów (jeśli jeszcze tego nie zrobiłeś).
    - Uruchomi aplikację backendową oraz bazę danych MySQL.
    - Aplikacja będzie dostępna na porcie `8080`.

## Krok 3: Dostęp do aplikacji i bazy danych

1. **Dostęp do aplikacji backendowej**:

   Po uruchomieniu kontenerów aplikacja backendowa będzie dostępna pod adresem:

    ```
    http://localhost:8080
    ```

2. **Dostęp do bazy danych MySQL**:

   Możesz połączyć się z bazą danych MySQL za pomocą klienta MySQL, używając poniższych danych logowania:

    - **JDBC URL**: `jdbc:mysql://localhost:3306/appdb`
    - **Username**: `appuser`
    - **Password**: `apppassword`

   Na przykład, aby połączyć się z bazą MySQL za pomocą narzędzia `mysql` w terminalu:

    ```bash
    mysql -h 127.0.0.1 -P 3306 -u root -p
    ```

   Po wprowadzeniu hasła `rootpassword`, będziesz połączony z bazą danych.

## Krok 4: Zatrzymanie aplikacji

Aby zatrzymać uruchomione kontenery, użyj komendy:

```bash
docker-compose down
```

# Scenariusz 2: Uruchomienie aplikacji lokalnie za pomocą `mvn clean package`

### Podsumowanie komend:

1. **Zbudowanie aplikacji**:

    ```bash
    mvn clean package -DskipTests
    ```

2. **Uruchomienie aplikacji**:

    ```bash
    mvn spring-boot:run
    ```

3. **Dostęp do aplikacji**:  
   Adres: `http://localhost:8080`

4. **Dostęp do konsoli H2**:  
   Adres: `http://localhost:8080/h2-console`  
   JDBC URL: `jdbc:h2:mem:testdb`  
   Username: `sa`  
   Password: (pozostaw puste)

5. **Zatrzymanie aplikacji**:

    ```bash
    Ctrl + C
    ```

