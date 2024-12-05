package com.topolski.backend.service;

import com.topolski.backend.exception.ProductNotFoundException;
import com.topolski.backend.model.product.dto.ProductDTO;
import com.topolski.backend.model.product.dto.ProductDetailsDTO;
import com.topolski.backend.model.product.entity.Product;
import com.topolski.backend.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    public List<ProductDTO> getAllProducts() {
        List<Product> products = productRepository.findAll();
        return products.stream()
                .map(Product::toDTO)
                .collect(Collectors.toList());
    }

    public ProductDetailsDTO getProductDetails(Long id) {
        return productRepository.findById(id)
                .map(Product::toDetailedDTO)
                .orElseThrow(ProductNotFoundException::new);
    }
}
