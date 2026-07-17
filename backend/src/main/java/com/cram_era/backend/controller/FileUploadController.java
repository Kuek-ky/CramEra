package com.cram_era.backend.controller;

import java.io.IOException;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.cram_era.backend.entities.Document;
import com.cram_era.backend.repository.DocumentRepository;
import com.cram_era.backend.service.DocumentService;
import com.cram_era.backend.service.S3Service;

import tools.jackson.databind.ObjectMapper;

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

	@PostMapping("/test")
	public String test() {
		return "POST works!";
	}

	@PostMapping(path="/upload")
	public ResponseEntity<String> handleFileUpload(@RequestPart("file") MultipartFile file,
	                               @RequestPart("document") Document newDoc){

		System.out.println("UPLOAD HIT");

		String fileUrl = "";
		int docOwnerId = newDoc.getOwnerUserID();
		String uniqueFileName = newDoc.generateS3Key(docOwnerId, file);
		String fileType = file.getContentType();
		Document success = null;
		if (file.isEmpty()) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No file uploaded!");
		}
		try {
			// Upload to S3
			s3Service.uploadFile(bucketName, uniqueFileName, file.getInputStream());

			newDoc.setOriginalUploaderID(docOwnerId);
			newDoc.setFileURL(uniqueFileName);
			newDoc.setFileType(fileType);


			System.out.println("Title = " + newDoc.getTitle());
			System.out.println("Description = " + newDoc.getDescription());

			Document saved = documentRepository.save(newDoc);

			System.out.println("Saved successfully");
			System.out.println(saved.getId());

			long count = documentRepository.count();
			System.out.println("Count = " + count);

			System.out.println("About to return");

			return ResponseEntity.ok("Upload successful");

		} catch (IOException e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload to S3");
		} catch (Exception e) {
			// Catching database or other runtime exceptions
			e.printStackTrace();
			s3Service.deleteFile(bucketName, uniqueFileName);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Database insert failed, rolled back S3 upload");
		}
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
	public ResponseEntity<String> updateFileUpload(@PathVariable("id") int id,
	                               @RequestPart(value = "file", required = false) MultipartFile file,
	                               @RequestPart("document") String documentJson) {

		ObjectMapper mapper = new ObjectMapper();
		Document updatedDoc;
		Document existingDoc;
		try {
			updatedDoc = mapper.readValue(documentJson, Document.class);
			existingDoc = documentService.getDocumentById(id);
		} catch (NoSuchElementException e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Document not found in database");
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Invalid JSON payload");
		}

		updatedDoc.setId(id);
		int ownerId = updatedDoc.getOwnerUserID();

		String oldS3Key = existingDoc.getFileURL();
		String newS3Key = null;
		String newFileUrl = "";

		boolean hasNewFile = (file != null && !file.isEmpty());

		updatedDoc.setOriginalUploaderID(existingDoc.getOriginalUploaderID());

		if (hasNewFile) {
			newS3Key = updatedDoc.generateS3Key(ownerId, file);
			updatedDoc.setFileURL(newS3Key);
			updatedDoc.setFileType(file.getContentType());
		} else {
			updatedDoc.setFileURL(existingDoc.getFileURL());
			updatedDoc.setFileType(existingDoc.getFileType());
		}

		try {
			// Only upload if a new file exists
			if (hasNewFile) {
				newFileUrl = s3Service.uploadFile(bucketName, newS3Key, file.getInputStream());
			}
			documentRepository.save(updatedDoc);

		} catch (IOException e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update S3");
		} catch (Exception e) {
			e.printStackTrace();
			// Rollback S3 upload only if we actually uploaded a new one
			if (hasNewFile && newS3Key != null) {
				s3Service.deleteFile(bucketName, newS3Key);
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Database update failed, rolled back S3 upload");
			}
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Database update failed");
		}

		// Delete the OLD file from S3 (only if a new file was provided and everything succeeded)
		if (hasNewFile && oldS3Key != null && !oldS3Key.isEmpty() && !oldS3Key.equals(newS3Key)) {
			try {
				s3Service.deleteFile(bucketName, oldS3Key);
			} catch (Exception e) {
				e.printStackTrace();
				System.err.println("Warning: Failed to delete old S3 file: " + oldS3Key);
			}
		}
		return ResponseEntity.ok("Update successful");
	}

}