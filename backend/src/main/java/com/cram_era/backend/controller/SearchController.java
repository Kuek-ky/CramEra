package com.cram_era.backend.controller;

import com.cram_era.backend.entities.Document;
import com.cram_era.backend.entities.Module;
import com.cram_era.backend.service.SearchService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class SearchController {

    private final SearchService searchService;

    public SearchController(SearchService searchService) {
        this.searchService = searchService;
    }

    @GetMapping("/search")
    public ResponseEntity<List<Document>> search(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String docType,
            @RequestParam(required = false) String docTag,
            @RequestParam(required = false) String module
    ) {

        List<Document> results =
                searchService.search(name, docType, docTag, module);

        return ResponseEntity.ok(results);
    }

    @GetMapping("/search/module")
    public ResponseEntity<List<Module>> search(
            @RequestParam(required = false) String name
    ) {
        System.out.println("name -> " + name);
        List<Module> results =
                searchService.searchModulesByName(name);
        return ResponseEntity.ok(results);
    }
}