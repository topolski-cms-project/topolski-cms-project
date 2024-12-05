package com.topolski.backend.controller;

import com.topolski.backend.model.product.entity.ImageUrl;
import com.topolski.backend.model.product.entity.Product;
import com.topolski.backend.model.product.entity.TechnicalDetails;
import com.topolski.backend.repository.ProductRepository;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
public class ProductControllerTest {

    private final MockMvc mockMvc;
    private final ProductRepository productRepository;

    @Autowired
    public ProductControllerTest(MockMvc mockMvc, ProductRepository productRepository) {
        this.mockMvc = mockMvc;
        this.productRepository = productRepository;
    }

    @Test
    public void testGetAllProducts() throws Exception {
        productRepository.saveAll(prepareProducts());


        mockMvc.perform(get("/products"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].name").value("Wooden Table"))
                .andExpect(jsonPath("$[0].price").value(150.00))
                .andExpect(jsonPath("$[0].imageUrls[0]").value("http://example.com/img1"))
                .andExpect(jsonPath("$[1].name").value("Wooden board"))
                .andExpect(jsonPath("$[1].price").value(75.00))
                .andExpect(jsonPath("$[1].imageUrls[0]").value("http://example.com/img2"))
                .andExpect(jsonPath("$[0].material").doesNotExist())
                .andExpect(jsonPath("$[0].width").doesNotExist())
                .andExpect(jsonPath("$[0].height").doesNotExist())
                .andExpect(jsonPath("$[0].depth").doesNotExist())
                .andExpect(jsonPath("$[0].description").doesNotExist())
                .andExpect(jsonPath("$[1].material").doesNotExist())
                .andExpect(jsonPath("$[1].width").doesNotExist())
                .andExpect(jsonPath("$[1].height").doesNotExist())
                .andExpect(jsonPath("$[1].depth").doesNotExist())
                .andExpect(jsonPath("$[1].description").doesNotExist());
    }

    @Test
    public void testGetProductDetails() throws Exception {
        productRepository.saveAll(prepareProducts());

        mockMvc.perform(get("/products/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Wooden Table"))
                .andExpect(jsonPath("$.price").value(150.00))
                .andExpect(jsonPath("$.imageUrls[0]").value("http://example.com/img1"))
                .andExpect(jsonPath("$.material").value("Wood"))
                .andExpect(jsonPath("$.width").value(50.0))
                .andExpect(jsonPath("$.height").value(40.0))
                .andExpect(jsonPath("$.depth").value(0.5))
                .andExpect(jsonPath("$.description").value("High quality wood table."));
    }


    @Test
    public void testGetProductByIdNotFound() throws Exception {
        mockMvc.perform(get("/products/999")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound())
                .andExpect(content().string("Product with the given ID was not found."));
    }

    private List<Product> prepareProducts(){
        ImageUrl imageUrl = ImageUrl.builder()
                .url("http://example.com/img1")
                .build();

        Product product1 = Product.builder()
                .name("Wooden Table")
                .price(new BigDecimal("150.00"))
                .imageUrls(Collections.singletonList(imageUrl))
                .technicalDetails(new TechnicalDetails("Wood", 50.0, 40.0,  0.5, "High quality wood table."))
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

        return Arrays.asList(product1, product2);
    }
}
