package com.cram_era.backend.service;

import com.cram_era.backend.entities.Document;
import com.cram_era.backend.entities.Module;
import com.cram_era.backend.repository.ModuleRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import com.cram_era.backend.repository.DocumentRepository;

import java.util.List;

@Service
public class SearchService {

    private final DocumentRepository documentRepository;
    private final ModuleRepository moduleRepository;

    public SearchService(DocumentRepository documentRepository,
                         ModuleRepository moduleRepository) {
        this.documentRepository = documentRepository;
        this.moduleRepository = moduleRepository;
    }

    public List<Document> search(String name, String docType, String docTag, String module) {
        String cleanedName = clean(name);
        String cleanedDocType = clean(docType);
        String cleanedDocTag = clean(docTag);
        String cleanedModule = clean(module);

        return documentRepository.searchDocuments(cleanedName, cleanedDocType, cleanedDocTag, cleanedModule);
    }

    public List<Module> searchModulesByName(String name) {
        String cleanedName = clean(name);

        return moduleRepository.searchModulesByNameOrCode(
                cleanedName,
                PageRequest.of(0, 5)); // limit get to 5 results
    }

    private String clean(String value) {
        if (value == null || value.isBlank()) {
            return null;
        }

        return value.trim();
    }
}