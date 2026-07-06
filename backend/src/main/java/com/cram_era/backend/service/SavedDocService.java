package com.cram_era.backend.service;

import com.cram_era.backend.entities.SavedDoc;
import com.cram_era.backend.repository.SavedDocRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class SavedDocService {

    private final SavedDocRepository repository;

    public SavedDocService(SavedDocRepository repository) {
        this.repository = repository;
    }

    /**
     * Save a document to the user's folder.
     * Throws an exception if the document is already saved.
     */
    public SavedDoc saveDocument(SavedDoc savedDoc) {

        Integer userId = savedDoc.getId().getUserId();
        Integer documentId = savedDoc.getId().getDocumentId();

        if (repository.existsByIdUserIdAndIdDocumentId(userId, documentId)) {
            throw new RuntimeException("This document has already been saved.");
        }

        return repository.save(savedDoc);
    }

    /**
     * Get every saved document for a user.
     */
    public List<SavedDoc> getSavedDocument(Integer userId) {

        return repository.findByIdUserId(userId);

    }

    /**
     * Check whether a document has already been saved.
     */
    public boolean isSaved(Integer userId, Integer documentId) {

        return repository.existsByIdUserIdAndIdDocumentId(
                userId,
                documentId);

    }

    /**
     * Delete a saved document.
     */
    @Transactional
    public void deleteSavedDocument(Integer userId,
                                    Integer documentId) {

        repository.deleteByIdUserIdAndIdDocumentId(
                userId,
                documentId);

    }

}
