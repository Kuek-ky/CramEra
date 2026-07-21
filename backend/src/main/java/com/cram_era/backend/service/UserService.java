package com.cram_era.backend.service;

import com.cram_era.backend.dao.UserDAO;
import com.cram_era.backend.entities.User;
import com.cram_era.backend.entities.UserCreation;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import com.cram_era.backend.entities.UserLogin;
import com.cram_era.backend.entities.LoginResponse;
import java.util.Optional;

// in charge of business rules, make sure userName and userEmail are valid,
// and also not already existing in the system (already existing account)
@Service
public class UserService {
    private final UserDAO userDAO;
    private final BCryptPasswordEncoder passwordEncoder;

    public UserService(UserDAO userDAO, BCryptPasswordEncoder passwordEncoder) {
        this.userDAO = userDAO;
        this.passwordEncoder = passwordEncoder;
    }

    public LoginResponse createUser(UserCreation userCreation){
        checkUserEmailValidity(userCreation);
        checkUserNameValidity(userCreation);
        checkPasswordValidity(userCreation);

        if (userDAO.existsByUserName(userCreation.getUserName().trim())) {
            throw new IllegalArgumentException("Username already exists");
        }
        if (userDAO.existsByUserEmail(userCreation.getUserEmail().trim())){
            throw new IllegalArgumentException("Email already exists");
        }

        User user = new User();
        String userName = userCreation.getUserName().trim();
        String userEmail = userCreation.getUserEmail().trim();

        user.setUserName(userName);
        user.setUserEmail(userEmail);

        String hashedPassword = passwordEncoder.encode(userCreation.getUserPassword());
        user.setPasswordHash(hashedPassword);

        int userId = userDAO.save(user).getUserId();
        return new LoginResponse(userName, userEmail, userId);
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

    public String checkPasswordValidity(UserCreation userCreation){
        String userPassword = userCreation.getUserPassword();
        if (userPassword == null || userPassword.isBlank()) {
            throw new IllegalArgumentException("Password cannot be blank");
        }
        userPassword = userPassword.trim();
        if (userPassword.length() < 8){
            throw new IllegalArgumentException("Password must be at least 8 characters");
        }

        boolean hasLetter = false;
        boolean hasDigit = false;
        for (int i = 0; i < userPassword.length(); i++){
            char curr = userPassword.charAt(i);
            if (Character.isLetter(curr)){
                hasLetter = true;
            }
            if (Character.isDigit(curr)){
                hasDigit = true;
            }
        }
        if (!hasLetter) {
            throw new IllegalArgumentException("Password must contain at least one letter");
        } else if (!hasDigit){
            throw new IllegalArgumentException("Password must contain at least one number");
        }
        return "Password is valid";
    }

    public LoginResponse loginUser(UserLogin userLogin) {
        String userName = userLogin.getUserName();
        String userPassword = userLogin.getUserPassword();

        if (userName == null || userName.isBlank()) {
            throw new IllegalArgumentException("Username cannot be blank");
        }
        if (userPassword == null || userPassword.isBlank()) {
            throw new IllegalArgumentException("Password cannot be blank");
        }
        userName = userName.trim();

        Optional<User> optionalUser = userDAO.findByUserName(userName);
        if (optionalUser.isEmpty()) {
            throw new IllegalArgumentException("Invalid username or password");
        }
        User user = optionalUser.get();

        if (!passwordEncoder.matches(userPassword, user.getPasswordHash())) {
            throw new IllegalArgumentException("Invalid username or password.");
        }

        return new LoginResponse(user.getUserName(), user.getUserEmail(), user.getUserId());
    }

}
