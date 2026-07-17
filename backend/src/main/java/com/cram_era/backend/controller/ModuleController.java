package com.cram_era.backend.controller;

import com.cram_era.backend.entities.Module;
import com.cram_era.backend.service.ModuleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("module")
public class ModuleController {
	private final ModuleService moduleService;

	@Autowired
	public ModuleController(ModuleService moduleService) {
		this.moduleService = moduleService;
	}

	@GetMapping(path="getModule/{id}")
	public Module getModuleById(@PathVariable("id") int id) {
		return moduleService.getModuleById(id);
	}
}