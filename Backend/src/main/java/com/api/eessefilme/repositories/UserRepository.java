package com.api.eessefilme.repositories;

import com.api.eessefilme.entities.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    boolean existsUserByEmail(String email);

    User findByEmail(String email);

    Page<User> findAllByEmailContainingIgnoreCase(String email, Pageable pageable);
}
