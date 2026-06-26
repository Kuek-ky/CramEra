package com.cram_era.backend.service;

import com.cram_era.backend.entities.Document;
import com.cram_era.backend.repository.DocumentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
public class DocumentService {

    private final DocumentRepository documentRepository;

    @Value("${aws.s3.base_url}")
    private String baseUrl;

    @Autowired
    public DocumentService(DocumentRepository documentRepository) {
        this.documentRepository = documentRepository;
    }

    public Document insertDocument(int ownerId, int moduleId, String title, String description,
                                   String fileType, String fileUrl, String visibility) {
        Document document = new Document();
        document.setOwnerUserID(ownerId);
        document.setOriginalUploaderID(ownerId);
        document.setModuleID(moduleId);
        document.setDescription(description);
        document.setTitle(title);
        document.setFileURL(fileUrl);
        document.setFileType(fileType);
        document.setVisibility(visibility);

        return documentRepository.save(document);
    }

    public Document insertSyllabus(int ownerId, int moduleId, String title, String description,
                                    String fileType, String fileUrl, String visibility,
                                    String documentType) {
        Document document = new Document();
        document.setOwnerUserID(ownerId);
        document.setOriginalUploaderID(ownerId);
        document.setModuleID(moduleId);
        document.setDescription(description);
        document.setTitle(title);
        document.setFileURL(fileUrl);
        document.setFileType(fileType);
        document.setVisibility(visibility);
        document.setDocumentType(documentType);

        return documentRepository.save(document);
    }

    public Document getDocumentById(int id) {
        // findById returns an Optional, which prevents null pointer exceptions
        return documentRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Document not found with id: " + id));
    }

    public String getFullDocumentUrlById(int id) {
        Document document = getDocumentById(id);
        return baseUrl + document.getFileURL();
    }

    public void deleteDocumentById(int id)  {
        documentRepository.deleteById(id);
    }
}