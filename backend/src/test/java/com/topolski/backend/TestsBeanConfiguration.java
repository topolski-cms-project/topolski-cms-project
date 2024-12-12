package com.topolski.backend;

import com.topolski.backend.controller.GlobalExceptionHandler;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;

@TestConfiguration
public class TestsBeanConfiguration {

    @Bean
    public GlobalExceptionHandler initializeForTests() {
        return new GlobalExceptionHandler();
    }
}
