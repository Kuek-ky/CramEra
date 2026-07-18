package com.cram_era.backend.controller;

import com.cram_era.backend.entities.UserCreation;
import com.cram_era.backend.service.UserService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import com.cram_era.backend.entities.UserLogin;
import com.cram_era.backend.entities.LoginResponse;

// in charge of receiving request, reading JSON body, printing to console
@CrossOrigin(origins = {"http://172.18.110.10:8081", "http://127.0.0.1:8081"})
@RestController
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // to create user, use @PostMapping instead of @GetMapping, latter is more for giving information
    @PostMapping("/api/users")
    public String receiveRequest(@RequestBody UserCreation userCreation){
        return userService.createUser(userCreation);
    }

    @PostMapping("/api/login")
    public LoginResponse login(@RequestBody UserLogin userLogin){
        System.out.println(userLogin.getUserName());
        System.out.println(userLogin.getUserPassword());
        return userService.loginUser(userLogin);
    }
}