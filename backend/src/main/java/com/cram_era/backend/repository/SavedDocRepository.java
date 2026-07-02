package com.cram_era.backend.repository;

import com.cram_era.backend.entities.SavedDoc;
import com.cram_era.backend.entities.SavedDocId;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
public interface SavedDocRepository
        extends JpaRepository<SavedDoc, SavedDocId> {

    List<SavedDoc> findByIdUserId(Integer userId);

    boolean existsByIdUserIdAndIdDocumentId(
            Integer userId,
            Integer documentId);

    void deleteByIdUserIdAndIdDocumentId(
            Integer userId,
            Integer documentId);

}