package com.api.eessefilme.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.api.eessefilme.entities.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long>{

}
