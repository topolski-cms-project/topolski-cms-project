package com.topolski.backend.s3;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.ResponseInputStream;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.GetObjectResponse;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.model.S3Exception;

import java.io.IOException;
import java.io.InputStream;

import static software.amazon.awssdk.core.sync.RequestBody.fromInputStream;

@Service
@RequiredArgsConstructor
@Slf4j
public class S3Service {

    private final S3Client s3Client;

    @Value("${aws.s3.bucket.name}")
    private String bucketName;

    public String putObject(MultipartFile file) {

        log.info("Started putObject to s3 bucket {} for file {}", bucketName, file.getOriginalFilename());

        try (InputStream inputStream = file.getInputStream()) {

            PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                    .bucket(bucketName)
                    .key(file.getOriginalFilename())
                    .build();

            s3Client.putObject(putObjectRequest, fromInputStream(inputStream, file.getSize()));

            log.info("Completed putObject to s3 bucket {} for file {}", bucketName, file.getOriginalFilename());

            return "File uploaded successfully to S3 with key: " + file.getOriginalFilename();
        } catch (S3Exception | IOException e) {
            log.info("Error while putObject to s3 bucket {} for file {}, {}", bucketName, file.getOriginalFilename(), e.getStackTrace());
            throw new RuntimeException("Error uploading file to S3: " + e.getMessage(), e);
        }
    }

    public byte[] getObject(String key) {
        try {
            log.info("Started getObject from s3 bucket {} for file {}", bucketName, key);

            GetObjectRequest getObjectRequest = GetObjectRequest.builder()
                    .bucket(bucketName)
                    .key(key)
                    .build();

            ResponseInputStream<GetObjectResponse> res = s3Client.getObject(getObjectRequest);

            log.info("Completed getObject from s3 bucket {} for file {}", bucketName, key);

            return res.readAllBytes();
        } catch (S3Exception | IOException e) {
            log.info("Error while downloading file from S3 bucket {} for file {}, {}", bucketName, key, e.getStackTrace());
            throw new RuntimeException("Error downloading file from S3: " + e.getMessage(), e);
        }

    }

    public String deleteObject(String key) {
        try {
            log.info("Started deleteObjectRequest from s3 bucket {} for file {}", bucketName, key);

            DeleteObjectRequest deleteObjectRequest = DeleteObjectRequest.builder()
                    .bucket(bucketName)
                    .key(key)
                    .build();

            s3Client.deleteObject(deleteObjectRequest);

            log.info("Completed deleteObjectRequest from s3 bucket {} for file {}", bucketName, key);

            return "File deleted successfully from S3: " + key;
        } catch (S3Exception e) {
            log.info("Error deleting file from S3 bucket {} for file {}, {}", bucketName, key, e.getStackTrace());
            throw new RuntimeException(e.getMessage());
        }
    }
}