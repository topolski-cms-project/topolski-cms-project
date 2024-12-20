package com.topolski.backend;

import com.topolski.backend.controller.GlobalExceptionHandler;
import com.topolski.backend.s3.S3Service;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;

@TestConfiguration
public class TestsBeanConfiguration {

    @Bean
    public GlobalExceptionHandler initializeForTests() {
        return new GlobalExceptionHandler();
    }

    @Bean
    public S3Service initializeS3FakeService() {
        return FakeS3Service.create();
    }
}
