package com.cram_era.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.cram_era.backend.entities.Document;

public interface DocumentRepository extends JpaRepository<Document, Integer> {

    @Query("""
            SELECT d FROM Document d
            WHERE (:name IS NULL OR LOWER(d.title) LIKE LOWER(CONCAT('%', :name, '%')))
            AND (d.visibility = 'public')
            AND (:docType IS NULL OR LOWER(d.documentType) = LOWER(:docType))
            """)
    List<Document> searchDocuments(
            @Param("name") String name,
            @Param("docType") String docType
    );
}
