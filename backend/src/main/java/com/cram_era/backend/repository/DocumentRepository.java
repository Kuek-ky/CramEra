package com.cram_era.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.cram_era.backend.entities.Document;

public interface DocumentRepository extends JpaRepository<Document, Integer> {

    @Query("""
SELECT DISTINCT d
FROM Document d
LEFT JOIN d.tags t
LEFT JOIN d.module m
WHERE
(:name IS NULL OR LOWER(d.title) LIKE LOWER(CONCAT('%', :name, '%')))
AND (:docType IS NULL OR LOWER(d.documentType) = LOWER(:docType))
AND (:docTag IS NULL OR LOWER(t.tagName) = LOWER(:docTag))
AND (
    :module IS NULL
    OR LOWER(m.moduleCode) LIKE LOWER(CONCAT('%', :module, '%'))
    OR LOWER(m.moduleName) LIKE LOWER(CONCAT('%', :module, '%'))
)
AND d.visibility = 'public'
""")
    List<Document> searchDocuments(
            String name,
            String docType,
            String docTag,
            String module
    );
}
