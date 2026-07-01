package com.cram_era.backend.controller;

import com.cram_era.backend.entities.UserCreation;
import com.cram_era.backend.service.UserService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

// in charge of receiving request, reading JSON body, printing to console
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
}