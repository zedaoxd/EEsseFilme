package com.api.eessefilme.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.common.exceptions.UnauthorizedClientException;
import org.springframework.stereotype.Service;

import com.api.eessefilme.entities.User;
import com.api.eessefilme.repositories.UserRepository;
import com.api.eessefilme.services.exceptions.UnauthorizedException;

import javax.persistence.EntityNotFoundException;

@Service
public class AuthService {

	@Autowired
	private UserRepository userRepository;
	
	public User authenticated() {
		try {
			String username = SecurityContextHolder.getContext().getAuthentication().getName();
			User user = userRepository.findByEmail(username);
			return user;
		} catch(Exception e){
			throw new UnauthorizedException("Invalid user");
		}
	}
}
