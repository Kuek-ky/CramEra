package com.cram_era.backend.service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.cram_era.backend.entities.Document;
import com.cram_era.backend.entities.Module;
import com.cram_era.backend.repository.DocumentRepository;
import com.cram_era.backend.repository.ModuleRepository;

@Service
public class DocumentService {

    private final DocumentRepository documentRepository;
    private final ModuleRepository moduleRepository;
    private final S3Service s3Service;

    @Value("${aws.s3.base_url}")
    private String baseUrl;

    @Autowired
    public DocumentService(DocumentRepository documentRepository,
            ModuleRepository moduleRepository,
            S3Service s3Service) {
        this.documentRepository = documentRepository;
        this.moduleRepository = moduleRepository;
        this.s3Service = s3Service;
    }

    public List<Document> searchDocuments(
            String name,
            String docType,
            String docTag,
            String module
    ) {

        return documentRepository.searchDocuments(
                name,
                docType,
                docTag,
                module
        );

    }

    public Document insertDocument(int ownerId,
            int moduleId,
            String title,
            String description,
            String fileType,
            String fileUrl,
            String visibility,
            String documentType) {

        Module module = moduleRepository.findById(moduleId)
                .orElseThrow(()
                        -> new NoSuchElementException("Module not found with id: " + moduleId));

        Document document = new Document();

        document.setOwnerUserID(ownerId);
        document.setOriginalUploaderID(ownerId);
        document.setModule(module);
        document.setTitle(title);
        document.setDescription(description);
        document.setFileURL(fileUrl);
        document.setFileType(fileType);
        document.setVisibility(visibility);

        // Default document type
        if (documentType == null || documentType.isBlank()) {
            documentType = "document";
        }

        document.setDocumentType(documentType);

        return documentRepository.save(document);
    }

    public Document getDocumentById(int id) {
        return documentRepository.findById(id)
                .orElseThrow(()
                        -> new NoSuchElementException("Document not found with id: " + id));
    }

    public String getFullDocumentUrlById(int id) {
        Document document = getDocumentById(id);
        return baseUrl + document.getFileURL();
    }

    public void deleteDocumentById(int id) {
        if (!documentRepository.existsById(id)) {
            throw new NoSuchElementException("Document not found with id: " + id);
        }

        documentRepository.deleteById(id);
    }

    public ResponseEntity<Resource> downloadFile(int id) {

        Document doc = getDocumentById(id);

        byte[] fileData = s3Service.downloadFile(doc.getFileURL());
        // OR doc.getS3Key() if you have that field

        ByteArrayResource resource = new ByteArrayResource(fileData);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "inline; filename=\"" + doc.getTitle() + "\"")
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(resource);
    }
}
