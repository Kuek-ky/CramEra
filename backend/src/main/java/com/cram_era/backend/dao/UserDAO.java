package com.cram_era.backend.dao;

import com.cram_era.backend.entities.User;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

// In charge of operating the database, saving the user into database
@Repository
public class UserDAO {

    private final JdbcTemplate jdbcTemplate;

    public UserDAO(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public int createUser(User user){
        String sql = "Insert into users (user_name, user_email) values (?, ?)";
        System.out.println("DAO reached: inserting user");
        return jdbcTemplate.update(sql, user.getUserName(), user.getUserEmail());
    }

    public boolean doesUserNameAlrExist(String userName){
        String sql = "Select count(*) from users where user_name = ?";
        Integer count = jdbcTemplate.queryForObject(sql, Integer.class, userName);
        return count != null && count > 0;
    }


    public boolean doesUserEmailAlrExist(String userEmail){
        String sql = "Select count(*) from users where user_email = ?";
        Integer count = jdbcTemplate.queryForObject(sql, Integer.class, userEmail);
        return count != null && count > 0;
    }
}
