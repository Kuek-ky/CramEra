package com.cram_era.backend.service;

import org.springframework.stereotype.Service;
import software.amazon.awssdk.core.ResponseBytes;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.*;

import java.io.IOException;
import java.io.InputStream;

@Service
public class S3Service {
    private final S3Client s3Client;

    public S3Service(S3Client s3Client) {
        this.s3Client = s3Client;
    }

    public String uploadFile(String bucketName, String key, InputStream fileStream) {
        try {
            s3Client.putObject(PutObjectRequest.builder()
                            .bucket(bucketName)
                            .key(key)
                            .build(),

                    RequestBody.fromInputStream(fileStream, fileStream.available()));
            return "File uploaded successfully.";
        } catch (S3Exception e) {
            throw new RuntimeException("Failed to upload file: " + e.awsErrorDetails().errorMessage());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public ResponseBytes<GetObjectResponse> downloadFile(String bucketName, String key) {
        try {
            return s3Client.getObjectAsBytes(GetObjectRequest.builder()
                    .bucket(bucketName)
                    .key(key)
                    .build());
        } catch (S3Exception e) {
            throw new RuntimeException("Failed to download file: " + e.awsErrorDetails().errorMessage());
        }
    }

    public String deleteFile(String bucketName, String key) {
        try {
            s3Client.deleteObject(DeleteObjectRequest.builder()
                    .bucket(bucketName)
                    .key(key)
                    .build());
            return "File deleted successfully.";
        } catch (S3Exception e) {
            throw new RuntimeException("Failed to delete file: " + e.awsErrorDetails().errorMessage());
        }
    }
}
