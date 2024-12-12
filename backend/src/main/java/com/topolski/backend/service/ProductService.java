package com.topolski.backend.service;

import com.topolski.backend.exception.ProductNotFoundException;
import com.topolski.backend.mapper.GenericToDTOMapper;
import com.topolski.backend.model.dto.product.ProductDTO;
import com.topolski.backend.model.dto.product.ProductRequest;
import com.topolski.backend.model.entity.ImageUrl;
import com.topolski.backend.model.entity.Product;
import com.topolski.backend.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProductService {

    private final ProductRepository productRepository;
    private final GenericToDTOMapper mapper;

    public List<ProductDTO> getAllProductsWithTechnicalDetails() {
        List<Product> products = productRepository.findAllWithImagesAndTechnicalDetails();
        return mapper.mapList(products, Product::toTechnicalDetailsDTO);
    }

    public List<ProductDTO> getAllProductsWithImagesAndReviews() {
        List<Product> products = productRepository.findAllWithImagesAndReviews();
        return mapper.mapList(products, Product::toDTO);
    }

    public ProductDTO getProductDetails(Long id) {
        return productRepository.findByIdWithDetails(id)
                .map(Product::toDetailedDTO)
                .orElseThrow(ProductNotFoundException::new);
    }

    public ProductDTO addProduct(ProductRequest productRequest) {
        Product product = Product.builder()
                .name(productRequest.name())
                .price(BigDecimal.valueOf(productRequest.price()))
                .stockQuantity(productRequest.quantity())
                .technicalDetails(productRequest.getTechnicalDetails())
                .build();

        productRepository.save(product);

        log.info("Added new product from request {}", productRequest);

        return product.toTechnicalDetailsDTO();
    }

    @Transactional
    public ProductDTO updateProduct(Long id, ProductRequest productRequest) {
        Product product = productRepository.findById(id)
                .orElseThrow(ProductNotFoundException::new);

        product.setName(productRequest.name());
        product.setPrice(BigDecimal.valueOf(productRequest.price()));
        product.updateStockQuantity(productRequest.quantity());
        product.setTechnicalDetails(productRequest.getTechnicalDetails());

        Product updatedProduct = productRepository.save(product);

        log.info("Updated product of id {} from {}", id, productRequest);

        return updatedProduct.toTechnicalDetailsDTO();
    }

    @Transactional
    public void addProductImageUrl(Long id, String name) {
        Product product = productRepository.findById(id)
                .orElseThrow(ProductNotFoundException::new);

        product.addImageUrl(
                ImageUrl.builder()
                        .product(product)
                        .url(name)
                        .build());

        productRepository.save(product);

        log.info("Updated product of id {} - added image url {}", id, name);
    }

    @Transactional
    public void removeProductImageUrl(Long id, String name) {
        Product product = productRepository.findById(id)
                .orElseThrow(ProductNotFoundException::new);

        product.removeImageUrl(
                ImageUrl.builder()
                        .product(product)
                        .url(name)
                        .build());

        productRepository.save(product);

        log.info("Updated product of id {} - removed image url {}", id, name);
    }
}
