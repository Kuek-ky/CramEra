package com.cram_era.backend.service;

import com.cram_era.backend.dao.UserDAO;
import com.cram_era.backend.entities.User;
import com.cram_era.backend.entities.UserCreation;
import org.springframework.stereotype.Service;

// in charge of business rules, make sure userName and userEmail are valid,
// and also not already existing in the system (already existing account)
@Service
public class UserService {
    private final UserDAO userDAO;

    public UserService(UserDAO userDAO) {
        this.userDAO = userDAO;
    }

    public String createUser(UserCreation userCreation){
        checkUserEmailValidity(userCreation);
        checkUserNameValidity(userCreation);

        if (userDAO.existsByUserName(userCreation.getUserName().trim())) {
            throw new IllegalArgumentException("Username already exists");
        }
        if (userDAO.existsByUserEmail(userCreation.getUserEmail().trim())){
            throw new IllegalArgumentException("Email already exists");
        }


        User user = new User();

        user.setUserName(userCreation.getUserName().trim());
        user.setUserEmail(userCreation.getUserEmail().trim());

        userDAO.save(user);
        return "User successfully created";
    }

    public String checkUserNameValidity(UserCreation userCreation){
        String userName = userCreation.getUserName();
        if (userName == null || userName.isBlank()) {
            throw new IllegalArgumentException("Username cannot be blank");
        }

        userName = userName.trim();
        if (userName.isBlank() || userCreation.getUserName() == null){
            throw new IllegalArgumentException("Username cannot be blank");
        } else if (userName.length() < 6){
            throw new IllegalArgumentException("Username cannot be less than 6 characters");
        } else if (userName.length() > 20){
            throw new IllegalArgumentException("Username cannot be more than 20 characters");
        } else if (!userName.matches("[a-zA-Z0-9_]+")){
            // allow only letters, numbers and underscore (_)
            throw new IllegalArgumentException("Username can only contain letters, numbers and underscore");
        }
        return "UserName is valid";
    }

    public String checkUserEmailValidity(UserCreation userCreation){
        String userEmail = userCreation.getUserEmail();
        if (userEmail == null || userEmail.isBlank()) {
            throw new IllegalArgumentException("Email cannot be blank");
        }
        userEmail = userEmail.trim();
        if (!userEmail.contains("@")){
            throw new IllegalArgumentException("Email must contain @");
        } else if (userEmail.indexOf("@") != userEmail.lastIndexOf("@")) {
            throw new IllegalArgumentException("Email must only contain one @");
        } else if (userEmail.indexOf("@") == 0){
            throw new IllegalArgumentException("Email cannot not have @ as the first character");
        } else if (userEmail.lastIndexOf('.') < userEmail.indexOf("@")){
            // . has to come AFTER @, so it should have a higher index-> leonKennedy@hotman.com
            throw new IllegalArgumentException("Email has incorrect formatting");
        }
        isEmailCharValid(userEmail);
        return "UserEmail is valid";
    }

    public void isEmailCharValid(String userEmail){
        for (char c: userEmail.toCharArray()){
            if (Character.isLetter(c) || Character.isDigit(c) || c == '@' || c == '-' || c == '_' || c == '.'){
                continue;
            }
            throw new IllegalArgumentException("Email contains invalid character " + c);
        }
    }
}
