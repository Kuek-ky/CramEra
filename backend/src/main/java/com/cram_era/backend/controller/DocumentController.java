package com.cram_era.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cram_era.backend.entities.Document;
import com.cram_era.backend.service.DocumentService;
import com.cram_era.backend.service.S3Service;

import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;

import java.util.List;

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
//    public Document getMetaDataById(@PathVariable("id") int id) {
//
//        return documentService.getDocumentById(id);
//    }

    public ResponseEntity<Document> getMetaDataById(@PathVariable int id) {
        try {
            Document doc = documentService.getDocumentById(id);
            return ResponseEntity.ok(doc);

        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping(path = "getFileUrl/{id}")
//    public String getFileUrlById(@PathVariable("id") int id) {
//
////        return documentService.getFullDocumentUrlById(id);
//    }

    public ResponseEntity<String> getFileUrlById(@PathVariable int id) {
        try {
            String url = documentService.getFullDocumentUrlById(id);
            return ResponseEntity.ok(url);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Document not found");
        }
    }

	@GetMapping("/download/{id}")
	public ResponseEntity<Resource> downloadFile(@PathVariable("id") int id) {

        return documentService.downloadFile(id);
	}

	@GetMapping("/view/{id}")
//	public String viewFile(@PathVariable("id") int id) {
//		return documentService.getPresignedUrl(id);
//	}

    public ResponseEntity<String> viewFile(@PathVariable int id) {

        try {
            String url = documentService.getPresignedUrl(id);
            return ResponseEntity.ok(url);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Document not found");
        }
    }
	
    @GetMapping("/file/{id}")
    public ResponseEntity<Resource> getFile(@PathVariable int id) {
        return documentService.downloadFile(id);
    }

    @GetMapping("/search")
//    public List<Document> searchDocuments(
//            @RequestParam(required = false) String name,
//            @RequestParam(required = false) String docType,
//            @RequestParam(required = false) String docTag,
//            @RequestParam(required = false) String module
//    ) {
//
//        return documentService.searchDocuments(
//                name,
//                docType,
//                docTag,
//                module
//        );
//
//    }

    public ResponseEntity<List<Document>> searchDocuments(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String docType,
            @RequestParam(required = false) String docTag,
            @RequestParam(required = false) String module
    ) {

        List<Document> docs = documentService.searchDocuments(
                name,
                docType,
                docTag,
                module
        );

        return ResponseEntity.ok(docs);
    }
}
