package com.topolski.backend.exception;

public class ReviewNotFoundException extends RuntimeException {

    private static final String PRODUCT_NOT_FOUND_MESSAGE = "Review with the given ID was not found.";

    public ReviewNotFoundException() {
        super(PRODUCT_NOT_FOUND_MESSAGE);
    }
}
