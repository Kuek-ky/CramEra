package com.cram_era.backend.entities;

import jakarta.persistence.*;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class SavedDocId implements Serializable {

    @Column(name = "document_ID")
    private Integer documentId;

    @Column(name = "user_ID")
    private Integer userId;

    public SavedDocId() {}

    public SavedDocId(Integer documentId, Integer userId) {
        this.documentId = documentId;
        this.userId = userId;
    }

    public Integer getDocumentId() {
        return documentId;
    }

    public void setDocumentId(Integer documentId) {
        this.documentId = documentId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    // Required for composite keys
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof SavedDocId)) return false;
        SavedDocId that = (SavedDocId) o;
        return Objects.equals(documentId, that.documentId)
                && Objects.equals(userId, that.userId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(documentId, userId);
    }
}