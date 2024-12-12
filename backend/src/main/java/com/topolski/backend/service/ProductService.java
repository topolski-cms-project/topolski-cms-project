package com.topolski.backend.service;

import com.topolski.backend.exception.ProductNotFoundException;
import com.topolski.backend.mapper.GenericToDTOMapper;
import com.topolski.backend.model.product.dto.product.ProductDTO;
import com.topolski.backend.model.product.dto.product.ProductDetailsDTO;
import com.topolski.backend.model.product.dto.product.ProductRequest;
import com.topolski.backend.model.product.dto.product.ProductTechnicalDetailsDTO;
import com.topolski.backend.model.product.entity.Product;
import com.topolski.backend.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final GenericToDTOMapper mapper;

    public List<ProductTechnicalDetailsDTO> getAllProductsWithTechnicalDetails() {
        List<Product> products = productRepository.findAllWithTechnicalDetails();
        return mapper.mapList(products, Product::toTechnicalDetailsDTO);
    }

    public List<ProductDTO> getAllProductsWithImagesAndReviews() {
        List<Product> products = productRepository.findAllWithImagesAndReviews();
        return mapper.mapList(products, Product::toDTO);
    }

    public ProductDetailsDTO getProductDetails(Long id) {
        return productRepository.findByIdWithDetails(id)
                .map(Product::toDetailedDTO)
                .orElseThrow(ProductNotFoundException::new);
    }

    public void addProduct(ProductRequest productRequest) {
        Product product = Product.builder()
                .name(productRequest.name())
                .price(BigDecimal.valueOf(productRequest.price()))
                .stockQuantity(productRequest.quantity())
                .technicalDetails(productRequest.getTechnicalDetails())
                .build();

        productRepository.save(product);
    }

    @Transactional
    public ProductTechnicalDetailsDTO updateProduct(Long id, ProductRequest productRequest) {
        Product product = productRepository.findById(id)
                .orElseThrow(ProductNotFoundException::new);

        product.setName(productRequest.name());
        product.setPrice(BigDecimal.valueOf(productRequest.price()));
        product.updateStockQuantity(productRequest.quantity());
        product.setTechnicalDetails(productRequest.getTechnicalDetails());

        Product updatedProduct = productRepository.save(product);

        return updatedProduct.toTechnicalDetailsDTO();
    }

}
