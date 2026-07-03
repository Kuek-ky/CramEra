package com.cram_era.backend.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "saved_documents")
public class SavedDoc {

    @EmbeddedId
    private SavedDocId id;

    @Column(name = "folder_ID")
    private Integer folderId;

    public SavedDoc() {}

    public SavedDocId getId() {
        return id;
    }

    public void setId(SavedDocId id) {
        this.id = id;
    }

    public Integer getFolderId() {
        return folderId;
    }

    public void setFolderId(Integer folderId) {
        this.folderId = folderId;
    }
}