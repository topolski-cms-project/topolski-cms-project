package com.topolski.backend.controller;

import com.topolski.backend.model.http.ServerResponse;
import com.topolski.backend.s3.S3Service;
import com.topolski.backend.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/images")
@RequiredArgsConstructor
public class ImageController {

    private final S3Service s3Service;
    private final ReviewService reviewService;


    @GetMapping("/download")
    public ResponseEntity<byte[]> downloadFile(@RequestParam("imageUrl") String imageUrl) {
        byte[] fileContent = s3Service.getObject(imageUrl);

        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG)
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + imageUrl + "\"")
                .body(fileContent);
    }

    @PostMapping("/review/upload")
    public ResponseEntity<ServerResponse> uploadFile(@PathVariable Long id,
                                                     @RequestParam("file") MultipartFile file) {
        reviewService.addReviewImageUrl(id, file.getName());
        return ResponseEntity.ok().body(new ServerResponse(s3Service.putObject(file, file.getOriginalFilename())));
    }
}
