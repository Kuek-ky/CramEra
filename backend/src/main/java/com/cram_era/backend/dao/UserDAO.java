package com.cram_era.backend.dao;

import com.cram_era.backend.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UserDAO extends JpaRepository<User, Integer> {
    boolean existsByUserName(String userName);
    boolean existsByUserEmail(String userEmail);
    Optional<User> findByUserName(String userName);
    // ^^ search the database by email
}

