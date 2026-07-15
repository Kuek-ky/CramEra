package com.cram_era.backend.entities;

public class LoginResponse {
    private String userName;
    private String userEmail;

    public LoginResponse(String userName, String userEmail) {
        this.userName = userName;
        this.userEmail = userEmail;
    }

    public String getUserName() {
        return userName;
    }

    public String getUserEmail() {
        return userEmail;
    }
}