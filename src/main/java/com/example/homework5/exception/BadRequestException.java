package com.example.homework5.exception;

public class BadRequestException extends RuntimeException {
    public BadRequestException(String string) {
        super(string);

    }
}
