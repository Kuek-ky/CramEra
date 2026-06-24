package com.cram_era.backend.controller;

import java.io.IOException;

import com.cram_era.backend.dao.DocumentDAO;
import com.cram_era.backend.service.S3Service;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.beans.factory.annotation.Autowired;

@RequestMapping("file")
public class FileUploadController {
	private final DocumentDAO documentDAO;
	private final S3Service s3Service;

	// Let Spring inject both the DAO and your S3Service via the constructor
	@Autowired
	public FileUploadController(DocumentDAO documentDAO, S3Service s3Service) {
		this.documentDAO = documentDAO;
		this.s3Service = s3Service;
	}

	@Value("${aws.s3.bucketName}")
	private String bucketName;

	@GetMapping("/")
	public String index() {
		return "upload";
	}

	@PostMapping("/upload")
	public String handleFileUpload(@RequestParam("file") MultipartFile file,
	                               RedirectAttributes redirectAttributes) {
		//TODO: REMOVE HARDCODING LATER
		String fileUrl = "";
		int ownerId = 1;
		int moduleId = 1;

		String documentTitle = "i like apples :D";
		String originalFileName = file.getOriginalFilename();
		String uniqueFileName = ownerId + "-" + moduleId + "-" + originalFileName;
		String description = "asdf";
		String fileType = file.getContentType();
		String visibility = "public";
		int success = 0;
		if (file.isEmpty()) {
			return "no file uploaded!";
		}
		try {
			// Upload to S3
			fileUrl = s3Service.uploadFile(bucketName, uniqueFileName, file.getInputStream());

			// Insert to database
			success = documentDAO.insertDocument(ownerId, moduleId, documentTitle,
					description, fileType, fileUrl, visibility);

		} catch (IOException e) {
			e.printStackTrace();
			return "Failed to upload to S3";
		} catch (Exception e) {
			// Catching database or other runtime exceptions
			e.printStackTrace();
			return "Database insert failed";
		}
		return fileUrl;
	}


	@DeleteMapping("/delete")
	public String deleteFileUpload(@RequestParam("filename") String fileName) {
		try {
			// delete from S3
			s3Service.deleteFile(bucketName, fileName);

		} catch (Exception e) {
			e.printStackTrace();
		}

		return "deleted " + fileName;
	}

}