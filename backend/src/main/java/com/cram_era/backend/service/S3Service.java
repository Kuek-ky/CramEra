package com.cram_era.backend.service;

import java.io.InputStream;
import java.time.Duration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import software.amazon.awssdk.core.ResponseBytes;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.GetObjectResponse;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.model.S3Exception;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.presigner.model.GetObjectPresignRequest;
import software.amazon.awssdk.services.s3.presigner.model.PresignedGetObjectRequest;

@Service
public class S3Service {

    private final S3Client s3Client;
    private final S3Presigner s3Presigner;

    public S3Service(S3Client s3Client, S3Presigner s3Presigner) {
        this.s3Client = s3Client;
        this.s3Presigner = s3Presigner;
    }

    @Value("${aws.s3.base_url}")
    private String base_url;

    @Value("${aws.s3.bucketName}")
    private String bucketName;

    // =========================
    // UPLOAD FILE
    // =========================
    public String uploadFile(String bucketName, String key, InputStream fileStream) throws Exception {
        try {
            s3Client.putObject(
                    PutObjectRequest.builder()
                            .bucket(bucketName)
                            .key(key)
                            .build(),
                    RequestBody.fromInputStream(fileStream, fileStream.available())
            );

            return base_url + key;

        } catch (S3Exception e) {
            throw new RuntimeException("Failed to upload file: " +
                    e.awsErrorDetails().errorMessage());
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    // =========================
    // DOWNLOAD FILE (SDK v2 - bytes)
    // =========================
    public ResponseBytes<GetObjectResponse> downloadFile(String bucketName, String key) {
        try {
            return s3Client.getObjectAsBytes(
                    GetObjectRequest.builder()
                            .bucket(bucketName)
                            .key(key)
                            .build()
            );

        } catch (S3Exception e) {
            throw new RuntimeException("Failed to download file: " +
                    e.awsErrorDetails().errorMessage());
        }
    }

    // =========================
    // DELETE FILE
    // =========================
    public String deleteFile(String bucketName, String key) {
        try {
            s3Client.deleteObject(
                    DeleteObjectRequest.builder()
                            .bucket(bucketName)
                            .key(key)
                            .build()
            );
            return "File deleted successfully.";

        } catch (S3Exception e) {
            throw new RuntimeException("Failed to delete file: " +
                    e.awsErrorDetails().errorMessage());
        }
    }

    // =========================
    // DOWNLOAD FILE (simplified helper version)
    // ⚠️ FIXED: now uses SDK v2 properly
    // =========================
    public byte[] downloadFile(String key) {
        try {
            return s3Client.getObjectAsBytes(
                    GetObjectRequest.builder()
                            .bucket(bucketName)
                            .key(key)
                            .build()
            ).asByteArray();

        } catch (S3Exception e) {
            throw new RuntimeException("Failed to download file: " +
                    e.awsErrorDetails().errorMessage());
        }
    }

    public String generatePresignedUrl(String fileUrl){
        
        GetObjectRequest getObjectRequest = GetObjectRequest.builder()
                .bucket(bucketName)
                .key(fileUrl)
                .build();

        GetObjectPresignRequest presignRequest = GetObjectPresignRequest.builder()
                .signatureDuration(Duration.ofMinutes(60))
                .getObjectRequest(getObjectRequest)        
                .build();
        
        PresignedGetObjectRequest presignedRequest = s3Presigner.presignGetObject(presignRequest);

        return presignedRequest.url().toString();
    }
}
