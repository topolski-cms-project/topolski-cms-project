package com.topolski.backend.config;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Dostosuj do swoich endpointów
                .allowedOrigins("http://192.168.0.105:3000") // Adres frontendu
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Dozwolone metody
                .allowedHeaders("*") // Dozwolone nagłówki
                .allowCredentials(true); // Jeśli używasz ciasteczek lub tokenów
    }
}