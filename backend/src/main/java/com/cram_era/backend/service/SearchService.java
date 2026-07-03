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

    public List<Document> search(String name, String docType, String docTag, String module) {
        String cleanedName = clean(name);
        String cleanedDocType = clean(docType);
        String cleanedDocTag = clean(docTag);
        String cleanedModule = clean(module);

        return documentRepository.searchDocuments(cleanedName, cleanedDocType, cleanedDocTag, cleanedModule);
    }

    private String clean(String value) {
        if (value == null || value.isBlank()) {
            return null;
        }

        return value.trim();
    }
}