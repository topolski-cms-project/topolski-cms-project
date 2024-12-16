package com.topolski.backend.controller;

import com.topolski.backend.model.entity.Product;
import lombok.RequiredArgsConstructor;

import static org.assertj.core.api.Assertions.assertThat;

@RequiredArgsConstructor
public class AssertThatProduct {
    private final Product product;

    public static AssertThatProduct actual(Product product) {
        return new AssertThatProduct(product);
    }

    public AssertThatProduct notHavingImageUrl(String imageName) {
        assertThat(this.product.getImageUrls())
                .noneMatch(imageUrl -> imageUrl.getUrl().contains(imageName));
        return this;
    }

    public AssertThatProduct isHavingImageUrl(String imageName) {
        assertThat(this.product.getImageUrls())
                .anyMatch(imageUrl -> imageUrl.getUrl().contains(imageName));
        return this;
    }
}
