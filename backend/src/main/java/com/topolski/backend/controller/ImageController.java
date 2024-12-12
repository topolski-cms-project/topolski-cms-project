package com.topolski.backend.controller;

import com.topolski.backend.s3.S3Service;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/images")
@RequiredArgsConstructor
public class ImageController {

    private final S3Service s3Service;

    @GetMapping("/download")
    public ResponseEntity<byte[]> downloadFile(@RequestParam("imageUrl") String imageUrl) {
        byte[] fileContent = s3Service.getObject(imageUrl);

        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG)
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + imageUrl + "\"")
                .body(fileContent);
    }
}
