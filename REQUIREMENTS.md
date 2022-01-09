# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- ✅ Index `GET [/api/products/]`
- ✅ Show `GET [/api/products/:id]`
- ✅ Create `POST [/api/products/]` [token required]
- 🚀✅ [Added] Update `PUT [/api/products/]` [token required]
- 🚀✅ [Added] Delete `DELETE [/api/products/]` [token required]
- 🚀✅ [OPTIONAL] Products by category `GET [/api/products/categories/:category]` (args: product category)

#### Users

- ✅ Index `GET [/api/users/]` [token required]
- ✅ Show `GET [/api/users/:id]` [token required]
- ✅ Create `POST [/api/users/signup]` [token required]
- 🚀✅ [Added] Update `PUT [/api/users/:id]` [token required]
- 🚀✅ [Added] Delete `DELETE [/api/users/:id]` [token required]
- 🚀✅ [Added] Authenticate user `POST [/api/users/login]` [token required]
- 🚀✅ [Added] Completed Orders by user (args: user id) `GET [/api/users/:id/orders/completed]` [token required]
- 🚀✅ [Added] Active orders by user (args: user id) `GET [/api/users/:id/orders/active]` [token required]
- 🚀✅ [Added] user Orders (args: user id) `GET [/api/users/:id/orders/]` [token required]
- 🚀✅ [Added] user creates order (args: user id) `POST [/api/users/:id/orders/]` [token required]

#### Orders

- 🚀✅ [Added] Index `POST [/api/orders/]` [token required]
- 🚀✅ [Added] Create `GET [/api/orders]` [token required]
- 🚀✅ [Added] Show `GET [/api/orders/:id]` [token required]
- 🚀✅ [Added] Update `PUT [/api/orders/:id]` [token required]
- 🚀✅ [Added] Delete `DELETE [/api/orders/:id]` [token required]
- 🚀✅ [Added] Add products to order `POST [/api/orders/:id/products]` [token required]
- 🚀✅ [Added] Get order products `GET [/api/orders/:id/products]` [token required]

## Data Shapes

#### Product

- id
- name
- price
- image_url
- [OPTIONAL] category

```sql

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  price integer NOT NULL,
  image_url VARCHAR(250),
  category VARCHAR(150) NOT NULL
);

```

#### User

- id
- first_name
- last_name
- username
- password_digest

```sql

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  username VARCHAR(100) NOT NULL,
  password_digest VARCHAR(255) NOT NULL
);

```

#### Orders

- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

```sql

CREATE TABLE orders(
    id SERIAL PRIMARY KEY,
    user_id bigint,
    status VARCHAR(20),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE order_products (
    id SERIAL PRIMARY KEY,
    quantity integer,
    order_id bigint,
    product_id bigint,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

```
