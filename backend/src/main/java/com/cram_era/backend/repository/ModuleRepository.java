package com.cram_era.backend.repository;

import com.cram_era.backend.entities.Document;
import com.cram_era.backend.entities.Module;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ModuleRepository extends JpaRepository<Module, Integer> {
    @Query("""
SELECT DISTINCT m
FROM Module m
WHERE LOWER(m.moduleName) LIKE LOWER(CONCAT('%', :name, '%'))
OR LOWER(m.moduleCode) LIKE LOWER(CONCAT('%', :name, '%'))
""")
    List<Module> searchModulesByNameOrCode(
            String name,
            Pageable pageable
    );
}
