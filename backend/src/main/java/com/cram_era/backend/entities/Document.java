package com.cram_era.backend.entities;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.web.multipart.MultipartFile;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "module_ID")
    private Module module;

    @Column(name = "title", nullable = false, length = 50)
    private String title;

    @Column(name = "description", length = 8000)
    private String description;

    @Column(name = "file_URL", nullable =false, length = 255)
    private String fileURL;
    //stores the unique AWS S3Key for generating presigned URL

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

    @ManyToMany
    @JoinTable(
            name = "document_tags",
            joinColumns = @JoinColumn(name = "document_ID"),
            inverseJoinColumns = @JoinColumn(name = "tag_ID")
    )
    private Set<Tag> tags = new HashSet<>();

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

    public Module getModule() {
        return module;
    }

    public void setModule(Module module) {
        this.module = module;
    }

    public Set<Tag> getTags() {
        return tags;
    }

    public void setTags(Set<Tag> tags) {
        this.tags = tags;
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