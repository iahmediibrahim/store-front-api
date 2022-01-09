CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  price integer NOT NULL,
  image_url VARCHAR(250),
  category VARCHAR(150) NOT NULL
);