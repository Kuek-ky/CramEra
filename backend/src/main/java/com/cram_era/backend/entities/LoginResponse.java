package com.cram_era.backend.entities;

public class LoginResponse {
    private String userName;
    private String userEmail;
    private int userId;

    public LoginResponse(String userName, String userEmail, int userId) {
        this.userName = userName;
        this.userEmail = userEmail;
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public int getUserId() { return userId;}
}