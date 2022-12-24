package com.api.eessefilme.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.common.exceptions.UnauthorizedClientException;
import org.springframework.stereotype.Service;

import com.api.eessefilme.entities.User;
import com.api.eessefilme.repositories.UserRepository;
import com.api.eessefilme.services.exceptions.UnauthorizedException;

@Service
public class AuthService {

	@Autowired
	private UserRepository userRepository;
	
	public User authenticated() {
		try {
			String username = SecurityContextHolder.getContext().getAuthentication().getName();
			return userRepository.findByEmail(username);
		} catch(Exception e){
			throw new UnauthorizedException("Invalid user");
		}
	}
}
