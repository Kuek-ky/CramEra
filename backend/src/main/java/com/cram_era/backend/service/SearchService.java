package com.cram_era.backend.service;

import com.cram_era.backend.entities.Document;
import org.springframework.stereotype.Service;
import com.cram_era.backend.repository.DocumentRepository;

import java.util.List;

@Service
public class SearchService {

    private final DocumentRepository documentRepository;

    public SearchService(DocumentRepository documentRepository) {
        this.documentRepository = documentRepository;
    }

    public List<Document> search(String name, String category) {
        String cleanedName = clean(name);
        String cleanedCategory = clean(category);

        return documentRepository.searchDocuments(cleanedName, cleanedCategory);
    }

    private String clean(String value) {
        if (value == null || value.isBlank()) {
            return null;
        }

        return value.trim();
    }
}