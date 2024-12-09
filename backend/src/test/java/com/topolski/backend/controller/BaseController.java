package com.topolski.backend.controller;


import io.restassured.RestAssured;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import org.junit.jupiter.api.BeforeEach;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@Transactional(propagation = Propagation.NEVER)
public class BaseController {

    @LocalServerPort
    protected int port;

    @BeforeEach
    public void setup() {
        RestAssured.baseURI = "http://localhost/api";
        RestAssured.port = port;
    }
}
