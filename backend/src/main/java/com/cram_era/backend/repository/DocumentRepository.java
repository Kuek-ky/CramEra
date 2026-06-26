package com.cram_era.backend.repository;

import com.cram_era.backend.entities.Document;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface DocumentRepository extends JpaRepository<Document, Integer> {

    @Query("""
            SELECT d FROM Document d
            WHERE (:name IS NULL OR LOWER(d.title) LIKE LOWER(CONCAT('%', :name, '%')))
            AND (:category IS NULL OR LOWER(d.fileType) = LOWER(:category))
            """)
    List<Document> searchDocuments(
            @Param("name") String name,
            @Param("category") String category
    );
}
