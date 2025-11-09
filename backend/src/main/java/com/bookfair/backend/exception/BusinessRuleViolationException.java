package com.bookfair.backend.exception;

public class BusinessRuleViolationException extends RuntimeException {
    public BusinessRuleViolationException(String msg) {
        super(msg);
    }
}