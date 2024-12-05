CREATE TABLE products (
    id BIGINT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    material VARCHAR(255),
    width DOUBLE,
    height DOUBLE,
    depth DOUBLE,
    description VARCHAR(500)
);
