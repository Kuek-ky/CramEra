package com.cram_era.backend.dao;

import com.cram_era.backend.entities.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

@Repository // 1. Tells Spring to manage this class
public class DocumentDAO {

    private final JdbcTemplate jdbcTemplate;

    // 2. Spring automatically injects the JdbcTemplate here!
    @Autowired
    public DocumentDAO(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    //    public Document getDocumentByName(String docName) {
//        String sqlString = "SELECT ";
//
//        // 3. JdbcTemplate handles the connection, statement, and try-catch automatically
//        return jdbcTemplate.query(sqlString, (ResultSet rs) -> {
//            if (rs.next()) {
//                Document document = new Document();
//                document.setId(rs.getInt("author_id"));
//                document.setModuleId(rs.getInt("author_id")); // Keeping your original logic
//                document.setTitle(rs.getString("name"));
//                document.setFileType(rs.getString("biography"));
//                document.setFileUrl(books);
//                return document;
//            }
//            return null; // Return null if no author is found
//        }, authorID); // Passes authorID into the '?' in your SQL
//    }
    public int insertDocument(int ownerId, int moduleId, String documentTitle, String description, String fileType, String fileUrl, String visibility) throws SQLException {
        System.out.println(fileType);

        //TODO: REMOVE DOCUMENTSID SINCE THAT IS SUPPOSED TO BE DEFAULT
        String sqlString = "INSERT INTO documents " +
                "(documentsID, owner_user_ID, module_ID, documents_title, descriptions," +
                " title_URL, file_type, visibiliity) " +
                "VALUES (1,?,?,?,?,?,?,?)";

        return jdbcTemplate.update(sqlString,
                ownerId, moduleId, documentTitle, description,
                fileUrl, fileType, visibility);
    }
}
