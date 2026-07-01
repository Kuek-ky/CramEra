package com.cram_era.backend.entities;

// in charge of receiving request, reading JSON body, printing to console
public class UserCreation {
    private String userName;
    private String userEmail;

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }
}