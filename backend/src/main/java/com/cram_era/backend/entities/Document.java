package com.cram_era.backend.entities;

public class Document extends File {

    private Long ownerUserId;
    private String description;
    private String visibility;

    // Default Constructor
    public Document() {
    }

    // Getters and Setters
    public Long getOwnerUserId() {
        return ownerUserId;
    }

    public void setOwnerUserId(Long ownerUserId) {
        this.ownerUserId = ownerUserId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getVisibility() {
        return visibility;
    }

    public void setVisibility(String visibility) {
        this.visibility = visibility;
    }

}
