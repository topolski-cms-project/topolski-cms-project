package com.topolski.backend.exception;

public class ProductNotFoundException extends RuntimeException {

    private static final String PRODUCT_NOT_FOUND_MESSAGE = "Product with the given ID was not found.";
    public ProductNotFoundException() {
        super(PRODUCT_NOT_FOUND_MESSAGE);
    }
}
