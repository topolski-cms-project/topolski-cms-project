package com.topolski.backend;

import com.topolski.backend.s3.S3Service;
import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import static org.mockito.Mockito.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.mock;

@Getter
public class FakeS3Service extends S3Service {

    public final S3Client s3Client;

    public FakeS3Service(S3Client s3Client) {
        super(s3Client);
        this.s3Client = s3Client;
    }

    public static FakeS3Service create() {
        S3Client mockS3Client = mock(S3Client.class);

        doNothing().when(mockS3Client).putObject(any(PutObjectRequest.class), any(RequestBody.class));
        doNothing().when(mockS3Client).getObject(any(GetObjectRequest.class));
        doNothing().when(mockS3Client).deleteObject(any(DeleteObjectRequest.class));

        return new FakeS3Service(mockS3Client);
    }

    @Override
    public String putObject(MultipartFile file) {
        return super.putObject(file);
    }

    @Override
    public byte[] getObject(String key) {
        return super.getObject(key);
    }

    @Override
    public String deleteObject(String key) {
        return super.deleteObject(key);
    }
}
