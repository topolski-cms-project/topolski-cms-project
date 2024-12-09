CREATE TABLE reviews (
    id BIGINT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    product_id BIGINT NOT NULL,
    username VARCHAR(255),
    comment TEXT,
    rating INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_product_review FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE
);