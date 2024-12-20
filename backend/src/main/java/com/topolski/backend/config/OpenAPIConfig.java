package com.topolski.backend.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import java.util.List;

@Configuration
public class OpenAPIConfig {

    @Bean
    @Profile({"dev", "local"})
    public OpenAPI customOpenAPI() {
        Server apiServer = new Server();
        apiServer.setUrl("/api");
        apiServer.setDescription("Base path for all API endpoints");
        return new OpenAPI()
                .servers(List.of(apiServer))
                .info(new Info()
                        .title("Topolski CMS Project API")
                        .version("1.0")
                        .description("API for managing resources"));
    }
}