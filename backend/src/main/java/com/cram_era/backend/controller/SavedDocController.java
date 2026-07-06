package com.cram_era.backend.controller;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cram_era.backend.entities.SavedDoc;
import com.cram_era.backend.service.SavedDocService;
import java.util.List;

@RestController
@RequestMapping("/savedDoc")
public class SavedDocController {

	private final SavedDocService savedDocService;

	public SavedDocController(SavedDocService savedDocService) {
		this.savedDocService = savedDocService;
	}

	@PostMapping("/save")
	public SavedDoc save(@RequestBody SavedDoc savedDoc) {

		return savedDocService.saveDocument(savedDoc);

	}

	@GetMapping("/{userId}")
	public List<SavedDoc> getSavedDocs(
			@PathVariable Integer userId) {

		return savedDocService.getSavedDocument(userId);

	}

	@DeleteMapping
	public void delete(
			@RequestParam Integer userId,
			@RequestParam Integer documentId) {

		savedDocService.deleteSavedDocument(userId, documentId);

	}

	@GetMapping("/exists")
	public boolean exists(
			@RequestParam Integer userId,
			@RequestParam Integer documentId) {

		return savedDocService.isSaved(userId, documentId);

	}

}