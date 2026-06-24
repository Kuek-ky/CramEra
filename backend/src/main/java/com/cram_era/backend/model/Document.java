package com.cram_era.backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "documents")
public class Document {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "documentsID")
    private Integer documentsID;

    @Column(name = "owner_user_ID")
    private Integer ownerUserID;

    @Column(name = "module_ID")
    private Integer moduleID;

    @Column(name = "documents_title")
    private String documentsTitle;

    @Column(name = "descriptions")
    private String descriptions;

    @Column(name = "title_URL")
    private String titleURL;

    @Column(name = "file_type")
    private String fileType;

    @Column(name = "visibility")
    private String visibility;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public Integer getDocumentsID() {
        return documentsID;
    }

    public void setDocumentsID(Integer documentsID) {
        this.documentsID = documentsID;
    }

    public Integer getOwnerUserID() {
        return ownerUserID;
    }

    public void setOwnerUserID(Integer ownerUserID) {
        this.ownerUserID = ownerUserID;
    }

    public Integer getModuleID() {
        return moduleID;
    }

    public void setModuleID(Integer moduleID) {
        this.moduleID = moduleID;
    }

    public String getDocumentsTitle() {
        return documentsTitle;
    }

    public void setDocumentsTitle(String documentsTitle) {
        this.documentsTitle = documentsTitle;
    }

    public String getDescriptions() {
        return descriptions;
    }

    public void setDescriptions(String descriptions) {
        this.descriptions = descriptions;
    }

    public String getTitleURL() {
        return titleURL;
    }

    public void setTitleURL(String titleURL) {
        this.titleURL = titleURL;
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

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
}
