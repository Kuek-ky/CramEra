package com.cram_era.backend.entities;

public class Syllabus extends File {

    private Long uploadedByUserId;
    private String summary;

    // Default Constructor
    public Syllabus() {
    }

    // Getters and Setters
    public Long getUploadedByUserId() {
        return uploadedByUserId;
    }

    public void setUploadedByUserId(Long uploadedByUserId) {
        this.uploadedByUserId = uploadedByUserId;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }
}