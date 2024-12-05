package com.topolski.backend.controller;

import com.topolski.backend.model.product.dto.ProductDTO;
import com.topolski.backend.model.product.dto.ProductDetailsDTO;
import com.topolski.backend.service.ProductService;
import jakarta.annotation.Nonnull;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @GetMapping
    public List<ProductDTO> getAllProducts() {
        return productService.getAllProducts();
    }

    @GetMapping("/{id}")
    public ProductDetailsDTO getProductDetails(@Nonnull @PathVariable Long id) {
        return productService.getProductDetails(id);
    }
}
