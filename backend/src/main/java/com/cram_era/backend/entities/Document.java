package com.cram_era.backend.entities;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "documents")
public class Document {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "owner_user_ID")
    private Integer ownerUserID;

    @Column(name = "original_uploader_ID")
    private Integer originalUploaderID;

    @Column(name = "module_ID")
    private Integer moduleID;

    @Column(name = "title", nullable = false, length = 50)
    private String title;

    @Column(name = "description", length = 8000)
    private String description;

    @Column(name = "file_URL", nullable = false, length = 100)
    private String fileURL;

    @Column(name = "file_type", nullable = false, length = 25)
    private String fileType;

    @Column(name = "visibility", length = 10)
    private String visibility = "public";

    @Column(name = "document_type", length = 20)
    private String documentType = "document";

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // --- Getters and Setters ---

    public void setId(int id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public Integer getOwnerUserID() {
        return ownerUserID;
    }

    public void setOwnerUserID(Integer ownerUserID) {
        this.ownerUserID = ownerUserID;
    }

    public Integer getOriginalUploaderID() {
        return originalUploaderID;
    }

    public void setOriginalUploaderID(Integer originalUploaderID) {
        this.originalUploaderID = originalUploaderID;
    }

    public Integer getModuleID() {
        return moduleID;
    }

    public void setModuleID(Integer moduleID) {
        this.moduleID = moduleID;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getFileURL() {
        return fileURL;
    }

    public void setFileURL(String fileURL) {
        this.fileURL = fileURL;
    }

    public String getFileType() {
        return fileType;
    }

    public void setFileType(String fileType) {
        this.fileType = fileType;
    }

    public String getVisibility() {
        return visibility;
    }

    public void setVisibility(String visibility) {
        this.visibility = visibility;
    }

    public String getDocumentType() {
        return documentType;
    }

    public void setDocumentType(String documentType) {
        this.documentType = documentType;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    //methods
    public String generateS3Key(int userId, MultipartFile file) {
        String originalFilename = file.getOriginalFilename();
        String extension = "";

        if (originalFilename != null && originalFilename.contains(".")) {
            extension = originalFilename.substring(originalFilename.lastIndexOf("."));
        }

        // Generate the unique identifier
        String uniqueID = UUID.randomUUID().toString();

        // Construct the S3 key
        return "users/" + userId + "/" + uniqueID + extension;
    }
}