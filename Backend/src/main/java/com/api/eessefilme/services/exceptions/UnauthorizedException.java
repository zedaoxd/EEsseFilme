package com.api.eessefilme.services.exceptions;

public class UnauthorizedException extends RuntimeException{

	public UnauthorizedException(String message) {
        super(message);
    }
}
