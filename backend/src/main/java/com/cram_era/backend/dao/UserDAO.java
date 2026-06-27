package com.cram_era.backend.dao;

import com.cram_era.backend.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserDAO extends JpaRepository<User, Integer> {
    boolean existsByUserName(String userName);
    boolean existsByUserEmail(String userEmail);
}

