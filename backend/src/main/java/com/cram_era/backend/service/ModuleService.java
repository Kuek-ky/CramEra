package com.cram_era.backend.service;

import com.cram_era.backend.entities.Document;
import com.cram_era.backend.entities.Module;
import com.cram_era.backend.repository.DocumentRepository;
import com.cram_era.backend.repository.ModuleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
public class ModuleService {

    private final ModuleRepository moduleRepository;

    @Autowired
    public ModuleService(ModuleRepository moduleRepository) {
        this.moduleRepository = moduleRepository;
    }

    public Module getModuleById(int id) {
        return moduleRepository.findById(id)
                .orElseThrow(() ->
                        new NoSuchElementException("Module not found with id: " + id));
    }
//
//    public void deleteDocumentById(int id) {
//        if (!moduleRepository.existsById(id)) {
//            throw new NoSuchElementException("Module not found with id: " + id);
//        }
//
//        moduleRepository.deleteById(id);
//    }

}