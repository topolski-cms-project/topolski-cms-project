package com.topolski.backend.controller;

import com.topolski.backend.model.product.entity.ImageUrl;
import com.topolski.backend.model.product.entity.Product;
import com.topolski.backend.repository.ProductRepository;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.Collections;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class ProductControllerTest {

    private final MockMvc mockMvc;
    private final ProductRepository productRepository;

    @Autowired
    public ProductControllerTest(MockMvc mockMvc, ProductRepository productRepository) {
        this.mockMvc = mockMvc;
        this.productRepository = productRepository;
    }

    @Test
    @Transactional
    public void testGetAllProducts() throws Exception {
        ImageUrl imageUrl = ImageUrl.builder()
                .url("http://example.com/img1")
                .build();

        Product product1 = Product.builder()
                .name("Wooden Table")
                .price(new BigDecimal("150.00"))
                .imageUrls(Collections.singletonList(imageUrl))
                .build();
        imageUrl.setProduct(product1);

        ImageUrl imageUrl2 = ImageUrl.builder()
                .url("http://example.com/img2")
                .build();

        Product product2 = Product.builder()
                .name("Wooden board")
                .price(new BigDecimal("75.00"))
                .imageUrls(Collections.singletonList(imageUrl2))
                .build();

        imageUrl2.setProduct(product2);
        productRepository.saveAll(Arrays.asList(product1, product2));


        mockMvc.perform(get("/products"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(1))
                .andExpect(jsonPath("$[0].name").value("Wooden Table"))
                .andExpect(jsonPath("$[0].price").value(150.00))
                .andExpect(jsonPath("$[0].imageUrls[0]").value("http://example.com/img1"))
                .andExpect(jsonPath("$[1].id").value(2))
                .andExpect(jsonPath("$[1].name").value("Wooden board"))
                .andExpect(jsonPath("$[1].price").value(75.00))
                .andExpect(jsonPath("$[1].imageUrls[0]").value("http://example.com/img2"));
    }
}
