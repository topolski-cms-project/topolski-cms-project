# Używamy obrazu Node.js do budowania aplikacji React
FROM node:18 AS build

# Ustawiamy katalog roboczy
WORKDIR /app

# Kopiujemy pliki package.json i package-lock.json do kontenera
COPY package*.json ./

# Instalujemy zależności
RUN npm install

# Kopiujemy cały kod aplikacji do kontenera
COPY . .

# Budujemy aplikację
RUN npm run build

# Tworzymy finalny obraz z serwerem Nginx
FROM nginx:1.21-alpine

# Kopiujemy zbudowaną aplikację do katalogu obsługiwanego przez Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Eksponujemy port 80
EXPOSE 80

# Uruchamiamy Nginx
CMD ["nginx", "-g", "daemon off;"]