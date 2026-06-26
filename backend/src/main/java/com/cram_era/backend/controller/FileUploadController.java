package com.cram_era.backend.controller;

import java.io.IOException;
import java.util.NoSuchElementException;

import com.cram_era.backend.entities.Document;
import com.cram_era.backend.repository.DocumentRepository;
import com.cram_era.backend.service.DocumentService;
import com.cram_era.backend.service.S3Service;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.beans.factory.annotation.Autowired;

//this file involves data manipulation with the S3 bucket
@RestController
@RequestMapping("file")
public class FileUploadController {
	private final DocumentService documentService;
	private final S3Service s3Service;
	private final DocumentRepository documentRepository;

	@Autowired
	public FileUploadController(DocumentService documentService, S3Service s3Service, DocumentRepository documentRepository) {
		this.documentService = documentService;
		this.s3Service = s3Service;
		this.documentRepository = documentRepository;
	}

	@Value("${aws.s3.bucketName}")
	private String bucketName;

	@GetMapping("/")
	public String index() {
		return "upload";
	}

	@PostMapping(path="/upload")
	public String handleFileUpload(@RequestPart("file") MultipartFile file,
	                               @RequestPart("document") Document newDoc){
		String fileUrl = "";
		int docOwnerId = newDoc.getOwnerUserID();
		String uniqueFileName = newDoc.generateS3Key(docOwnerId, file);
		String fileType = file.getContentType();
		Document success = null;
		if (file.isEmpty()) {
			return "no file uploaded!";
		}
		try {
			// Upload to S3
			fileUrl = s3Service.uploadFile(bucketName, uniqueFileName, file.getInputStream());

			newDoc.setOriginalUploaderID(docOwnerId);
			newDoc.setFileURL(uniqueFileName);
			newDoc.setFileType(fileType);
			documentRepository.save(newDoc);

		} catch (IOException e) {
			e.printStackTrace();
			return "Failed to upload to S3";
		} catch (Exception e) {
			// Catching database or other runtime exceptions
			e.printStackTrace();
			s3Service.deleteFile(bucketName, uniqueFileName);
			return "Database insert failed, rolled back s3 upload";
		}
		return fileUrl;
	}

	@DeleteMapping("/delete/{id}")
	public String deleteFileUpload(@PathVariable("id") int id) {
		Document doc = null;

		try{
			doc = documentService.getDocumentById(id);

			documentService.deleteDocumentById(id);
			s3Service.deleteFile(bucketName, doc.getFileURL());
		} catch (NoSuchElementException e) {
			e.printStackTrace();
			return "Failed to delete from sql";
		} catch (Exception e) {
			documentRepository.save(doc);
			e.printStackTrace();
			return "S3 delete failed, rolled back sql delete";
		}

		return "deleted!";
	}

	@PutMapping(path="/update/{id}")
	public String updateFileUpload(@PathVariable("id") int id,
	                               @RequestPart("file") MultipartFile file,
	                               @RequestPart("document") Document updatedDoc) {
		Document existingDoc = null;
		String oldS3Key = null;
		String newFileUrl = "";

		if (!file.isEmpty()) {
			try {
				// Get original document to get old file key
				existingDoc = documentService.getDocumentById(id);
				oldS3Key = existingDoc.getFileURL();
			} catch (NoSuchElementException e) {
				e.printStackTrace();
				return "Document not found in database";
			}
		}

		int ownerId = updatedDoc.getOwnerUserID();
		//add in original id to allow repository.save to update row
		updatedDoc.setId(id);

		// Generate new S3 key
		String newS3Key = updatedDoc.generateS3Key(ownerId, file);
		updatedDoc.setFileURL(newS3Key);

		String fileType = file.getContentType();
		updatedDoc.setFileType(fileType);
		Document success = null;

		try {
			newFileUrl = s3Service.uploadFile(bucketName, newS3Key, file.getInputStream());
			documentRepository.save(updatedDoc);

		} catch (IOException e) {
			e.printStackTrace();
			return "Failed to upload new file to S3";
		} catch (Exception e) {
			// Catching database exceptions: Rollback the NEW S3 upload so we don't leave orphans
			e.printStackTrace();
			s3Service.deleteFile(bucketName, newS3Key);
			return "Database update failed, rolled back new s3 upload";
		}

		// Delete the OLD file from S3 (only happens if new upload and DB update succeed)
		try {
			if (oldS3Key != null && !oldS3Key.isEmpty()) {
				s3Service.deleteFile(bucketName, oldS3Key);
			}
		} catch (Exception e) {
			e.printStackTrace();
			System.err.println("Warning: Failed to delete old S3 file: " + oldS3Key);
		}

		return newFileUrl;
	}

}