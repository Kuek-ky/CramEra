package com.cram_era.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import com.cram_era.backend.entities.UserCreation;
import com.cram_era.backend.service.UserService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import com.cram_era.backend.entities.UserLogin;
import com.cram_era.backend.entities.LoginResponse;

// in charge of receiving request, reading JSON body, printing to console
@CrossOrigin(origins = {"http://localhost:8081", "http://127.0.0.1:8081"})
@RestController
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // to create user, use @PostMapping instead of @GetMapping, latter is more for giving information
    @PostMapping("/api/users")
    public ResponseEntity<String> receiveRequest(@RequestBody UserCreation userCreation) {
        try {
            String result = userService.createUser(userCreation);
            return ResponseEntity.ok(result);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/api/login")
//    public LoginResponse login(@RequestBody UserLogin userLogin){
//
//        return userService.loginUser(userLogin);
//    }
    public ResponseEntity<?> login(@RequestBody UserLogin userLogin) {
        try {
            LoginResponse response = userService.loginUser(userLogin);
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(e.getMessage());
        }
    }

}