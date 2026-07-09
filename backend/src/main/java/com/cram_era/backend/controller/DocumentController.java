package com.cram_era.backend.controller;

import com.cram_era.backend.entities.Document;
import com.cram_era.backend.service.DocumentService;
import com.cram_era.backend.service.S3Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;

import java.util.List;

@RestController
@RequestMapping("document")
public class DocumentController {

    private final DocumentService documentService;

    @Autowired
    public DocumentController(DocumentService documentService, S3Service s3Service) {
        this.documentService = documentService;
    }

    @GetMapping(path = "getMetaData/{id}")
    public Document getMetaDataById(@PathVariable("id") int id) {

        return documentService.getDocumentById(id);
    }

    @GetMapping(path = "getFileUrl/{id}")
    public String getFileUrlById(@PathVariable("id") int id) {

        return documentService.getFullDocumentUrlById(id);
    }

    @GetMapping("/file/{id}")
    public ResponseEntity<Resource> getFile(@PathVariable int id) {
        return documentService.downloadFile(id);
    }

    @GetMapping("/search")
    public List<Document> searchDocuments(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String docType,
            @RequestParam(required = false) String docTag,
            @RequestParam(required = false) String module
    ) {

        return documentService.searchDocuments(
                name,
                docType,
                docTag,
                module
        );

    }
}
