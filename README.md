# Welcome to storefront-backend Api 👋
![Version](https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](#)

> A node express server application providing restful api endpoints to manage products and user orders for an online store.

## Prerequisites

* npm >= 8.0.0
* node >= 16.0.0

* yarn

## Install
Run the following command in the projects root folder to install dependencies. All provided yarn commands are run at the root level of the project.
```sh
yarn install
```

## Database Setup (for both development and test databases)
The server application is configured to run with a Postgresql database running with the following settings:
* Host: 127.0.0.1
* Port: 5432
* Database user: "store_user"
* Database name: "store_front"
* Test database name: "store_front_test"

To set up the database (dev + test), use the following commands in postgresql environment:
```sh
  CREATE USER store_user WITH PASSWORD 'your_password_here';
  CREATE DATABASE store_front; 
  GRANT ALL PRIVILEGES ON DATABASE store_front TO store_user;
  CREATE DATABASE store_front_test;
  GRANT ALL PRIVILEGES ON DATABASE store_front_test TO store_user;
```

> A .env file should also be created containing variables with names matching those seen
in the database.json file and containing all the settings above.

## Environment variables
A .env file is required to hold environment variables for project. Create a .env file and copy the
following into it.
```sh
PORT=5000
JWT_SEC='12345-67890-09876-54654'
DB_HOST=127.0.0.1
DB_DEV=store_front
DB_TEST=store_front_test
DB_USER=store_user
DB_PASSWORD=your_password
BCYPT_PASSWORD='12345-67890-09876-54321'
SALT_ROUNDS=10
ENV=dev
```

## Usage
To start the server appplication run the following command. 

```sh
yarn start:dev
```
The application is configured to run on localhost port 5000 - http://localhost:5000.

## Run tests
To run available tests, use following command.

```sh
yarn test
```
This temporarily modifies the ENV key in environment variables from 'dev' to 'test' and runs migrations to setup the test database to be used for testing.
The test database is pulled down after tests are complete.

## Run build
The following command can be used to compile and build the project from typescript to javascript.

```sh
yarn start:prod
```
Once the build is complete the built project can be found in the dist folder. To start the built application you can run the following command in the root folder of the project.
```sh
node dist/.
```

## Author

**Ahmed Ibrahim**

* Github: [@iahmediibrahim](https://github.com/iahmediibrahim)

