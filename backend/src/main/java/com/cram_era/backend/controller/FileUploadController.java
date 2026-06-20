package com.cram_era.backend.controller;

import java.io.IOException;
import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

import com.cram_era.backend.service.S3Service;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.beans.factory.annotation.Autowired;

@RestController
@RequestMapping("file") 
public class FileUploadController {
	@Autowired
	private S3Service s3Service;

	@Value("${aws.s3.bucketName}")
	private String bucketName;

	@GetMapping("/")
	public String index() {
		return "upload";
	}

	@PostMapping("/upload")
	public String handleFileUpload(@RequestParam("file") MultipartFile file,
	                               RedirectAttributes redirectAttributes) {

		if (file.isEmpty()) {
			redirectAttributes.addFlashAttribute("message", "Please select a file to upload.");
			return "redirect:/";
		}

		try {

			// Upload to S3
			s3Service.uploadFile(bucketName, file.getOriginalFilename(), file.getInputStream());

			redirectAttributes.addFlashAttribute("message",
					"You successfully uploaded '" + file.getOriginalFilename() + "' to S3!");

		} catch (IOException e) {
			e.printStackTrace();
			redirectAttributes.addFlashAttribute("message", "Failed to upload file.");
		}

		return "redirect:/";
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